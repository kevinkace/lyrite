"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import { IconButton, Switch, Table, TextField, Flex } from "@radix-ui/themes";
import { LayoutGrid, ListFilter, Table2 } from "lucide-react";

import { useSongs } from "@/contexts/SongsContext";

import Pagination from "@/components/pagination/Pagination";
import DeleteSongDialog from "@/components/deleteSongDialog/DeleteSongDialog";

import css from "./SongsTable.module.css";

const MAX_LYRIC_LEN = 200;

export default function SongsTable() {
    const { songs, loading, setLoading, error, page, search, hasMore, deleteSong, updateSong } = useSongs();
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

            <Table.Root className={css.table}>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Artist</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Lyrics</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align="center">Public</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align="center">Actions</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {songs.map((song) => (
                        <Table.Row key={song.id} data-key={song.id}>
                            <Table.Cell>
                                <Link href={`/songs/${song.id}`} className={css.songLink}>
                                    {song.title}
                                </Link>
                            </Table.Cell>

                            <Table.Cell>{song.artist}</Table.Cell>

                            <Table.Cell>
                                {song.lyrics.slice(0, MAX_LYRIC_LEN)}
                                {song.lyrics.length > MAX_LYRIC_LEN && "..."}
                            </Table.Cell>

                            <Table.Cell align="center">
                                <Switch
                                    checked={song.is_public}
                                    onCheckedChange={(checked) => {
                                        updateSong(song.id, { is_public: checked });
                                    }}
                                />
                            </Table.Cell>

                            <Table.Cell align="center">
                                <DeleteSongDialog
                                    songId={song.id}
                                    title={song.title}
                                    onDelete={deleteSong}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

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
