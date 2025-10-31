export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export function calculateDiscount(originalPrice: number, discountPercent: number): number {
  return originalPrice - originalPrice * (discountPercent / 100)
}

export function isFlashSaleActive(startTime: Date, endTime: Date): boolean {
  const now = new Date()
  return now >= startTime && now <= endTime
}

export function getRemainingTime(endTime: Date): {
  days: number
  hours: number
  minutes: number
  seconds: number
} {
  const now = new Date().getTime()
  const end = new Date(endTime).getTime()
  const difference = end - now

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}
