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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// This is sample data.
const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
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
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  const user = useSelector((state: RootState) => state.user.account);

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
      {/* Conditionally render SidebarFooter based on authentication */}
      {isAuthenticated && user && (
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
