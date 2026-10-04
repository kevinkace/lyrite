"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, Flex, Grid, SegmentedControl, Switch } from "@radix-ui/themes";
import { FilePlus, LayoutGrid, Table2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import DeleteSongDialog from "@/components/deleteSongDialog/DeleteSongDialog";
import SearchInput from "@/components/search/SearchInput";
import Table from "@/components/table/Table";
import TableCell from "@/components/table/TableCell";

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
};

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
    showCreateSong = false
}: SongsTableProps) {
    const [displayType, setDisplayType] = useState<DisplayType>("table");

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
                render: (item: Song | Profile) => "title" in item ? (
                    <Switch
                        checked={item.is_public}
                        onCheckedChange={(checked) => onTogglePublic(item, checked)}
                    />
                ) : null
            }
        ] : []),
        ...(onRemove ? [
            {
                label: "Actions",
                key: "actions",
                align: "center" as const,
                render: (item: Song | Profile) => "title" in item ? (
                    <DeleteSongDialog
                        songId={item.id}
                        title={item.title}
                        onDelete={() => onRemove(item)}
                    />
                ) : null
            }
        ] : [])
    ];

    const gridContent = displayType === "grid" ? (
        <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4">
            {songs.map((song) => (
                <Card className={css.card} key={song.id}>
                    {headers.map((header, index) => (
                        <div
                            key={header.key + song.id}
                            className={index === 0 ? css.cardHeader : css.cardField}
                        >
                            {index > 0 && <span className={css.cardLabel}>{header.label}</span>}
                            <TableCell item={song} header={header} />
                        </div>
                    ))}
                </Card>
            ))}
        </Grid>
    ) : undefined;

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

            {error && <p className={css.error}>{error}</p>}
            {displayType === "grid" ? gridContent : (
                <Table
                    headers={headers}
                    items={songs}
                    loading={loading}
                    sort={sort}
                    sortAscending={sortAscending}
                    onSort={onSort}
                />
            )}
            {!loading && songs.length === 0 && emptyState}
        </Flex>
    );
}
