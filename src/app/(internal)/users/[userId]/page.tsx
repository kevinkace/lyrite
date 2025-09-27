"use client";

import { useParams, useSearchParams } from "next/navigation";
import { SongsProvider } from "@/contexts/SongsContext";

import SongsTable from "@/components/songs/SongsTable";

export default function UserSongsPage() {
  const { userId } = useParams();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";

  return (
    <SongsProvider userId={userId as string} page={page} search={search}>
      <SongsTable />
    </SongsProvider>
  );
}
