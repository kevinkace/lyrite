import Markdown from "@/components/markdown/Markdown";

export default async function LegalPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  return <Markdown data={`src/data/legal/${slug}.md`} />;
}
