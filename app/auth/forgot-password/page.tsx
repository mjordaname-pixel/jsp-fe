import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { ForgotPasswordForm } from "@/components/auth/account-recovery-forms";

export default function ForgotPasswordPage() {
  return <AuthPageShell eyebrow="Account recovery" title="Reset your password" description="Enter your account email and we'll send a secure reset link."><ForgotPasswordForm /></AuthPageShell>;
}
