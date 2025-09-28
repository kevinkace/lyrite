"use client";

import { Flex } from "@radix-ui/themes";

import { useLayout } from "@/contexts/LayoutContext";

import css from "./Title.module.css";

export const Title = () => {
    const { headerContent } = useLayout();

    if (!headerContent) {
        return null;
    }

    return (<Flex align="center" direction="column" className={css.title}>
        {headerContent}
    </Flex>)
};
