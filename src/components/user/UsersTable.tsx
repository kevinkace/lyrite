"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Flex } from "@radix-ui/themes";

import { useUsers } from "@/contexts/UsersContext";

import { useTableSearch } from "@/hooks/useTableSearch";

import Table       from "@/components/table/Table";
import TableError  from "@/components/table/TableError";
import Pagination  from "@/components/pagination/Pagination";
import PageSize    from "@/components/pagination/PageSize";
import SearchInput from "@/components/search/SearchInput";

import {
    createPageChangeHandler,
    createPageSizeChangeHandler,
    normalizePageSize
} from "@/lib/pagination";

import type { TableHeader, UsersCollection } from "@/types";

/**
 *
 */

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
    const pageSize = normalizePageSize(searchParams.get("pageSize"));
    const handlePageChange = createPageChangeHandler(
        searchParams.toString(),
        collection.setLoading,
        router.push
    );
    const handlePageSizeChange = createPageSizeChangeHandler(
        searchParams.toString(),
        collection.setLoading,
        router.push
    );
    const { searchValue, setSearchValue } = useTableSearch(collection.search);

    const headers: TableHeader[] = [
        {
            label: "Name",
            key: "full_name",
            href: (user) => `/users/${user.id}`
        },
        {
            label: "ID",
            key: "id",
            type: "id" as const
        },
        {
            label: "Joined",
            key: "created_at",
            type: "date" as const
        }
    ];

    return (
        <Flex gap="4" direction="column">
            <Flex gap="2" align="center" justify="between">
                <SearchInput
                    value={searchValue}
                    onChange={setSearchValue}
                    ariaLabel="Search users"
                />

                <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
            </Flex>

            {collection.error && <TableError>{collection.error}</TableError>}

            <Table headers={headers} items={collection.users} loading={collection.loading} />

            <Pagination
                currentPage={collection.page ?? 1}
                totalPages={collection.pages}
                hasMore={collection.hasMore}
                onPageChange={handlePageChange}
            />
        </Flex>
    );
}
