"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { IconButton, Switch, TextField } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

import { useSongs } from "@/contexts/SongsContext";

import css from "./SongsTable.module.css";

const MAX_LEN = 100;

export default function SongsTable() {
    const { songs, loading, error, page, search, hasMore, deleteSong, updateSong } = useSongs();
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", String(newPage));

        router.push(`?${params.toString()}`);
    };

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

            <table className={css.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Lyrics</th>
                        <th>Public</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song) => (
                        <tr key={song.id}>
                            <td>
                                <Link href={`/songs/${song.id}`} className={css.songLink}>
                                    {song.title}
                                </Link>
                            </td>

                            <td>{song.artist}</td>

                            <td>{song.lyrics.slice(0, MAX_LEN)}{song.lyrics.length > MAX_LEN && "..."}</td>

                            <td>
                                <Switch
                                    checked={song.is_public}
                                    onCheckedChange={(checked) => {
                                        updateSong(song.id, { is_public: checked })
                                    }}
                                />
                            </td>

                            <td>
                                <IconButton color="crimson" onClick={() => deleteSong(song.id)}>
                                    <TrashIcon />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {page && (<div className={css.pagination}>
                {page > 1 && (
                    <button onClick={() => goToPage(page - 1)}>Previous</button>
                )}
                {hasMore && <button onClick={() => goToPage(page + 1)}>Next</button>}
            </div>)}
        </div>
    );
}
