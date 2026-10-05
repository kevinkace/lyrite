"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import SongsTable from "@/components/songs/SongsTable";

import { useSongs } from "@/contexts/SongsContext";

import { useTableSearch } from "@/hooks/useTableSearch";

import {
    createPageChangeHandler,
    createPageSizeChangeHandler,
    normalizePageSize
} from "@/lib/pagination";

import type { Song } from "@/types";

type SongsTableContainerProps = {
    canEdit?: boolean;
};

/**
 * controller/adapter layer
 * pageSize, handlers for sort, pageSize, delete, is public
 * pulls songs from useSongs
 * passes a bag of props to tables
 */

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
    const pageSize = normalizePageSize(searchParams.get("pageSize"));
    const { searchValue, setSearchValue } = useTableSearch(collection.search);

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

                pageSize={pageSize}
                currentPage={collection.page}
                totalPages={collection.pages}
                hasMore={collection.hasMore}
                onPageSizeChange={handlePageSizeChange}
                onPageChange={handlePageChange}
            />
        </>
    );
}
