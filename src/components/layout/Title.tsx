"use client";

import { Flex } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";
import { useLayout } from "@/contexts/LayoutContext";


export const Title = () => {
    const { user } = useAuth();
    const { headerContent } = useLayout();

    if (!headerContent) {
        return null;
    }

    return (<Flex align="center" direction="column">
        {headerContent}
    </Flex>)
};
