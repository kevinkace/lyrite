"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Layout              from "@/components/layout/Layout";
import SongsTableContainer from "@/components/songs/SongsTableContainer";

import { SongsProvider } from "@/contexts/SongsContext";

import { normalizePageSize } from "@/lib/pagination";

function SongsPageContent() {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const pageSize = normalizePageSize(searchParams.get("pageSize"));
    const search = searchParams.get("search") ?? "";
    const sortParam = searchParams.get("sort");
    const sort = sortParam === "none" ? "" : sortParam ?? undefined;
    const direction = searchParams.get("direction");

    return (
        <Layout>
            <div>
                <h1>Songs</h1>

                <SongsProvider
                    page={page}
                    search={search}
                    sort={sort}
                    sortAscending={direction !== "desc"}
                    pageSize={pageSize}
                >
                    <SongsTableContainer />
                </SongsProvider>
            </div>
        </Layout>
    );
}

export default function SongsPage() {
    return (
        <Suspense fallback={<div>Loading songs...</div>}>
            <SongsPageContent />
        </Suspense>
    );
}
