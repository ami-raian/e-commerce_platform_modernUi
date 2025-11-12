import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground border-t border-border mt-16">
      <div className="container-xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-foreground">marqenbd</h3>
            <p className="text-sm">
              Premium e-commerce platform with smooth animations and modern design.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/marqenbd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/marqenbd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/8801650278889"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="hover:text-primary transition-colors">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:marqenbd@gmail.com" className="hover:text-primary transition-colors">
                  marqenbd@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+8801650278889" className="hover:text-primary transition-colors">
                  +880 1650-278889
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Daffodil Smart City, Ashulia, Dhaka-1216</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2025 marqenbd. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
