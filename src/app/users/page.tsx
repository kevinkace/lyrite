"use client";

import UsersTable from "@/components/user/UsersTable";
import { UsersProvider } from "@/contexts/UsersContext";

export default function UsersPage() {

  return (
    <UsersProvider page={0} search="" pageSize={20}>
        <h1>Users</h1>
        <UsersTable />
    </UsersProvider>
  );
}
