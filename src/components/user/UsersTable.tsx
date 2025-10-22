"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import { IconButton, Switch, Table, TextField, Flex } from "@radix-ui/themes";
import { LayoutGrid, ListFilter, Table2 } from "lucide-react";

import { useUsers } from "@/contexts/UsersContext";

import Pagination from "@/components/pagination/Pagination";
import DeleteSongDialog from "@/components/deleteSongDialog/DeleteSongDialog";

import { formattedDay } from "@/lib/dates";

const css = {};
const MAX_LYRIC_LEN = 200;

export default function UsersTable({ editControls = false }: { editControls?: boolean }) {
    const { users, loading, search, error, page, hasMore, setLoading } = useUsers();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchValue, setSearchValue] = useState(search || "");
    const debouncedSearch = useDebounce(searchValue, 500);

    useEffect(() => {
        if (debouncedSearch === search) return; // skip if unchanged

        const params = new URLSearchParams(searchParams.toString());

        params.set("search", debouncedSearch);
        params.set("page", "1");

        router.push(`?${params.toString()}`);
    }, [ debouncedSearch ]);

    return (
        <div className={css.wrapper}>
            <Flex gap="2" align="center" justify="between">
                <Flex gap="2" align="center">
                    <TextField.Root
                        type="text"
                        value={searchValue}
                        placeholder="Search songs..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        className={css.searchInput}
                    />

                    <IconButton variant="soft" color="gray">
                        <ListFilter />
                    </IconButton>
                </Flex>

                {/* <Flex gap="2" align="center">
                    <IconButton variant="soft" color="gray">
                        <Table2 />
                    </IconButton>
                    <IconButton variant="soft" color="gray">
                        <LayoutGrid />
                    </IconButton>
                </Flex> */}
            </Flex>

            {loading && <p>Loading...</p>}
            {error && <p className={css.error}>{error}</p>}

            <pre>{JSON.stringify(users, null, 2)}</pre>


            {page && (
                <Pagination
                    currentPage={page}
                    hasMore={hasMore}
                    setLoading={setLoading}
                />
            )}
        </div>
    );
}
