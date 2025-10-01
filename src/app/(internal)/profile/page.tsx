"use client";

import { ProfileData } from "@/components/profile/ProfileData";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) return <p>Not logged in</p>;

    return (
        <div>
            <ProfileData/>
        </div>
    );
}
