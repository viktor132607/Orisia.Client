import type { Metadata } from "next";
import AdminMenu from "../../components/AdminMenu";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminMenu />
      {children}
    </>
  );
}
