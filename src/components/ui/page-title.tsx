import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageTitle({ title, subtitle, className, children }: PageTitleProps) {
  return (
    <div className={cn("mb-8 border-b pb-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-primary-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {children && <div className="mt-4 sm:mt-0">{children}</div>}
      </div>
    </div>
  );
}
