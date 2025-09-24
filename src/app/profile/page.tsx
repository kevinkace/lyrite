"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <p>profile page</p>
    );
}
