// app/privacy/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function Markdown({ data: dataPath }: { data: string }) {
  const filePath = path.join(process.cwd(), dataPath);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return <div dangerouslySetInnerHTML={{ __html: contentHtml }} />;
}
