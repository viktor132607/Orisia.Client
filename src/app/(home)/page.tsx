import HomeGate from "../../components/HomeGate";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import {
  defaultDescription,
  defaultTitle,
} from "../../lib/seo";

export default function Page() {
  return (
    <>
      <PublicPageStructuredData
        path="/"
        name={defaultTitle}
        description={defaultDescription}
      />
      <HomeGate />
    </>
  );
}
