"use client";

import { Button, type ButtonProps } from "@radix-ui/themes";
import Link                         from "next/link";
import { FilePen }                  from "lucide-react";

import { useAuth }   from "@/contexts/AuthContext";

export default function LoginOr(props: ButtonProps) {
    const { user, loading } = useAuth();

    if (loading || !user) {
        return <Button asChild={true} size="4" variant="soft" {...props}>
            <Link href="/login">Create a free account</Link>
        </Button>;
    }

    return (
        <Button asChild={true} size="4" variant="soft" {...props}>
                <Link href="/profile/songs"><FilePen /> My songs</Link>
        </Button>
    );
}