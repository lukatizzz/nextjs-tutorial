import envConfig from "@/config";
import { RegisterResType } from "@/schemaValidations/auth.schema";
import { handleErrorApi, normalizePath } from "./utils";
import { redirect } from "next/navigation";

type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string | undefined;
};

type EntityErrorPayload = {
    message: string
    errors: {
        field: string
        message: string
    }[]
}


export const ENTITY_ERROR_STATUS = 422

export const AUTHENTICATION_ERROR_STATUS = 401

export const isClient = typeof window !== 'undefined';

export type HttpErrorParam = { status: number; payload: any }

export class HttpError extends Error {
    status: number;
    payload: {
        message: string;
        [key: string]: any;
    };
    constructor({ status, payload }: HttpErrorParam) {
        super("Http Error");
        this.status = status;
        this.payload = payload;
    }
}

export type EntityErrorParam = { status: number; payload: EntityErrorPayload }

export class EntityError extends HttpError {
    constructor({ status, payload }: EntityErrorParam) {
        super({ status, payload });
        this.status = status;
        this.payload = payload;
    }
}


class SessionToken {
    private token = '';
    private _expiresAt: string | null = null;

    get expiresAt() {
        return this._expiresAt;
    }

    set expiresAt(expiresAt: string | null) {
        if (!isClient) {
            throw new Error("Cannot set session token on the server side.");
        }
        this._expiresAt = expiresAt;
    }

    get value() {
        return this.token;
    }

    set value(token: string) {
        if (!isClient) {
            throw new Error("Cannot set session token on the server side.");
        }
        this.token = token;
    }
}

export const clientSessionToken = new SessionToken();

const request = async<Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
    const body = options?.body instanceof FormData ? options.body : JSON.stringify(options?.body);
    const baseHeaders: Record<string, string> = options?.body instanceof FormData ? {} : {
        'Content-Type': 'application/json',
    };

    const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options?.baseUrl;
    const fullUrl = url.startsWith("/")
        ? `${baseUrl}${url}`
        : `${baseUrl}/${url}`;

    if (isClient) {
        const sessionToken = clientSessionToken.value;
        if (sessionToken) {
            baseHeaders.Authorization = `Bearer ${sessionToken}`;
        }
    }
    const res = await fetch(fullUrl, {
        ...options,
        method,
        headers: {
            ...baseHeaders,
            ...options?.headers,
        },
        body,
    });

    const payload: Response = await res.json();
    const data = {
        status: res.status,
        payload,
    };
    if (!res.ok) {
        if (res.status === ENTITY_ERROR_STATUS) {
            throw new EntityError(data as EntityErrorParam);
        } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
            if (isClient) {
                try {
                    await fetch('/api/auth/logout', {
                        method: 'POST',
                        headers: {
                            ...baseHeaders,
                        },
                        body: JSON.stringify({ force: true })
                    })
                    clientSessionToken.value = '';
                    location.href = '/login';
                } catch (error) {
                    handleErrorApi({ error })
                }
            } else {
                const sessionToken = (options?.headers as any)?.Authorization.split(
                    'Bearer '
                )[1]
                redirect(`/logout?sessionToken=${sessionToken}`)
            }
        }

        throw new HttpError(data);
    }

    if (isClient) {
        if (['auth/login', 'auth/register'].some(
            (item) => item === normalizePath(url)
        )) {
            clientSessionToken.value = (payload as RegisterResType).data.token;
        } else if ('api/auth/logout' === normalizePath(url)) {
            clientSessionToken.value = '';
        }
    }

    return data;
}

const http = {
    get: <Response>(url: string, options?: CustomOptions) =>
        request<Response>("GET", url, options),
    post: <Response>(url: string, body?: any, options?: CustomOptions) =>
        request<Response>("POST", url, { ...options, body }),
    put: <Response>(url: string, body?: any, options?: CustomOptions) =>
        request<Response>("PUT", url, { ...options, body }),
    delete: <Response>(url: string, body?: any, options?: CustomOptions) =>
        request<Response>("DELETE", url, { ...options, body }),
};

export default http;