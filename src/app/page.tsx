import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-primary/10 p-8">
      <div className="text-center mb-12">
        <Icons.Logo className="mx-auto h-24 w-24 text-primary mb-4" />
        <h1 className="font-headline text-5xl font-bold text-primary-foreground mb-2">
          Welcome to CampusConnect
        </h1>
        <p className="text-xl text-muted-foreground">
          Your central hub for college events and attendance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <RoleCard
          role="Admin"
          description="Manage staff, oversee system operations, and send notifications."
          icon={<Icons.Admin className="h-12 w-12 text-primary" />}
          href="/login/admin"
        />
        <RoleCard
          role="Staff"
          description="Track student attendance and manage course-related activities."
          icon={<Icons.Staff className="h-12 w-12 text-primary" />}
          href="/login/staff"
        />
        <RoleCard
          role="Student"
          description="View events, check your attendance, and stay connected."
          icon={<Icons.Student className="h-12 w-12 text-primary" />}
          href="/login/student"
        />
      </div>
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CampusConnect. All rights reserved.</p>
        <p>Designed for a seamless campus experience.</p>
      </footer>
    </main>
  );
}

interface RoleCardProps {
  role: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function RoleCard({ role, description, icon, href }: RoleCardProps) {
  return (
    <Card className="text-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
          {icon}
        </div>
        <CardTitle className="font-headline text-2xl">{role} Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription>{description}</CardDescription>
        <Button asChild className="w-full">
          <Link href={href}>
            Login as {role} <Icons.LogIn className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
