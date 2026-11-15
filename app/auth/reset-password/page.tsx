import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { ResetPasswordForm } from "@/components/auth/account-recovery-forms";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return <AuthPageShell eyebrow="Account recovery" title="Choose a new password" description="Use a strong password you haven't used for CirWork before."><ResetPasswordForm token={token} /></AuthPageShell>;
}
