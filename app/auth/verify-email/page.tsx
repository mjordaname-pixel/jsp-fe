import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { VerifyEmailForm } from "@/components/auth/account-recovery-forms";

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return <AuthPageShell eyebrow="Email verification" title="Verify your email" description="We're confirming that this email belongs to you."><VerifyEmailForm token={token} /></AuthPageShell>;
}
