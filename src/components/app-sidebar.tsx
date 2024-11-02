import { NavMain } from "@/components/nav-main";
import { NavSettings } from "@/components/nav-settings";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  CalendarDays,
  Car,
  CircleGauge,
  FlaskConical,
  House,
  ListOrdered,
  LogIn,
  Navigation,
  Settings,
  Undo2,
  University,
  UserPlus,
} from "lucide-react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "iPAC Lab",
      logo: FlaskConical,
      plan: "Company",
    },
    {
      name: "HUST",
      logo: University,
      plan: "University",
    },
  ],
  navMain: [
    {
      title: "ADMIN pages",
      url: "#",
      icon: Navigation,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: CircleGauge,
        },
        {
          title: "Manage Orders",
          url: "/admin/manage-orders",
          icon: ListOrdered,
        },
        {
          title: "Schedules",
          url: "/admin/schedules",
          icon: CalendarDays,
        },
        {
          title: "AGVs",
          url: "/admin/agvs",
          icon: Car,
        },
      ],
    },
    {
      title: "Landing pages",
      url: "#",
      icon: Undo2,
      items: [
        {
          title: "Home",
          url: "/",
          icon: House,
        },
        {
          title: "Login",
          url: "/login",
          icon: LogIn,
        },
        {
          title: "Register",
          url: "/register",
          icon: UserPlus,
        },
      ],
    },
  ],
  settings: [
    {
      name: "Change theme",
      // url: "#",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger className="ml-0.5" />
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSettings settings={data.settings} />
        {/* <ModeToggle /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
