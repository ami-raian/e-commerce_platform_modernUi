"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, Menu, X, Moon, Sun, Search } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import { useCartStore } from "@/lib/cart-store"
import { useAuthStore } from "@/lib/auth-store"

export function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const items = useCartStore((state) => state.items)
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setShowSearch(false)
    }
  }

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container-xl flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-serif font-bold text-primary">
          ShopHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">
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
            {mounted ? (theme === "light" ? <Moon size={20} /> : <Sun size={20} />) : <Moon size={20} />}
          </button>

          <Link href="/cart" className="p-2 hover:bg-accent rounded-lg transition-colors relative text-foreground">
            <ShoppingCart size={20} />
            {mounted && cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Links */}
          {mounted && user ? (
            <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors font-medium">
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link href="/login" className="btn-primary text-center px-4 py-2 text-sm">
              Sign In
            </Link>
          )}

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
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              autoFocus
              className="flex-1 px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
              Search
            </button>
            <button type="button" onClick={() => setShowSearch(false)} className="px-4 py-1.5 text-sm border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border p-4 flex flex-col gap-4">
          <Link href="/products" className="text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          {mounted && user ? (
            <>
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors font-medium">
                My Dashboard
              </Link>
            </>
          ) : (
            <Link href="/login" className="btn-primary text-center">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
