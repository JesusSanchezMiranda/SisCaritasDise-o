"use client"

import { ReactNode } from "react"
import { Sidebar } from "@/components/sidebar"
import { Search, Bell, Calendar, ChevronRight } from "lucide-react"

interface PageLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  breadcrumbs?: { label: string; href?: string }[]
}

export function PageLayout({ children, title, subtitle, breadcrumbs = [] }: PageLayoutProps) {
  const defaultBreadcrumbs = [{ label: "Inicio", href: "/" }, ...breadcrumbs]
  
  return (
    <div className="flex w-full h-screen bg-[#F9FAFB] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
              {defaultBreadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-2">
                  {index > 0 && <ChevronRight size={14} className="text-gray-400" />}
                  {crumb.href ? (
                    <a href={crumb.href} className="text-gray-400 hover:text-gray-600 transition-colors">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className={index === defaultBreadcrumbs.length - 1 ? "text-gray-900 font-medium" : "text-gray-400"}>
                      {crumb.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Buscar..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] transition-all"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full"></span>
            </button>
            
            {/* Date */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-600">
              <Calendar size={16} className="text-[#DC2626]" />
              <span className="capitalize">{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Title */}
            {(title || subtitle) && (
              <div className="mb-6">
                {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
                {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
              </div>
            )}
            
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
