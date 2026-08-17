import Markdown from "@/components/markdown/Markdown";
import Article from "@/components/layout/Article";

export default async function PrivacyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <Article>
    <Markdown data={`src/data/legal/${slug}.md`} />
    </Article>;
}
