import type { Metadata } from "next";

import Layout from "@/components/layout/Layout";
import Article from "@/components/layout/Article";
import Markdown from "@/components/markdown/Markdown";
import LocalStorageExport from "@/components/layout/LocalStorageExport";

export const metadata: Metadata = {
    title: "Migration Guide - lyrite v1",
    description: "How to recover your lyrite v1 data, and migrate to v2",
};

export default function MigrationPage() {
    return <Layout bg="mesh">
        <Article>
            <Markdown
                data={`src/data/docs/migration-guide.md`}
                replacements={{
                    "{{LOCAL_STORAGE_EXPORT}}": <LocalStorageExport label="Download v1 song data" />,
                }}
            />
        </Article>
    </Layout>;
}
