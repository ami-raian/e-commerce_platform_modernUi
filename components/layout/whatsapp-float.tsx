"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/8801650278889"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulsing ring animation */}
        <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ backgroundColor: '#25D366' }}></div>

        {/* Main button - Official WhatsApp Green */}
        <div
          className="relative text-white rounded-full p-3 shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-xl"
          style={{ backgroundColor: '#25D366' }}
        >
          <MessageCircle size={24} strokeWidth={2.5} fill="currentColor" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
          Chat with us on WhatsApp
          {/* Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-gray-900"></div>
        </div>
      </div>
    </a>
  )
}
