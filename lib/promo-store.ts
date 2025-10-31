import { create } from "zustand"

interface PromoStore {
  appliedCode: string | null
  discount: number
  discountType: "percentage" | "fixed"
  setPromoCode: (code: string, discount: number, type: "percentage" | "fixed") => void
  removePromoCode: () => void
  calculateDiscount: (subtotal: number) => number
}

export const usePromoStore = create<PromoStore>((set, get) => ({
  appliedCode: null,
  discount: 0,
  discountType: "percentage",
  setPromoCode: (code, discount, type) =>
    set({
      appliedCode: code,
      discount,
      discountType: type,
    }),
  removePromoCode: () =>
    set({
      appliedCode: null,
      discount: 0,
      discountType: "percentage",
    }),
  calculateDiscount: (subtotal) => {
    const state = get()
    if (!state.appliedCode) return 0
    if (state.discountType === "percentage") {
      return (subtotal * state.discount) / 100
    }
    return state.discount
  },
}))
