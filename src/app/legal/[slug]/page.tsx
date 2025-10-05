import Markdown from "@/components/markdown/Markdown";

export default async function PrivacyPage({ params }: { params: { slug : Promise<{ id: string }> } }) {
  const resolvedSlug = await params.slug;

  return <Markdown data={`src/data/legal/${resolvedSlug.id}.md`} />;
}
