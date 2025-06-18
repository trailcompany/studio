import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export default function StaffLoginPage() {
  return (
    <AuthCard
      title="Staff Login"
      description="Access your CampusConnect staff portal."
    >
      <LoginForm role="Staff" redirectPath="/staff/dashboard" />
    </AuthCard>
  );
}
