import { AppDrawer } from "@/components/shared/drawer/DataDrawer";
import { SearchInput } from "@/components/shared/inputs/SearchInput";
import { SelectInput } from "@/components/shared/inputs/SelecctInput";
import { DataTable } from "@/components/shared/table/DataTable";
import { userColumns, type Data } from "@/data/table-colums/donate-column";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export const data: Data[] = [
  {
    id: "1",
    title: "Mrs",
    fullName: "John Doe",
    email: "john.doe@example.com",
    message:
      "I'd like to discuss redesigning our company website for better performance and accessibility.",
    image: "/images/users/user-1.jpg",
  },
  {
    id: "2",
    title: "Mr",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    message:
      "I'm interested in collaborating on your environmental research initiatives.",
    image: "/images/users/user-2.jpg",
  },
  {
    id: "3",
    title: "Dr",
    fullName: "Michael Johnson",
    email: "michael.johnson@example.com",
    message:
      "I would love to volunteer for your upcoming community outreach program.",
    image: "/images/users/user-3.jpg",
  },
  {
    id: "4",
    title: "Miss",
    fullName: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    message:
      "Our organization is interested in exploring a partnership with your foundation.",
    image: "/images/users/user-4.jpg",
  },
  {
    id: "5",
    title: "Mr",
    fullName: "David Brown",
    email: "david.brown@example.com",
    message:
      "I'd like more information on how to support your projects through donations.",
    image: "/images/users/user-5.jpg",
  },
  {
    id: "6",
    title: "Prof",
    fullName: "Emily Davis",
    email: "emily.davis@example.com",
    message:
      "Do you offer environmental awareness training for schools and organizations?",
    image: "/images/users/user-6.jpg",
  },
  {
    id: "7",
    title: "Dr",
    fullName: "Daniel Lee",
    email: "daniel.lee@example.com",
    message:
      "I'm a final-year student looking for internship opportunities with your team.",
    image: "/images/users/user-7.jpg",
  },
  {
    id: "8",
    title: "Mr",
    fullName: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    message:
      "I'd like to know more about your ongoing projects and how I can get involved.",
    image: "/images/users/user-8.jpg",
  },
];
const DonatepPage = () => {
  const [selectedUser, setSelectedUser] = useState<Data | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page") || 1);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));

    navigate(`?${params.toString()}`);
  };
  const handleRowClick = (user: Data) => {
    setSelectedUser(user);
    setOpen(true);
  };
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center">
        <SearchInput
          placeholder="Filter by name"
          value={search}
          onChange={setSearch}
        />
        <div className="flex items-center gap-2">
          <SelectInput
            value={status}
            onChange={setStatus}
            placeholder="Date"
            options={[
              { label: "Pending", value: "pending" },
              { label: "Published", value: "published" },
              { label: "Highlighted", value: "highlighted" },
            ]}
          />
          <SelectInput
            value={status}
            onChange={setStatus}
            placeholder="status"
            options={[
              { label: "Pending", value: "pending" },
              { label: "Published", value: "published" },
              { label: "Highlighted", value: "highlighted" },
            ]}
          />
          <SelectInput
            value={status}
            onChange={setStatus}
            placeholder="tag"
            options={[
              { label: "Pending", value: "pending" },
              { label: "Published", value: "published" },
              { label: "Highlighted", value: "highlighted" },
            ]}
          />
        </div>
      </div>
      <div className="mt-4">
        <DataTable
          columns={userColumns}
          data={data}
          page={page}
          pageCount={10}
          onPageChange={handlePageChange}
          onRowClick={handleRowClick}
        />
        <AppDrawer
          open={open}
          onOpenChange={setOpen}
          title={selectedUser?.title}
        >
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Name</p>
                <p>{selectedUser.fullName}</p>
              </div>

              <div>
                <p className="font-semibold">Email</p>
                <p>{selectedUser.email}</p>
              </div>

              <div>
                <p className="font-semibold">Message</p>
                <p>{selectedUser.message}</p>
              </div>
            </div>
          )}
        </AppDrawer>
      </div>
    </div>
  );
};
export default DonatepPage;
