"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

interface SearchInputProps {
  initialQuery?: string
  onClose?: () => void
  autoFocus?: boolean
  variant?: "header" | "page"
}

export default function SearchInput({
  initialQuery = "",
  onClose,
  autoFocus = false,
  variant = "header",
}: SearchInputProps) {
  const [query, setQuery] = useState(initialQuery)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (autoFocus && inputRef.current) {      
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [autoFocus])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      if (onClose) onClose()
    }
  }

  const clearSearch = () => {
    setQuery("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <Search
          className={`absolute ${variant === "header" ? "left-3 top-2.5" : "left-4 top-3.5"} h-4 w-4 text-neutral-500`}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className={`w-full ${
            variant === "header" ? "h-9 pl-9 pr-9 text-sm" : "h-12 pl-11 pr-11 text-base"
          } rounded-md border border-neutral-300 bg-white focus:border-neutral-500 focus:outline-none`}
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className={`absolute ${variant === "header" ? "right-3 top-2.5" : "right-4 top-3.5"} h-4 w-4 text-neutral-500 hover:text-neutral-800`}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  )
}
