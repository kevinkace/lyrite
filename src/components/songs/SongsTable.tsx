"use client";

import { Suspense } from "react";
import { FilePlus } from "lucide-react";

import { useSongs } from "@/contexts/SongsContext";

import DeleteDialog from "@/components/deleteDialog/DeleteDialog";
import Table            from "@/components/table/Table";
import CreateEmptyState from "@/components/table/CreateEmptyState";

import type { Song, TableHeader } from "@/types";

export default function SongsTable({ editControls = false }: { editControls?: boolean }) {
    const songsCollection = useSongs();

    return (
        <Suspense fallback={<div>Loading songs...</div>}>
            <Table
                collection={songsCollection}
                defaultSort="updated_at"
                search={songsCollection.search || ""}
                page={songsCollection.page}
                emptyState={editControls && songsCollection.total === 0 && (
                    <CreateEmptyState
                        message="Create your first song!"
                        href="/songs/new"
                        label="New song"
                        icon={FilePlus}
                    />
                )}
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
                        sortable : true,
                        defaultSortDirection : "desc"
                    },
                    {
                        label : "Updated",
                        key   : "updated_at",
                        type  : "date",
                        align : "center",
                        sortable : true,
                        defaultSortDirection : "desc"
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
                                    delete : (item, parentKey) => (
                                        <DeleteDialog
                                            key={parentKey + "delete"}
                                            id={item.id}
                                            itemType="song"
                                            title={(item as Song).title || "title"}
                                            onDelete={songsCollection.deleteSong}
                                        />
                                    )
                                }
                            }
                        ] as TableHeader[] :
                        []
                    )
                ]}
            />
        </Suspense>
    );
}
