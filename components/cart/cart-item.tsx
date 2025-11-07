"use client"

import { Trash2, Plus, Minus } from "lucide-react"
import type { CartItem } from "@/lib/cart-store"

interface CartItemProps {
  item: CartItem
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
      <div className="w-24 h-24 rounded-lg overflow-hidden bg-accent flex-shrink-0">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
        <p className="text-primary font-bold">৳{item.price.toLocaleString('en-BD')}</p>
      </div>

      <div className="flex flex-col items-end gap-4">
        <button onClick={() => onRemove(item.productId)} className="p-2 hover:bg-accent rounded-lg transition-colors">
          <Trash2 size={18} className="text-destructive" />
        </button>

        <div className="flex items-center gap-2 border border-border rounded-lg">
          <button
            onClick={() => onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}
            className="p-2 hover:bg-accent transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            className="p-2 hover:bg-accent transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
