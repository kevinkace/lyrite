"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Switch, Table, TextField } from "@radix-ui/themes";

import { useSongs } from "@/contexts/SongsContext";

import Pagination from "@/components/pagination/Pagination";
import DeleteSongDialog from "@/components/deleteSongDialog/DeleteSongDialog";

import css from "./SongsTable.module.css";

const MAX_LYRIC_LEN = 200;

export default function SongsTable() {
    const { songs, loading, setLoading, error, page, search, hasMore, deleteSong, updateSong } = useSongs();
    const router = useRouter();
    const searchParams = useSearchParams();

    const setSearch = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("search", value);
        params.set("page", "1");

        router.push(`?${params.toString()}`);
    };

    return (
        <div className={css.wrapper}>
            <TextField.Root
                type="text"
                defaultValue={search}
                placeholder="Search songs..."
                onBlur={(e) => setSearch(e.target.value)}
                className={css.searchInput}
            />

            {loading && <p>Loading...</p>}
            {error && <p className={css.error}>{error}</p>}

            <Table.Root className={css.table}>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Artist</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Lyrics</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Public</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
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

                            <Table.Cell>{song.lyrics.slice(0, MAX_LYRIC_LEN)}{song.lyrics.length > MAX_LYRIC_LEN && "..."}</Table.Cell>

                            <Table.Cell>
                                <Switch
                                    checked={song.is_public}
                                    onCheckedChange={(checked) => {
                                        updateSong(song.id, { is_public: checked })
                                    }}
                                />
                            </Table.Cell>

                            <Table.Cell>
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
