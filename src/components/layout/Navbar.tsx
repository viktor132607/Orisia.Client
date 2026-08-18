"use client";

import { API_BASE_URL } from "../../config/api";
import { FormEvent, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "../../lib/routerCompat";
import { useDispatch, useSelector } from "react-redux";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { RootState } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { decodeJWT } from "../../utils/jwtUtils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, token, user } = useSelector((state: RootState) => state.auth);

  const isAdmin = useMemo(() => {
    const decodedToken = decodeJWT(token);
    return (
      decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Admin"
    );
  }, [token]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/Auth/logout`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      dispatch(logout());
      navigate("/");
    }
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    const params = trimmedQuery ? `?search=${encodeURIComponent(trimmedQuery)}` : "";
    navigate(`/products${params}`);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:border-primary-300 hover:text-primary-600 md:hidden"
        >
          {isMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
        </button>

        <Link to="/" className="flex min-w-0 flex-1 items-center gap-3 md:flex-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)]">
            SG
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-bold tracking-tight text-slate-950">Orisia</p>
            <p className="hidden truncate text-xs text-slate-500 xl:block">Gear for training days and match days</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-100 text-slate-950"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={handleSearchSubmit} className="hidden flex-1 md:block">
          <div className="relative mx-auto max-w-xl">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by product name or category"
              className="h-12 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100"
            />
          </div>
        </form>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          {isAdmin && (
            <Link
              to="/admin"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                location.pathname.startsWith("/admin")
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-700"
              }`}
            >
              Admin
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <Link
                to="/cart"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-primary-300 hover:text-primary-600"
              >
                <ShoppingBagIcon className="h-5 w-5" />
              </Link>
              <Link
                to="/profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-primary-300 hover:text-primary-600"
              >
                <UserCircleIcon className="h-6 w-6" />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-950">
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-600"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6 md:hidden">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100"
              />
            </div>
          </form>

          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-100 text-slate-950"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-4 grid gap-2">
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-2xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm font-medium text-primary-700"
              >
                Open admin panel
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700"
                >
                  Cart
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700"
                >
                  {user?.name ?? "Account"}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl bg-slate-950 px-4 py-3 text-left text-sm font-medium text-white"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                  Sign in
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white">
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
