import { createMarkdownPage } from "@/components/markdown/MarkdownPage";
import LocalStorageExport from "@/components/layout/LocalStorageExport";

const { generateMetadata, default: DocsPage } = createMarkdownPage({
  section: "docs",
  titlePrefix: "Docs",
  replacements: {
    "{{LOCAL_STORAGE_EXPORT}}": LocalStorageExport,
  },
});

export { generateMetadata };
export default DocsPage;
