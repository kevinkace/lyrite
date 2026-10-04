"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, Flex, Grid, IconButton, SegmentedControl, Switch, TextField } from "@radix-ui/themes";
import { FilePlus, LayoutGrid, Search, Table2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";

import DeleteSongDialog from "@/components/deleteSongDialog/DeleteSongDialog";
import Table            from "@/components/table/Table";
import TableCell from "@/components/table/TableCell";
import Pagination from "@/components/pagination/Pagination";

import type { Profile, Song, SongsCollection, TableHeader } from "@/types";

import css from "./SongsTable.module.css";

const DISPLAY_TYPES = ["table", "grid"] as const;
type DisplayType = typeof DISPLAY_TYPES[number];

const icons: Record<DisplayType, LucideIcon> = {
    table: Table2,
    grid: LayoutGrid,
};

type SongsTableProps = {
    collection: SongsCollection;
    editControls?: boolean;
};

export default function SongsTable(props: SongsTableProps) {
    return (
        <Suspense fallback={<div>Loading songs...</div>}>
            <SongsTableContent {...props} />
        </Suspense>
    );
}

function SongsTableContent({ collection: songsCollection, editControls = false }: SongsTableProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [displayType, setDisplayType] = useState<DisplayType>("table");
    const [searchValue, setSearchValue] = useState(songsCollection.search || "");
    const debouncedSearch = useDebounce(searchValue, 500);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setDisplayType("grid");
        }
    }, []);

    useEffect(() => {
        setSearchValue(songsCollection.search || "");
    }, [songsCollection.search]);

    useEffect(() => {
        if (debouncedSearch === (songsCollection.search || "")) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("search", debouncedSearch);
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    }, [debouncedSearch, router, searchParams, songsCollection.search]);

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
        ...(editControls ? [
            {
                label: "Public",
                key: "is_public",
                align: "center" as const,
                render: (item: Song | Profile) => "is_public" in item ? (
                    <Switch
                        checked={item.is_public}
                        onCheckedChange={(checked) => songsCollection.updateSong(item.id, { is_public: checked })}
                    />
                ) : null
            },
            {
                label: "Actions",
                key: "actions",
                align: "center" as const,
                render: (item: Song | Profile) => "title" in item ? (
                    <DeleteSongDialog
                        songId={item.id}
                        title={item.title}
                        onDelete={songsCollection.deleteSong}
                    />
                ) : null
            }
        ] : [])
    ];

    const gridContent = displayType === "grid" ? (
        <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4">
            {songsCollection.songs.map((song) => (
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

    const emptyState = editControls && songsCollection.total === 0 && (
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
                    <IconButton variant="soft" color="gray" aria-label="Search songs">
                        <Search />
                    </IconButton>
                </Flex>

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

            {songsCollection.error && <p className={css.error}>{songsCollection.error}</p>}
            {displayType === "grid" ? gridContent : (
                <Table
                    headers={headers}
                    items={songsCollection.songs}
                    loading={songsCollection.loading}
                    defaultSort="updated_at"
                />
            )}
            {!songsCollection.loading && songsCollection.songs.length === 0 && emptyState}
            <Pagination
                currentPage={songsCollection.page}
                totalPages={songsCollection.pages}
                hasMore={songsCollection.hasMore}
                setLoading={songsCollection.setLoading}
            />
        </Flex>
    );
}
