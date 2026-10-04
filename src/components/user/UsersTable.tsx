"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import { Flex, IconButton, TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";

import { useUsers } from "@/contexts/UsersContext";

import Table from "@/components/table/Table";
import Pagination from "@/components/pagination/Pagination";
import css from "@/components/table/Table.module.css";

import type { TableHeader, UsersCollection } from "@/types";

export default function UsersTable() {
    const collection = useUsers();

    return (
        <Suspense fallback={<div>Loading users...</div>}>
            <UsersTableContent collection={collection} />
        </Suspense>
    );
}

function UsersTableContent({ collection }: { collection: UsersCollection }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState(collection.search || "");
    const debouncedSearch = useDebounce(searchValue, 500);

    useEffect(() => {
        setSearchValue(collection.search || "");
    }, [collection.search]);

    useEffect(() => {
        if (debouncedSearch === (collection.search || "")) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("search", debouncedSearch);
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    }, [collection.search, debouncedSearch, router, searchParams]);

    const headers: TableHeader[] = [
        {
            label: "Name",
            key: "full_name",
            href: (user) => `/users/${user.id}`
        },
        { label: "ID", key: "id", type: "id" as const },
        { label: "Joined", key: "created_at", type: "date" as const }
    ];

    return (
        <Flex gap="4" direction="column">
            <Flex gap="2" align="center">
                <div className={css.searchWrapper}>
                    <TextField.Root
                        type="text"
                        name="search"
                        value={searchValue}
                        placeholder="Search..."
                        onChange={(event) => setSearchValue(event.target.value)}
                        size="2"
                    />
                </div>
                <IconButton variant="soft" color="gray" aria-label="Search users">
                    <Search />
                </IconButton>
            </Flex>
            {collection.error && <p className={css.error}>{collection.error}</p>}
            <Table headers={headers} items={collection.users} loading={collection.loading} />
            <Pagination
                currentPage={collection.page ?? 1}
                totalPages={collection.pages}
                hasMore={collection.hasMore}
                onPageChange={(page) => {
                    collection.setLoading(true);
                    const params = new URLSearchParams(searchParams.toString());
                    if (page === 1) {
                        params.delete("page");
                    } else {
                        params.set("page", page.toString());
                    }
                    router.push(`?${params.toString()}`);
                }}
            />
        </Flex>
    );
}
