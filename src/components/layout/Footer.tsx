"use client";

import { Link } from "../../lib/routerCompat";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="space-y-5">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">Orisia</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              Sports equipment for runners, teams, gym sessions, and weekend adventures, with clear product details and current stock information.
            </p>
          </div>
          <div className="grid gap-2 text-sm text-slate-400">
            <p>Email: support@orisia.bg</p>
            <p>Phone: +359 88 812 3456</p>
            <p>Address: 2 Dragan Draganov Str., Ruse, Bulgaria</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Store</p>
          <div className="mt-5 grid gap-3 text-sm">
            <Link to="/products" className="text-slate-300 transition hover:text-white">
              Shop
            </Link>
            <Link to="/about" className="text-slate-300 transition hover:text-white">
              About us
            </Link>
            <Link to="/orders" className="text-slate-300 transition hover:text-white">
              Order tracking
            </Link>
            <Link to="/profile" className="text-slate-300 transition hover:text-white">
              Account
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Customer care</p>
          <div className="mt-5 space-y-3 rounded-3xl border border-slate-800 bg-white/5 p-5 text-sm text-slate-300">
            <p>Shipping across Bulgaria in 2 to 4 business days for in-stock items.</p>
            <p>14-day returns on unused products in their original condition.</p>
            <p>Support is available for sizing, order questions, and product availability.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Orisia. All rights reserved.</p>
          <p>Prices and stock levels are updated regularly.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
