"use client";

import { SetlistsProvider } from "@/contexts/SetlistsContext";

import Layout from "@/components/layout/Layout";
import SetlistsTable from "@/components/setlists/SetlistsTable";

export default function SetlistsPage() {
    return (
        <Layout>
            <div>
                <h1>Setlists</h1>

                <SetlistsProvider>
                    <SetlistsTable />
                </SetlistsProvider>
            </div>
        </Layout>
    );
}