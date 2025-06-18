import { DashboardCard } from "@/components/dashboard-card";
import { PageTitle } from "@/components/ui/page-title";

export default function AdminDashboardPage() {
  return (
    <>
      <PageTitle title="Admin Dashboard" subtitle="Manage system settings and operations." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Staff Attendance"
          description="Monitor and record staff attendance."
          href="/admin/staff-attendance"
          iconName="Attendance"
        />
        <DashboardCard
          title="Absence Notifications"
          description="Generate and send personalized absence notifications to parents."
          href="/admin/absence-notifications"
          iconName="Notification"
        />
        {/* Add more admin-specific cards here if needed */}
      </div>
    </>
  );
}
