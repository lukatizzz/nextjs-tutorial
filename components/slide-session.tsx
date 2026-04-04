"use client";

import authApiRequest from "@/apiRequests/auth";
import { useEffect } from "react";
import { differenceInHours } from "date-fns";
import { clientSessionToken } from "@/lib/http";

export default function SlideSession() {
  useEffect(() => {
    const interval = setInterval(
      async () => {
        const now = new Date();
        const sessionTokenExpiresAt = clientSessionToken.expiresAt;
        const expiresAt = sessionTokenExpiresAt
          ? new Date(sessionTokenExpiresAt)
          : new Date();
        if (differenceInHours(expiresAt, now) < 1) {
          const res =
            await authApiRequest.slideSessionFromNextClientToNextServer();
          clientSessionToken.expiresAt = res.payload.data.expiresAt;
        }
      },
      1000 * 60 * 30,
    );
    return () => clearInterval(interval);
  }, []);
  return null;
}
