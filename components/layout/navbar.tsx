"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const user = useAuthStore((state) => state.user);

  // Check if a route is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container-xl flex items-center justify-between py-4">
        <Link href="/" className="flex items-center">
          {theme === "dark" ? (
            <Image
              src="/dark-mode-logo.png"
              alt="Marqen"
              height={50}
              width={50}
              priority
              className="h-10 w-auto"
            />
          ) : (
            <Image
              src="/light-mode-logo.png"
              alt="Marqen"
              height={50}
              width={50}
              priority
              className="h-10 w-auto"
            />
          )}
          {/* {mounted && (
            <Image
              src={
                theme === "dark"
                  ? "/dark-mode-logo.png"
                  : "/light-mode-logo.png"
              }
              alt="Marqen"
              width={150}
              height={50}
              priority
              className="h-10 w-auto"
            />
          )} */}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/products"
            className={`transition-colors font-medium ${
              isActive("/products")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-foreground hover:text-primary"
            }`}
          >
            Products
          </Link>
          <Link
            href="/categories"
            className={`transition-colors font-medium ${
              isActive("/categories")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-foreground hover:text-primary"
            }`}
          >
            Categories
          </Link>
          <Link
            href="/about"
            className={`transition-colors font-medium ${
              isActive("/about")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-foreground hover:text-primary"
            }`}
          >
            About
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 hover:bg-accent rounded-lg transition-colors text-foreground"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-accent rounded-lg transition-colors text-foreground"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "light" ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} />
              )
            ) : (
              <Moon size={20} />
            )}
          </button>

          <Link
            href="/cart"
            className={`p-2 rounded-lg transition-colors relative ${
              isActive("/cart")
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-accent"
            }`}
          >
            <ShoppingCart
              size={20}
              className={isActive("/cart") ? "stroke-[2.5]" : ""}
            />
            {mounted && cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Links */}
          {/* {mounted && user ? (
            <Link
              href="/dashboard"
              className={`transition-colors font-medium ${
                isActive("/dashboard") || isActive("/admin")
                  ? "text-primary font-semibold"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link
              href="/login"
              className={`text-center px-4 py-2 text-sm ${
                isActive("/login") || isActive("/register")
                  ? "btn-primary opacity-90"
                  : "btn-primary"
              }`}
            >
              Sign In
            </Link>
          )} */}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="border-t border-border p-3 bg-card">
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto flex gap-2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              autoFocus
              className="flex-1 px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="px-4 py-1.5 text-sm border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border p-4 flex flex-col gap-4">
          <Link
            href="/products"
            className={`transition-colors font-medium ${
              isActive("/products")
                ? "text-primary font-semibold"
                : "text-foreground hover:text-primary"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/categories"
            className={`transition-colors font-medium ${
              isActive("/categories")
                ? "text-primary font-semibold"
                : "text-foreground hover:text-primary"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Categories
          </Link>
          <Link
            href="/about"
            className={`transition-colors font-medium ${
              isActive("/about")
                ? "text-primary font-semibold"
                : "text-foreground hover:text-primary"
            }`}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          {/* {mounted && user ? (
            <>
              <Link
                href="/dashboard"
                className={`transition-colors font-medium ${
                  isActive("/dashboard")
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                My Dashboard
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="btn-primary text-center"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          )} */}
        </div>
      )}
    </nav>
  );
}
