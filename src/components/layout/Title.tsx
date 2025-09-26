"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Flex } from "@radix-ui/themes";

export const Title = () => {
    const { user } = useAuth();
    return <Flex align="center" gap="6">
        song title
    </Flex>;
};
