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
            headers={[
                {
                    label : "ID",
                    key   : "id",
                },
                {
                    label : "Joined",
                    key   : "created_at",
                }
            ]}
        />
    );
}
