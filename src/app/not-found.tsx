import type { Metadata } from "next";
import NotFoundClient from "../components/NotFoundClient";

export const metadata: Metadata = {
  title: "404 — Страницата не е намерена",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
