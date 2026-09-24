import type { Metadata } from "next";
import HomeGate from "../components/HomeGate";
import { defaultDescription, defaultTitle } from "../lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: defaultTitle,
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <HomeGate />;
}
