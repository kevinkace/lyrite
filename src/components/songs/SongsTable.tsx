"use client";

import { useSongs } from "@/contexts/SongsContext";
import { useRouter, useSearchParams } from "next/navigation";
import css from "./SongsTable.module.css"; // import CSS module

export default function SongsTable() {
    const { songs, loading, error, page, search, hasMore } = useSongs();
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
            <input
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
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song) => (
                        <tr key={song.id}>
                            <td>{song.title}</td>
                            <td>{song.artist}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={css.pagination}>
                {page > 1 && (
                    <button onClick={() => goToPage(page - 1)}>Previous</button>
                )}
                {hasMore && <button onClick={() => goToPage(page + 1)}>Next</button>}
            </div>
        </div>
    );
}
