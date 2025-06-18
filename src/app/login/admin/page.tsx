import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export default function AdminLoginPage() {
  return (
    <AuthCard
      title="Admin Login"
      description="Access the CampusConnect admin dashboard."
    >
      <LoginForm role="Admin" redirectPath="/admin/dashboard" />
    </AuthCard>
  );
}
