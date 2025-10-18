"use client";

import css from "./Avatar.module.css"
import { User } from "@supabase/supabase-js";

export function Avatar({ user } : { user: User }) {

    return (
        <div className={css.avatar}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={user?.user_metadata?.avatar_url || "/default-avatar.png"}
                alt={`${user?.user_metadata?.preferred_username || "User"} avatar`}
                className={css.img}
                width={40}
                height={40}
            />
        </div>
    );
}