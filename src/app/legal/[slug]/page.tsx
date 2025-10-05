import Markdown from "@/components/markdown/Markdown";

export default async function PrivacyPage({ params }: { params: { slug: string } }) {
  return <Markdown data={`src/data/legal/${params.slug}.md`} />;
}
