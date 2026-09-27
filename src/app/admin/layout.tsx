import type { Metadata } from "next";
import AdminGuard from "../../components/AdminGuard";
import AdminMenu from "../../components/AdminMenu";

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGuard><div className="admin-shell"><AdminMenu /><div className="admin-content">{children}</div></div></AdminGuard>;
}
