
import Container from "@/components/shared/inputs/Container";
import { SidebarInset, SidebarProvider } from "../../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider  >
      <AppSidebar />

      <SidebarInset className="bg-[#F1F1F1]">
        <header>
          {/* <SidebarTrigger /> */}
          {/* Breadcrumb / page title goes here */}
        </header>

        <Container> <Outlet /></Container>
      </SidebarInset>
    </SidebarProvider>
  );
}