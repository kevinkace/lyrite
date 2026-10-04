"use client";

import { Flex, IconButton, TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";

import css from "./SearchInput.module.css";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    ariaLabel: string;
};

export default function SearchInput({ value, onChange, ariaLabel }: SearchInputProps) {
    return (
        <Flex gap="2" align="center">
            <div className={css.searchWrapper}>
                <TextField.Root
                    type="text"
                    name="search"
                    value={value}
                    placeholder="Search..."
                    onChange={(event) => onChange(event.target.value)}
                    size="2"
                />
            </div>
            <IconButton variant="soft" color="gray" aria-label={ariaLabel}>
                <Search />
            </IconButton>
        </Flex>
    );
}
