"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { SongsProvider } from "@/contexts/SongsContext";
import { useAuth } from "@/contexts/AuthContext";

import SongsTable from "@/components/songs/SongsTable";

const pageSize = 2;

function ProfilePageInner() {
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";

  return (
    <SongsProvider userId={user?.id} page={page} search={search} pageSize={pageSize}>
      <SongsTable />
    </SongsProvider>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilePageInner />
    </Suspense>
  );
}
