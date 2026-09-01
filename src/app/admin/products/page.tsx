"use client";

import dynamic from "next/dynamic";
import AdminPanel from "../../../pages/admin/AdminPanel";

const AdminProducts = dynamic(() => import("../../../views/admin/Products"), {
  ssr: false,
});

export default function Page() {
  return (
    <AdminPanel>
      <AdminProducts />
    </AdminPanel>
  );
}
