import type { Metadata } from "next";

import Article from "@/components/layout/Article";

import Markdown, { getMarkdownData } from "./Markdown";

type ArticleSection = "docs" | "legal";

type MarkdownPageConfig = {
    section: ArticleSection;
    titlePrefix: string;
};

export function createMarkdownPage({ section, titlePrefix }: MarkdownPageConfig) {
    async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
        const { slug } = await params;
        const { metadata } = getMarkdownData(`src/data/${section}/${slug}.md`);

        return {
            title: typeof metadata.title === "string" ? metadata.title : `${titlePrefix} - ${slug}`,
            description: typeof metadata.description === "string" ? metadata.description : undefined,
        };
    }

    async function Page({ params }: { params: Promise<{ slug: string }> }) {
        const { slug } = await params;

        return (
            <Article>
                <Markdown data={`src/data/${section}/${slug}.md`} />
            </Article>
        );
    }

    return {
        generateMetadata,
        default: Page,
    };
}
