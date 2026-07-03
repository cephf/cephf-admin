import { useSearchParams } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import ContaactPage from "./contact/Index";
import DonatepPage from "./donate/Index";
import InvolvedPage from "./get-involved/Index";

const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "donate";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    setSearchParams(params);
  };

  return (
    <div>
      <p className="mt-6 text-2xl font-semibold text-[#1A1B1D]">Users</p>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="mt-14.75 w-full"
      >
        <TabsList className="flex gap-6 bg-transparent">
          <TabsTrigger className="tab-trigger" value="donate">
            Donate
          </TabsTrigger>

          <TabsTrigger className="tab-trigger" value="get-involved">
            Get involved
          </TabsTrigger>

          <TabsTrigger className="tab-trigger" value="contact-us">
            Contact us
          </TabsTrigger>
        </TabsList>

        <TabsContent value="donate">
          <DonatepPage />
        </TabsContent>

        <TabsContent value="get-involved">
          <InvolvedPage />
        </TabsContent>

        <TabsContent value="contact-us">
          <ContaactPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersPage;