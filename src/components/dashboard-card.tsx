import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';
import { Icons } from '@/components/icons';

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  iconName: keyof typeof Icons;
}

export function DashboardCard({ title, description, href, iconName }: DashboardCardProps) {
  const IconComponent = Icons[iconName];

  return (
    <Link href={href} className="block hover:no-underline">
      <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 hover:border-primary transform hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-headline text-xl font-semibold">
            {title}
          </CardTitle>
          {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
