import JsonLd from "./JsonLd";
import { buildBreadcrumbStructuredData, buildWebPageStructuredData } from "../lib/structuredData";

export default function PublicPageStructuredData({
  path,
  name,
  description,
  language = "bg",
  homePath = "/",
}: {
  path: string;
  name: string;
  description: string;
  language?: "bg" | "en";
  homePath?: string;
}) {
  return (
    <>
      <JsonLd
        id="webpage-structured-data"
        data={buildWebPageStructuredData({ path, name, description, language })}
      />
      <JsonLd
        id="breadcrumb-structured-data"
        data={buildBreadcrumbStructuredData({ path, name, homePath })}
      />
    </>
  );
}
