"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";

import Pagination from "@/components/pagination/Pagination";
import SongsTable from "@/components/songs/SongsTable";

import { useSongs } from "@/contexts/SongsContext";

import type { Song } from "@/types";

type SongsTableContainerProps = {
    canEdit?: boolean;
};

export default function SongsTableContainer({ canEdit = false }: SongsTableContainerProps) {
    return (
        <Suspense fallback={<div>Loading songs...</div>}>
            <SongsTableContainerContent canEdit={canEdit} />
        </Suspense>
    );
}

function SongsTableContainerContent({ canEdit }: SongsTableContainerProps) {
    const collection = useSongs();
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

    const handleSort = (column: string, defaultDirection: "asc" | "desc" = "asc") => {
        const isCurrentSort = collection.sort === column;
        const currentlyAscending = collection.sortAscending ?? false;
        const isFirstDirection = currentlyAscending === (defaultDirection === "asc");
        const params = new URLSearchParams(searchParams.toString());

        if (!isCurrentSort) {
            params.set("sort", column);
            params.set("direction", defaultDirection);
        } else if (isFirstDirection) {
            params.set("sort", column);
            params.set("direction", defaultDirection === "asc" ? "desc" : "asc");
        } else {
            params.set("sort", "none");
            params.delete("direction");
        }

        params.set("page", "1");
        router.push(`?${params.toString()}`);
    };

    const handlePageChange = (page: number) => {
        collection.setLoading(true);

        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete("page");
        } else {
            params.set("page", page.toString());
        }
        router.push(`?${params.toString()}`);
    };

    const handleRemove = (song: Song) => collection.deleteSong(song.id);
    const handleTogglePublic = (song: Song, isPublic: boolean) =>
        collection.updateSong(song.id, { is_public: isPublic });

    return (
        <>
            <SongsTable
                songs={collection.songs}
                loading={collection.loading}
                error={collection.error}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                onRemove={canEdit ? handleRemove : undefined}
                onTogglePublic={canEdit ? handleTogglePublic : undefined}
                onSort={handleSort}
                sort={collection.sort}
                sortAscending={collection.sortAscending}
                showCreateSong={canEdit}
            />
            {collection.page !== undefined && (
                <Pagination
                    currentPage={collection.page}
                    totalPages={collection.pages}
                    hasMore={collection.hasMore}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
}
