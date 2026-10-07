"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Flex, SegmentedControl, Separator } from "@radix-ui/themes";
import { FilePlus, LayoutGrid, Table2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import DeleteSongDialog from "@/components/deleteSongDialog/DeleteSongDialog";
import SearchInput      from "@/components/search/SearchInput";
import Table            from "@/components/table/Table";
import TableError       from "@/components/table/TableError";
import SongsGrid        from "@/components/songs/SongsGrid";
import PageSize         from "@/components/pagination/PageSize";
import PublicSwitch     from "@/components/publicSwitch/PublicSwitch";
import Pagination       from "@/components/pagination/Pagination";

import type { Profile, Song, TableHeader } from "@/types";

import css from "./SongsTable.module.css";

const DISPLAY_TYPES = ["table", "grid"] as const;
type DisplayType = typeof DISPLAY_TYPES[number];
const icons: Record<DisplayType, LucideIcon> = {
    table: Table2,
    grid: LayoutGrid,
};

type SongsTableProps = {
    songs: Song[];
    loading?: boolean;
    error?: string | null;
    searchValue: string;
    onSearchChange: (value: string) => void;
    onRemove?: (song: Song) => void;
    onTogglePublic?: (song: Song, isPublic: boolean) => void;
    onSort?: (column: string, defaultDirection?: "asc" | "desc") => void;
    sort?: string;
    sortAscending?: boolean;
    showCreateSong?: boolean;
    pageSize: number;
    onPageSizeChange: (pageSize: number) => void;
    onPageChange: (page: number) => void;
    currentPage: number;
    hasMore: boolean;
    totalPages: number;
};

/***
 * UI layer
 * table vs grid vs empty
 * headers, sorting handlers, search
 */
export default function SongsTable({
    songs,
    loading = false,
    error,
    searchValue,
    onSearchChange,
    onRemove,
    onTogglePublic,
    onSort,
    sort,
    sortAscending = false,
    showCreateSong = false,
    pageSize,
    onPageSizeChange,
    onPageChange,
    currentPage,
    hasMore,
    totalPages
}: SongsTableProps) {
    const [displayType, setDisplayType] = useState<DisplayType>("table");

    const isGrid = displayType === "grid";

    const renderPublicSwitch = (item: Song | Profile) => (
        "title" in item ? (
            <PublicSwitch
                checked={item.is_public}
                onCheckedChange={(checked: boolean) => onTogglePublic?.(item, checked)}
                showLabel={isGrid}
                direction={isGrid ? "row-reverse" : "row"}
                size={isGrid ? "2" : undefined}
            />
        ) :
        null
    );

    const renderRemoveButton = (item: Song | Profile) => (
        "title" in item ? (
            <DeleteSongDialog
                songId={item.id}
                title={item.title}
                onDelete={() => onRemove?.(item)}
                size={isGrid ? "1" : undefined}
            />
        ) :
        null
    );

    useEffect(() => {
        if (window.innerWidth < 768) {
            setDisplayType("grid");
        }
    }, []);

    const headers: TableHeader[] = [
        {
            label: "Title",
            key: "title",
            href: (song) => `/songs/${song.id}`,
            sortable: true
        },
        {
            label: "Artist",
            key: "artist",
            sortable: true
        },
        {
            label: "Lyrics",
            key: "lyrics",
            truncate: 200,
            sortable: true
        },
        {
            label: "Created",
            key: "created_at",
            type: "date",
            align: "center",
            sortable: true,
            defaultSortDirection: "desc"
        },
        {
            label: "Updated",
            key: "updated_at",
            type: "date",
            align: "center",
            sortable: true,
            defaultSortDirection: "desc"
        },
        ...(onTogglePublic ? [
            {
                label: "Public",
                key: "is_public",
                align: "center" as const,
                render: renderPublicSwitch
            }
        ] : []),
        ...(onRemove ? [
            {
                label: "Actions",
                key: "actions",
                align: "center" as const,
                render: renderRemoveButton
            }
        ] : [])
    ];


    const emptyState = showCreateSong && songs.length === 0 && (
        <Flex align="center" justify="center" direction="column" className={css.newSong}>
            <p>Create your first song!</p>
            <Button asChild variant="surface" color="violet" radius="full" size="3">
                <Link href="/songs/new">
                    <FilePlus />
                    New song
                </Link>
            </Button>
        </Flex>
    );

    return (
        <Flex gap="4" direction="column">
            <Flex gap="2" align="center" justify="between">
                <SearchInput
                    value={searchValue}
                    onChange={onSearchChange}
                    ariaLabel="Search songs"
                />

                <Flex gap="2" align="center">
                    <PageSize pageSize={pageSize} onPageSizeChange={onPageSizeChange} />

                    <Separator orientation="vertical" size="1" />

                    <SegmentedControl.Root
                        value={displayType}
                        onValueChange={(value) => setDisplayType(value as DisplayType)}
                        className={css.displayTypeToggle}
                    >
                        {DISPLAY_TYPES.map((type) => {
                            const Icon = icons[type];
                            return (
                                <SegmentedControl.Item value={type} key={type}>
                                    <Flex align="center" justify="center">
                                        <Icon />
                                    </Flex>
                                </SegmentedControl.Item>
                            );
                        })}
                    </SegmentedControl.Root>
                </Flex>
            </Flex>

            {error && <TableError>{error}</TableError>}

            {displayType === "grid" ?
                (<SongsGrid
                    songs={songs}
                    headers={headers}
                    onTogglePublic={onTogglePublic ? renderPublicSwitch : null}
                    onRemove={onRemove ? renderRemoveButton : null}
                />) :
                (<Table
                    headers={headers}
                    items={songs}
                    loading={loading}
                    sort={sort}
                    sortAscending={sortAscending}
                    onSort={onSort}
                />)
            }

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                hasMore={hasMore}
                onPageChange={onPageChange}
            />

            {!loading && songs.length === 0 && emptyState}
        </Flex>
    );
}
