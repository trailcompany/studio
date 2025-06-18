import { AppHeader } from "@/components/layout/app-header";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader userRole="Staff" pageTitle="Staff Portal" />
      <main className="flex-1 container py-8">
        {children}
      </main>
    </div>
  );
}
