import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

interface AppHeaderProps {
  userRole?: "Admin" | "Staff" | "Student";
  pageTitle: string;
}

export function AppHeader({ userRole, pageTitle }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Icons.Logo className="h-8 w-8 text-primary" />
          <span className="font-headline text-xl font-bold text-primary-foreground">CampusConnect</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {userRole && (
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
              {userRole} Portal
            </span>
          )}
           <h1 className="font-headline text-lg font-semibold text-foreground">{pageTitle}</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <Icons.LogOut className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
