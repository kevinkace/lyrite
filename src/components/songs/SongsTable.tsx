"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import { FilePlus } from "lucide-react";

import { useSongs } from "@/contexts/SongsContext";

import DeleteSongDialog from "@/components/deleteSongDialog/DeleteSongDialog";
import Table            from "@/components/table/Table";

import type { Song, TableHeader } from "@/types";

import css from "./SongsTable.module.css";

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
                    emptyState={editControls && songsCollection.total === 0 && (
                        <Flex align="center" justify="center" direction="column" className={css.newSong}>
                            <p>Create your first song!</p>
                            <Button asChild variant="surface" color="violet" radius="full" size="3">
                                <Link href="/songs/new">
                                    <FilePlus />
                                    New song
                                </Link>
                            </Button>
                        </Flex>
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
