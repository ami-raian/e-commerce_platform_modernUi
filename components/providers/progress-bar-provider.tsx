"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import NProgress from "nprogress"
import { useNavigationLoader } from "@/hooks/use-navigation-loader"

export function ProgressBarProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useNavigationLoader()

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.08,
    })
  }, [])

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  return null
}
