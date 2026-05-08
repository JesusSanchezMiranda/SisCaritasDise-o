"use client"

import { Sidebar } from "@/components/sidebar"
import { ReactNode } from "react"

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar - Fixed, Static */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}
