"use client";

import { useUsers } from "@/contexts/UsersContext";

import Table from "../table/Table";


export default function UsersTable({ editControls = false }: { editControls?: boolean }) {
    const { users, loading, search, error, page, hasMore, setLoading } = useUsers();


    return (
        <Table
            search={search || ""}
            hasMore={hasMore}
            setLoading={setLoading}
            loading={loading}
            error={error}
            items={users}
            page={page}
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
