import Markdown from "@/components/markdown/Markdown";

export default async function PrivacyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <Markdown data={`src/data/legal/${slug}.md`} />;
}
