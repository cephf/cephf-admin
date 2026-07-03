
import Container from "@/components/shared/inputs/Container";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider  >
      <AppSidebar />

      <SidebarInset className="bg-[#F1F1F1]">
        <header>
          {/* <SidebarTrigger /> */}
          {/* Breadcrumb / page title goes here */}
        </header>

        <Container>{children}</Container>
      </SidebarInset>
    </SidebarProvider>
  );
}