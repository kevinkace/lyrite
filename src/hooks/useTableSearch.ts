"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";

export function useTableSearch(search?: string) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState(search || "");
    const debouncedSearch = useDebounce(searchValue, 500);

    useEffect(() => {
        setSearchValue(search || "");
    }, [search]);

    useEffect(() => {
        if (debouncedSearch === (search || "")) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("search", debouncedSearch);
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    }, [debouncedSearch, router, search, searchParams]);

    return { searchValue, setSearchValue };
}
