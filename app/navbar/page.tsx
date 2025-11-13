"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, Moon, Sun, Search } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import { useCartStore } from "@/lib/cart-store"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const itemCount = useCartStore((state) => state.getItemCount())

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container-xl flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-serif font-bold text-primary">
          Marqen
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/products?category=electronics" className="text-foreground hover:text-primary transition-colors">
            Electronics
          </Link>
          <Link href="/products?category=fashion" className="text-foreground hover:text-primary transition-colors">
            Fashion
          </Link>
          <Link href="/products?category=home" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Search size={20} />
          </button>
          <button onClick={toggleTheme} className="p-2 hover:bg-accent rounded-lg transition-colors">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link href="/cart" className="p-2 hover:bg-accent rounded-lg transition-colors relative">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border p-4 flex flex-col gap-4">
          <Link href="/products" className="text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/products?category=electronics" className="text-foreground hover:text-primary transition-colors">
            Electronics
          </Link>
          <Link href="/products?category=fashion" className="text-foreground hover:text-primary transition-colors">
            Fashion
          </Link>
          <Link href="/products?category=home" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
        </div>
      )}
    </nav>
  )
}
