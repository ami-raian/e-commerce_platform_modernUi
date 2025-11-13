"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err: any) {
      console.error("Error sending contact form:", err)
      setError(err.message || "Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container-xl py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-title mb-12 text-center">Get in Touch</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="card text-center">
            <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email</h3>
            <a href="mailto:marqenbd@gmail.com" className="text-primary hover:underline">
              marqenbd@gmail.com
            </a>
          </div>
          <div className="card text-center">
            <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Phone</h3>
            <a href="tel:+8801650278889" className="text-primary hover:underline">
              +880 1650-278889
            </a>
          </div>
          <div className="card text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-muted-foreground">Daffodil Smart City, Ashulia, Dhaka-1216</p>
          </div>
        </div>

        <div className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {submitted && (
              <p className="text-center text-green-600 font-medium">
                Message sent successfully! We'll get back to you soon.
              </p>
            )}
            {error && (
              <p className="text-center text-red-600 font-medium">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
