import { DashboardCard } from "@/components/dashboard-card";
import { PageTitle } from "@/components/ui/page-title";

export default function StaffDashboardPage() {
  return (
    <>
      <PageTitle title="Staff Dashboard" subtitle="Manage your courses and student interactions." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Student Attendance"
          description="Record and view student attendance for your classes."
          href="/staff/student-attendance"
          iconName="Attendance"
        />
        {/* Add more staff-specific cards here if needed */}
      </div>
    </>
  );
}
