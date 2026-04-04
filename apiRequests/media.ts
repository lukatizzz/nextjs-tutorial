import http from "@/lib/http";

const mediaApiRequest = {
    upload: (file: File) => {
        const formData = new FormData();
        formData.append("file", file as Blob);
        return http.post<{
            message: string;
            data: string;
        }>("/media/upload", formData);
    }
};

export default mediaApiRequest;

