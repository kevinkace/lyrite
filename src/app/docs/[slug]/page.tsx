import { createMarkdownPage } from "@/components/markdown/MarkdownPage";

const { generateMetadata, default: DocsPage } = createMarkdownPage({
  section: "docs",
  titlePrefix: "Docs",
});

export { generateMetadata };
export default DocsPage;
