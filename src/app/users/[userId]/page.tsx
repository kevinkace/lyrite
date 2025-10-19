"use client";

import { Flex } from "@radix-ui/themes";

import { useUser } from "@/contexts/UserContext";

import SongsTable from "@/components/songs/SongsTable";
import { Avatar } from "@/components/user/Avatar";

import { formattedDate } from "@/lib/dates";

import css from "./page.module.css";

export default function UserSongsPage() {
  const { profile } = useUser();

  return (
    <>
      <Flex gap="2" align="center">
        <Avatar profile={profile} size="504a7f5c91a1" />
        <div>
          <h2 className={css.userName}>{profile?.username || profile?.full_name}</h2>
          <div className={css.profileStats}>
            <div>user since: {formattedDate(profile?.created_at)}</div>
            <div>last seen: {formattedDate(profile?.updated_at)}</div>
          </div>
        </div>
      </Flex>

      <SongsTable />
    </>
  );
}
