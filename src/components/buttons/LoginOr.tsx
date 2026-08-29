"use client";

import { Button }    from "@radix-ui/themes";
import Link          from "next/link";
import { FilePen } from "lucide-react";

import { useAuth }   from "@/contexts/AuthContext";

export default function LoginOr(props) {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    return (
        <Button asChild={true} size="4" variant="soft" {...props}>
            {user ?
                <Link href="/profile/songs"><FilePen /> My songs</Link> :
                <Link href="/login">Create a free account</Link>
            }
        </Button>
    );
}