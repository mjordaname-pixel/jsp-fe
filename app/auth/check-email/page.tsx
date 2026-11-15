import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { ResendVerificationForm } from "@/components/auth/account-recovery-forms";

export default function CheckEmailPage() {
  return <AuthPageShell eyebrow="One more step" title="Check your email" description="Verify your email before signing in to CirWork."><ResendVerificationForm initialEmail="" /></AuthPageShell>;
}
