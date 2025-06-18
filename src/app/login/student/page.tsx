import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export default function StudentLoginPage() {
  return (
    <AuthCard
      title="Student Login"
      description="Access your CampusConnect student portal."
    >
      <LoginForm role="Student" redirectPath="/student/dashboard" />
    </AuthCard>
  );
}
