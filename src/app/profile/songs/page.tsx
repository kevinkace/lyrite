"use client";

import { useSearchParams } from "next/navigation";

import { SongsProvider } from "@/contexts/SongsContext";
import { useAuth } from "@/contexts/AuthContext";

import SongsTable from "@/components/songs/SongsTable";

const pageSize = 10;


export default function ProfilePage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";

  if (!user) return null;

  return (
    <SongsProvider userId={user?.id} page={page} search={search} pageSize={pageSize}>
      <SongsTable editControls={true} />
    </SongsProvider>
  );
}
