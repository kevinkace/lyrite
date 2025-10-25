"use client";

import { useSongs } from "@/contexts/SongsContext";

import DeleteSongDialog from "@/components/deleteSongDialog/DeleteSongDialog";

import css from "./SongsTable.module.css";
import { formattedDay } from "@/lib/dates";
import Table from "../table/Table";

const MAX_LYRIC_LEN = 200;

export default function SongsTable({ editControls = false }: { editControls?: boolean }) {
    const { songs, loading, setLoading, error, page, search, hasMore, deleteSong, updateSong } = useSongs();


    return (
        <Table
            search={search || ""}
            hasMore={hasMore}
            setLoading={setLoading}
            loading={loading}
            error={error}
            items={songs}
            page={page}
            editControls={editControls}
            headers={[
                {
                    label : "Title",
                    key   : "title",
                    href : (song) => `/songs/${song.id}`,
                },
                {
                    label : "Artist",
                    key   : "artist",
                },
                {
                    label : "Lyrics",
                    key   : "lyrics",
                },
                {
                    label : "Created",
                    key   : "created_at",
                    type  : "date",
                    align : "center",
                },
                {
                    label : "Updated",
                    key   : "updated_at",
                    type  : "date",
                    align : "center",
                },
                {
                    label : "Public",
                    key   : "is_public",
                    align : "center",
                    type  : "check",
                    update : (item, header) => (checked) => {
                        updateSong(item.id, { [header.key]: checked });
                    }
                },
                {
                    label : "Actions",
                    key   : "actions",
                    align : "center",
                    actions : {
                        delete : (item, parentKey) => <DeleteSongDialog key={parentKey + "delete"} songId={item.id} title={item.title || "title"} onDelete={deleteSong}/>
                    }
                }
            ]}
        />
    );
}
