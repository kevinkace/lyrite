"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import UsersTable from "@/components/user/UsersTable";
import { UsersProvider } from "@/contexts/UsersContext";

function UsersPageContent() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const search = searchParams.get("search") ?? "";
  const sortParam = searchParams.get("sort");
  const sort = sortParam === "none" ? undefined : sortParam ?? undefined;
  const direction = searchParams.get("direction");

  return (
    <UsersProvider page={page} search={search} sort={sort} sortAscending={direction !== "desc"} pageSize={20}>
        <h1>Users</h1>
        <UsersTable />
    </UsersProvider>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<div>Loading users...</div>}>
      <UsersPageContent />
    </Suspense>
  );
}
