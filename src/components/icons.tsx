import {
  GraduationCap,
  LogIn,
  LogOut,
  UserCog,
  Users,
  User,
  LayoutDashboard,
  ClipboardList,
  UserCheck,
  UserX,
  CalendarDays,
  Megaphone,
  Bell,
  Send,
  Edit3,
  CheckCircle2,
  Trash2,
  ArrowLeft,
  Settings,
  CalendarCheck,
  MapPin,
  ChevronDown,
  ChevronRight,
  Search,
  type LucideProps,
} from 'lucide-react';

export const Icons = {
  Logo: GraduationCap,
  LogIn,
  LogOut,
  Admin: UserCog,
  Staff: Users,
  Student: User,
  Dashboard: LayoutDashboard,
  Attendance: ClipboardList,
  Present: UserCheck,
  Absent: UserX,
  Events: CalendarDays,
  Megaphone,
  Notification: Bell,
  Send,
  Edit: Edit3,
  Approve: CheckCircle2,
  Discard: Trash2,
  Back: ArrowLeft,
  Settings,
  CalendarCheck,
  MapPin,
  ChevronDown,
  ChevronRight,
  Search,
};

export type Icon = keyof typeof Icons;

interface DynamicIconProps extends LucideProps {
  name: Icon;
}

export const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    // Fallback or error handling
    return null;
  }
  return <IconComponent {...props} />;
};
