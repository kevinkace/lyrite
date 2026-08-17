import type { Metadata } from "next";

import Markdown from "@/components/markdown/Markdown";
import Layout from "@/components/layout/Layout";
import Article from "@/components/layout/Article";

export const metadata: Metadata = {
    title: "Migration guide for lyrite v1",
    description: "How to recover your lyrite v1 data, and migrate to v2",
};

export default function MigrationPage() {
    return <Layout bg="mesh">
        <Article>
            <Markdown data={`src/data/docs/announce-v2.md`} />
        </Article>
    </Layout>;
}
