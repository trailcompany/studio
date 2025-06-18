import { DashboardCard } from "@/components/dashboard-card";
import { PageTitle } from "@/components/ui/page-title";

export default function StudentDashboardPage() {
  return (
    <>
      <PageTitle title="Student Dashboard" subtitle="Stay updated with campus life and your academic progress." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="College Events"
          description="Discover upcoming events, workshops, and activities."
          href="/student/events"
          iconName="Events"
        />
        {/* Add more student-specific cards here if needed, e.g., "My Attendance", "My Grades" */}
      </div>
    </>
  );
}
