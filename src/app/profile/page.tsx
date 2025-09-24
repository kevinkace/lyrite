"use client";

import { UserData } from "@/components/user/UserData";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div>
            <UserData user={user}/>
        </div>
    );
}
