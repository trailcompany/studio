import { PersonalizedNotificationForm } from "@/components/admin/personalized-notification-form";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";

export default function AbsenceNotificationsPage() {
  return (
    <>
      <PageTitle title="Personalized Absence Notifications" subtitle="Use AI to craft tailored messages for parents/guardians.">
        <Button variant="outline" asChild>
            <Link href="/admin/dashboard"><Icons.Back className="mr-2 h-4 w-4" />Back to Dashboard</Link>
        </Button>
      </PageTitle>
      <PersonalizedNotificationForm />
    </>
  );
}
