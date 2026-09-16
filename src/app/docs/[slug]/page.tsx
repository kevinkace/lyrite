import type { Metadata } from "next";

import Markdown, { getMarkdownData } from "@/components/markdown/Markdown";
import Article from "@/components/layout/Article";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = getMarkdownData(`src/data/docs/${slug}.md`);

  return {
    title: typeof metadata.title === "string" ? metadata.title : `Docs - ${slug}`,
    description: typeof metadata.description === "string" ? metadata.description : undefined,
  };
}

export default async function DocsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <Article>
    <Markdown data={`src/data/docs/${slug}.md`} />
  </Article>;
}
