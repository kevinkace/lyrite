"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, Flex } from "@radix-ui/themes";

import { SongsProvider } from "@/contexts/SongsContext";
import { useUser }       from "@/contexts/UserContext";

import SongsTableContainer from "@/components/songs/SongsTableContainer";
import { Avatar }          from "@/components/user/Avatar";

import { DateDisplay }      from "@/components/dates/DateDisplay";
import { normalizePageSize } from "@/lib/pagination";

import css from "./page.module.css";

export default function UserSongsPage() {
  return (
    <Suspense fallback={<div>Loading user songs...</div>}>
      <UserSongsPageContent />
    </Suspense>
  );
}

function UserSongsPageContent() {
  const { id, profile } = useUser();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const pageSize = normalizePageSize(searchParams.get("pageSize"));
  const search = searchParams.get("search") ?? "";
  const sortParam = searchParams.get("sort");
  const sort = sortParam === "none" ? "" : sortParam ?? undefined;
  const direction = searchParams.get("direction");

  return (
    <>
      <Card size="3" className={css.profileCard}>
        <Flex gap="5" align="center">
          <Avatar profile={profile} size="7" />
          <div>
            <h1 className={css.userName}>{profile?.username || profile?.full_name}</h1>
            <Flex gap="3" className={css.profileStats}>
              <div>joined: <DateDisplay>{profile?.created_at}</DateDisplay></div>
              <div>last seen: <DateDisplay>{profile?.updated_at}</DateDisplay></div>
            </Flex>
          </div>
        </Flex>
      </Card>

      <SongsProvider
        userId={id ?? undefined}
        page={page}
        pageSize={pageSize}
        search={search}
        sort={sort}
        sortAscending={direction !== "desc"}
      >
        <SongsTableContainer />
      </SongsProvider>
    </>
  );
}
