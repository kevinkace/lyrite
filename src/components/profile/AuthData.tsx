"use client";

import { Card } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";

import { DefList } from "@/components/defList/DefList";

import { getUserData } from "@/lib/object";

import css from "./ProfileData.module.css";

const dataKeys = [
    { path: "id", label: "ID" },
    { path: "email", label: "Email" },
    { path: "email_confirmed_at", label: "Email Confirmed At" },
    { path: "app_metadata.provider", label: "Provider" },
    { path: "user_metadata.avatar_url", label: "Avatar URL" },
    { path: "user_metadata.preferred_username", label: "Preferred Username" },
    { path: "created_at", label: "Created At" },
    { path: "updated_at", label: "Updated At" },
];

export function AuthData() {
    const { user } = useAuth();

    if (!user) return <p>No user data</p>;

    return (
        <Card variant="surface" className={css.card}>
            <DefList items={dataKeys.map(({path, label}) => {
                const value = getUserData(user, path);

                return { key: path, label, value };
            })} />
        </Card>
    );
}
