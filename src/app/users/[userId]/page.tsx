"use client";

import { Card, Flex } from "@radix-ui/themes";

import { useUser } from "@/contexts/UserContext";

import SongsTable from "@/components/songs/SongsTable";
import { Avatar } from "@/components/user/Avatar";

import { formattedDay } from "@/lib/dates";

import css from "./page.module.css";

export default function UserSongsPage() {
  const { profile } = useUser();

  return (
    <>
    <Card size="3" className={css.profileCard}>
      <Flex gap="5" align="center">
        <Avatar profile={profile} size="7" />
        <div>
          <h1 className={css.userName}>{profile?.username || profile?.full_name}</h1>
          <Flex gap="3" className={css.profileStats}>
            <div>joined: {formattedDay(profile?.created_at)}</div>
            <div>last seen: {formattedDay(profile?.updated_at)}</div>
          </Flex>
        </div>
      </Flex>
    </Card>

      <SongsTable />
    </>
  );
}
