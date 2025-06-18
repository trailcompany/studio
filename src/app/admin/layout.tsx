import { AppHeader } from "@/components/layout/app-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader userRole="Admin" pageTitle="Admin Panel" />
      <main className="flex-1 container py-8">
        {children}
      </main>
    </div>
  );
}
