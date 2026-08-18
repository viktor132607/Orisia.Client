"use client";

import { API_BASE_URL } from "../config/api";
import { useEffect, useState } from "react";
import { ArrowRightIcon, BoltIcon, ChartBarIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { Link } from "../lib/routerCompat";
import ProductCard from "../components/products/ProductCard";

interface Category {
  id: string;
  name: string;
  imageURI?: string;
  imageUri?: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  mainImageUrl: string;
  regularPrice: number;
  quantity: number;
  categoryId: string;
  rating?: number;
  discountPercentage?: number;
  discountedPrice?: number;
}

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [categoriesResponse, bestSellersResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/Categories`),
          fetch(`${API_BASE_URL}/Products/best-sellers?numOfBestSellers=3`),
        ]);

        if (categoriesResponse.ok) {
          const categoriesData = (await categoriesResponse.json()) as Category[];
          setCategories(categoriesData);
        }

        if (bestSellersResponse.ok) {
          const bestSellersData = (await bestSellersResponse.json()) as Product[];
          setBestSellers(bestSellersData);
        }
      } catch (error) {
        console.error("Home data fetch failed:", error);
      }
    };

    void fetchHomeData();
  }, []);

  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_right,_rgba(96,165,250,0.18),_transparent_32%),linear-gradient(115deg,#081123_0%,#172554_48%,#1f3a8a_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary-100">
              New season essentials
            </span>
            <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Equipment that holds up in training and on match day
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
              Shop reliable running, football, fitness, cycling, and outdoor gear with practical product details, current stock levels, and straightforward checkout.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-18px_rgba(59,130,246,0.75)] transition hover:bg-primary-400"
              >
                Browse the catalog
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                About Orisia
              </Link>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Categories", value: `${categories.length || 8}+` },
                { label: "Dispatch for in-stock orders", value: "24h" },
                { label: "Return window", value: "14 days" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/12 bg-white/6 p-5 backdrop-blur">
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 top-8 h-36 w-36 rounded-full bg-primary-400/20 blur-3xl" />
            <div className="absolute -left-6 bottom-0 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-[0_35px_100px_-45px_rgba(15,23,42,1)]">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
                alt="Running shoes"
                className="h-full min-h-[280px] w-full rounded-[1.5rem] object-cover sm:min-h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: ShieldCheckIcon,
              title: "Clear product information",
              description: "Prices, discounts, materials, and stock levels are shown where customers expect them.",
            },
            {
              icon: BoltIcon,
              title: "Fast browsing",
              description: "Filter by category, price, and rating to get to the right gear without digging through filler content.",
            },
            {
              icon: ChartBarIcon,
              title: "Store operations built in",
              description: "Orders, inventory, and low-stock alerts are available from the admin workspace.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.5)]">
              <item.icon className="h-10 w-10 rounded-2xl bg-primary-50 p-2.5 text-primary-600" />
              <h2 className="mt-5 font-display text-xl font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-600">Shop by sport</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950">Browse the catalog by activity</h2>
          </div>
          <Link to="/products" className="hidden text-sm font-semibold text-slate-700 transition hover:text-primary-600 sm:inline-flex">
            View all products
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {categories.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.id)}`}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.45)]"
            >
              <div className="aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-slate-100">
                <img
                  src={category.imageUri ?? category.imageURI ?? "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80"}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="font-display text-xl font-semibold text-slate-950">{category.name}</p>
                  <p className="mt-1 text-sm text-slate-500">See current stock and related products</p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-slate-400 transition group-hover:text-primary-600" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-600">Popular right now</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950">Best-selling products</h2>
            </div>
            <Link to="/products" className="hidden text-sm font-semibold text-slate-700 transition hover:text-primary-600 sm:inline-flex">
              Open catalog
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
