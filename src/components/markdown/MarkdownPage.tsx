import type { Metadata } from "next";

import { env } from "@/lib/env";

import Article from "@/components/layout/Article";

import Markdown, { getMarkdownData, type MarkdownReplacements } from "./Markdown";

type ArticleSection = "docs" | "legal";

type MarkdownPageConfig = {
    section: ArticleSection;
    titlePrefix: string;
    replacements?: MarkdownReplacements;
};

export function createMarkdownPage({ section, titlePrefix, replacements }: MarkdownPageConfig) {
    async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
        const { slug } = await params;
        const { metadata } = getMarkdownData(`src/data/${section}/${slug}.md`);
        const title = typeof metadata.title === "string" ? metadata.title : `${titlePrefix} - ${slug}`;
        const description = typeof metadata.description === "string" ? metadata.description : undefined;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                type: "website",
                siteName: "Lyrite",
                url: `${env.NEXT_PUBLIC_LOGIN_REDIRECT}/${section}/${slug}`,
            },
            twitter: {
                // card: "summary_large_image",
                title,
                description,
            },
        };
    }

    async function Page({ params }: { params: Promise<{ slug: string }> }) {
        const { slug } = await params;

        return (
            <Article>
                <Markdown data={`src/data/${section}/${slug}.md`} replacements={replacements} />
            </Article>
        );
    }

    return {
        generateMetadata,
        default: Page,
    };
}
