"use client";

import Link             from "next/link";
import { FilePlus }     from "lucide-react";
import { Flex, Button } from "@radix-ui/themes";

import { useAuth } from '@/contexts/AuthContext';


import UserMenu from "@/components/layout/UserMenu";


export const UserSection = () => {
    const { user } = useAuth();

    return (
        <>
            {user && (
                <Flex gap="4" align="center">
                    <UserMenu />
                </Flex>
            )}
        </>
    );
};