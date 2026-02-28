"use client";

import { useUsers } from "@/contexts/UsersContext";

import Table from "../table/Table";


export default function UsersTable({ editControls = false }: { editControls?: boolean }) {
    const usersCollection = useUsers();

    return (
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
    );
}
