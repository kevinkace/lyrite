import type { Metadata } from "next";

import Layout   from "@/components/layout/Layout";
import Article from "@/components/layout/Article";

export const metadata: Metadata = {
    title: "Lyrite features",
    description: "How Lyrite can help you sing better, faster, and more confidently.",
};

export default function FeaturesPage() {
    return <Layout bg="mesh">
        <Article>
            list the features
        </Article>
    </Layout>;
}
