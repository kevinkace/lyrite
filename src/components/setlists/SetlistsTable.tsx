"use client";

import { Suspense } from "react";
import { Plus } from "lucide-react";

import { useSetlists } from "@/contexts/SetlistsContext";

import DeleteDialog     from "@/components/deleteDialog/DeleteDialog";
import Table            from "@/components/table/Table";
import CreateEmptyState from "@/components/table/CreateEmptyState";

import type { Setlist, TableHeader } from "@/types";

export default function SetlistsTable({ editControls = false }: { editControls?: boolean }) {
    const setlistsCollection = useSetlists();

    return (
        <Suspense fallback={<div>Loading setlists...</div>}>
            <Table
                collection={setlistsCollection}
                defaultSort="updated_at"
                search={setlistsCollection.search || ""}
                page={setlistsCollection.page}
                emptyState={editControls && setlistsCollection.total === 0 && !setlistsCollection.loading && (
                    <CreateEmptyState
                        message="Create your first setlist!"
                        href="/setlists/new"
                        label="New setlist"
                        icon={Plus}
                    />
                )}
                headers={[
                    {
                        label: "Title",
                        key: "title",
                        href: (setlist) => `/setlists/${(setlist as Setlist).id}`,
                        sortable: true,
                    },
                    {
                        label: "Songs",
                        key : "setlist_songs_count",
                        sortable: true
                    },
                    {
                        label: "Created",
                        key: "created_at",
                        type: "date",
                        align: "center",
                        sortable: true,
                        defaultSortDirection: "desc",
                    },
                    {
                        label: "Updated",
                        key: "updated_at",
                        type: "date",
                        align: "center",
                        sortable: true,
                        defaultSortDirection: "desc",
                    },
                    ...(editControls ? [
                        {
                            label: "Public",
                            key: "is_public",
                            align: "center",
                            type: "check",
                            update: (item, header) => (checked: boolean) => {
                                setlistsCollection.updateSetlist(item.id, { [header.key]: checked });
                            },
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
                                        itemType="setlist"
                                        title={(item as Setlist).title || "title"}
                                        onDelete={setlistsCollection.deleteSong}
                                    />
                                )
                            }
                        }
                    ] as TableHeader[] : []),
                ] as TableHeader[]}
            />
        </Suspense>
    );
}