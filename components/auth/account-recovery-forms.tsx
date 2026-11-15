"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError, apiRequest } from "@/lib/api-client";

type MessageResponse = { message: string };

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
          const response = await apiRequest<MessageResponse>("/auth/password/forgot", {
            method: "POST",
            body: JSON.stringify({ email }),
          });
          setMessage(response.message);
        } catch {
          setMessage("We couldn't process that request. Please try again.");
        } finally {
          setLoading(false);
        }
      }}
    >
      <Input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
      {message && <p className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">{message}</p>}
      <Button type="submit" disabled={loading} className="w-full">{loading ? "Sending..." : "Send reset link"}</Button>
      <BackToLogin />
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
          setMessage("Passwords do not match.");
          return;
        }
        setLoading(true);
        try {
          await apiRequest<MessageResponse>("/auth/password/reset", {
            method: "POST",
            body: JSON.stringify({ token, password }),
          });
          router.replace("/auth/login");
        } catch (error) {
          setMessage(error instanceof ApiError ? error.message : "The reset link could not be used.");
        } finally {
          setLoading(false);
        }
      }}
    >
      <Input type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="New password" />
      <Input type="password" autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm new password" />
      {message && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{message}</p>}
      <Button type="submit" disabled={loading || !token} className="w-full">{loading ? "Updating..." : "Update password"}</Button>
      <BackToLogin />
    </form>
  );
}

export function VerifyEmailForm({ token }: { token: string }) {
  const [message, setMessage] = useState(
    token ? "Verifying your email..." : "This verification link is incomplete.",
  );
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    void apiRequest<MessageResponse>("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then((response) => {
        setSuccess(true);
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error instanceof ApiError ? error.message : "This verification link could not be used.");
      });
  }, [token]);

  return (
    <div className="space-y-5 text-sm">
      <p className={success ? "rounded-xl bg-emerald-50 p-4 text-emerald-800" : "rounded-xl bg-blue-50 p-4 text-blue-800"}>{message}</p>
      <BackToLogin />
    </div>
  );
}

export function ResendVerificationForm({ initialEmail }: { initialEmail: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState("Check your inbox and spam folder for the verification link.");
  const [loading, setLoading] = useState(false);
  return (
    <form className="space-y-5" onSubmit={async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        const response = await apiRequest<MessageResponse>("/auth/verification/resend", { method: "POST", body: JSON.stringify({ email }) });
        setMessage(response.message);
      } catch {
        setMessage("The verification email could not be resent right now.");
      } finally {
        setLoading(false);
      }
    }}>
      <p className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">{message}</p>
      <Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
      <Button type="submit" disabled={loading} variant="outline" className="w-full">{loading ? "Sending..." : "Resend verification email"}</Button>
      <BackToLogin />
    </form>
  );
}

function BackToLogin() {
  return <p className="text-center"><Link href="/auth/login" className="font-semibold text-blue-700 hover:underline">Back to sign in</Link></p>;
}
