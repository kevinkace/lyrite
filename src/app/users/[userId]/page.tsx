"use client";

import SongsTable from "@/components/songs/SongsTable";

import { useUser } from "@/contexts/UserContext";
import { formattedDate } from "@/lib/dates";

import css from "./page.module.css";

export default function UserSongsPage() {

  const { user } = useUser();

  return (
    <>
      <h2 className={css.userName}>{user?.username || user?.full_name}</h2>
      <div className={css.profileStats}>
        <div>user since: {formattedDate(user?.created_at)}</div>
        <div>last seen: {formattedDate(user?.updated_at)}</div>
      </div>
      <SongsTable />
    </>
  );
}
