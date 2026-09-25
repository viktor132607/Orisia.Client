"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, clearSession, type UserResponse } from "../lib/api";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    api.auth.me()
      .then((current) => {
        if (current.role !== "Admin" && current.role !== "Editor") {
          router.replace("/account/");
          return;
        }
        setUser(current);
      })
      .catch(() => {
        clearSession();
        setFailed(true);
        router.replace("/login/");
      });
  }, [router]);

  if (!user) {
    return <main className="grid min-h-[60vh] place-items-center bg-orisia-cream dark:bg-orisia-dark"><p className="font-sans text-sm">{failed ? "Unauthorized" : "Loading…"}</p></main>;
  }

  return <>{children}</>;
}
