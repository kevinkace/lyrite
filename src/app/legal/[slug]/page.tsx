import { createMarkdownPage } from "@/components/markdown/MarkdownPage";

const { generateMetadata, default: PrivacyPage } = createMarkdownPage({
  section: "legal",
  titlePrefix: "Legal",
});

export { generateMetadata };
export default PrivacyPage;
