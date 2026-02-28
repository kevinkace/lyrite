"use client";

import { Suspense } from "react";

import { useUsers } from "@/contexts/UsersContext";

import Table from "@/components/table/Table";


export default function UsersTable({ editControls = false }: { editControls?: boolean }) {
    const usersCollection = useUsers();

    return (
        <Suspense fallback={<div>Loading users...</div>}>
            <Table
                collection={usersCollection}
                search={usersCollection.search || ""}
                page={usersCollection.page}
                // debug={true}
                headers={[

                    {
                        label : "Name",
                        key   : "full_name",
                        href : (user) => `/users/${user.id}`
                    },
                    {
                        label : "ID",
                        key   : "id",
                        type  : "id"
                    },
                    {
                        label : "Joined",
                        key   : "created_at",
                        type  : "date"
                    }
                ]}
            />
        </Suspense>
    );
}
