"use client";

import { useAuth } from "@/contexts/AuthContext";
import { getUserData } from "@/lib/object";
import { Card, Text } from "@radix-ui/themes";

import styles from "./ProfileData.module.css";

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

export function ProfileData() {
    const { user } = useAuth();

    if (!user) return <p>No user data</p>;

    return (
        <Card size="3" variant="surface" className={styles.card}>
            <dl className={styles.dl}>
                {dataKeys.map((key) => {
                    let value = getUserData(user, key.path);

                    if (key.path.includes("_at") && value && (typeof value === "string" || typeof value === "number")) {
                        // Format timestamps
                        try {
                            value = new Date(value).toLocaleString();
                        } catch {
                            value = "Invalid date";
                        }
                    }

                    return (
                        <div key={key.path} className={styles.row}>
                            <dt className={styles.label}>
                                <Text size="2" color="gray">
                                    {key.label}
                                </Text>
                            </dt>

                            <dd className={styles.value}>
                                {(
                                    <Text size="2" weight="medium">
                                        {String(value ?? "—")}
                                    </Text>
                                )}
                            </dd>
                        </div>
                    );
                })}
            </dl>
        </Card>
    );
}
