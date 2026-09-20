"use client";

import { Suspense } from "react";

import { useSongs } from "@/contexts/SongsContext";

import DeleteSongDialog from "@/components/deleteSongDialog/DeleteSongDialog";
import Table            from "@/components/table/Table";

import type { Song, TableHeader } from "@/types";

export default function SongsTable({ editControls = false }: { editControls?: boolean }) {
    const songsCollection = useSongs();

    return (
        <>
            <Suspense fallback={<div>Loading songs...</div>}>
                <Table
                    collection={songsCollection}
                    defaultSort="updated_at"
                    search={songsCollection.search || ""}
                    page={songsCollection.page}
                    headers={[
                        {
                            label : "Title",
                            key   : "title",
                            href : (song) => `/songs/${song.id}`,
                            sortable : true
                        },
                        {
                            label : "Artist",
                            key   : "artist",
                            sortable : true
                        },
                        {
                            label : "Lyrics",
                            key   : "lyrics",
                            sortable : true
                        },
                        {
                            label : "Created",
                            key   : "created_at",
                            type  : "date",
                            align : "center",
                            sortable : true
                        },
                        {
                            label : "Updated",
                            key   : "updated_at",
                            type  : "date",
                            align : "center",
                            sortable : true
                        },
                        ...(editControls ?
                            [
                                {
                                    label : "Public",
                                    key   : "is_public",
                                    align : "center",
                                    type  : "check",
                                    update : (item, header) => (checked) => {
                                        songsCollection.updateSong(item.id, { [header.key]: checked });
                                    }
                                },
                                {
                                    label : "Actions",
                                    key   : "actions",
                                    align : "center",
                                    actions : {
                                        delete : (item, parentKey) => <DeleteSongDialog key={parentKey + "delete"} songId={item.id} title={(item as Song).title || "title"} onDelete={songsCollection.deleteSong}/>
                                    }
                                }
                            ] as TableHeader[] :
                            []
                        )
                    ]}
                />
            </Suspense>
        </>
    );
}
