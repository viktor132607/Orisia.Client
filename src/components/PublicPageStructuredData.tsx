import JsonLd from "./JsonLd";
import { buildBreadcrumbStructuredData, buildWebPageStructuredData } from "../lib/structuredData";

export default function PublicPageStructuredData({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  return (
    <>
      <JsonLd
        id="webpage-structured-data"
        data={buildWebPageStructuredData({ path, name, description })}
      />
      <JsonLd
        id="breadcrumb-structured-data"
        data={buildBreadcrumbStructuredData({ path, name })}
      />
    </>
  );
}
