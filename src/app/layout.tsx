import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation(); // Get the current location
  const [currentUrl, setCurrentUrl] = useState(window.location.href);

  useEffect(() => {
    // Update the URL whenever location changes
    setCurrentUrl(window.location.href);
  }, [location]);

  const [protocol, rest] = currentUrl.split("//");
  const [host, ...pathParts] = rest.split("/");
  const path = pathParts.join("/");
  const coloredPath = (
    <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text font-semibold text-transparent">
      {path}
    </span>
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">AGV System</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {protocol}//{host}/{coloredPath}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet /> {/* Renders the nested routes */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
