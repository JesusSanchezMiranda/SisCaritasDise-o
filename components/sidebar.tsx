"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Users,
  FileText,
  Settings,
  ChevronRight,
  Truck,
  Stethoscope,
  UserCheck,
  ShoppingCart,
  FlaskConical,
  Package,
  Pill,
  ClipboardList,
  Activity,
  Heart,
  Trophy,
  Layers,
  Tag,
  DollarSign,
  TestTube,
  Boxes,
  PillBottle,
  ShoppingBag,
  LogOut,
  Bell,
  ChevronLeft,
  Home,
  Sparkles,
} from "lucide-react"

interface SubMenuItem {
  label: string
  icon: React.ReactNode
  href: string
  badge?: string
  isNew?: boolean
}

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  children: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: "usuarios",
    label: "Usuarios",
    icon: <Users size={20} />,
    color: "#9f1239",
    children: [
      { label: "Proveedores", icon: <Truck size={18} />, href: "/usuarios/proveedores" },
      { label: "Pacientes", icon: <UserCheck size={18} />, href: "/usuarios/pacientes", badge: "128" },
      { label: "Médicos", icon: <Stethoscope size={18} />, href: "/usuarios/medicos", isNew: true },
    ],
  },
  {
    id: "reportes",
    label: "Reportes",
    icon: <FileText size={20} />,
    color: "#1e3a5f",
    children: [
      { label: "Ventas Médicas", icon: <ShoppingCart size={18} />, href: "/reportes/ventas-medicas" },
      { label: "Compras Médicas", icon: <ShoppingBag size={18} />, href: "/reportes/compras-medicas" },
      { label: "Laboratorio", icon: <FlaskConical size={18} />, href: "/reportes/laboratorio" },
      { label: "Productos", icon: <Package size={18} />, href: "/reportes/productos" },
      { label: "Tratamientos", icon: <Pill size={18} />, href: "/reportes/tratamientos" },
      { label: "Consultas", icon: <ClipboardList size={18} />, href: "/reportes/consultas" },
      { label: "Terapias", icon: <Activity size={18} />, href: "/reportes/terapias" },
      { label: "Pacientes", icon: <Heart size={18} />, href: "/reportes/pacientes" },
      { label: "Ranking", icon: <Trophy size={18} />, href: "/reportes/ranking", isNew: true },
    ],
  },
  {
    id: "administracion",
    label: "Administración",
    icon: <Settings size={20} />,
    color: "#4a5568",
    children: [
      { label: "Especialidades", icon: <Layers size={18} />, href: "/administracion/especialidades" },
      { label: "Tipo de Cliente", icon: <Tag size={18} />, href: "/administracion/tipo-cliente" },
      { label: "Precios de Terapias", icon: <DollarSign size={18} />, href: "/administracion/precios-terapias" },
      { label: "Precio de Consultas", icon: <DollarSign size={18} />, href: "/administracion/precio-consultas" },
      { label: "Tratamientos", icon: <Pill size={18} />, href: "/administracion/tratamientos" },
      { label: "Pruebas Laboratorio", icon: <TestTube size={18} />, href: "/administracion/pruebas-laboratorio" },
      { label: "Kits Laboratorio", icon: <Boxes size={18} />, href: "/administracion/kits-laboratorio" },
      { label: "Medicamentos", icon: <PillBottle size={18} />, href: "/administracion/medicamentos" },
      { label: "Productos", icon: <Package size={18} />, href: "/administracion/productos" },
      { label: "Compras", icon: <ShoppingCart size={18} />, href: "/administracion/compras" },
    ],
  },
]

function MenuSection({ 
  item, 
  isExpanded, 
  onToggle, 
  activeItem, 
  setActiveItem,
  isCollapsed 
}: { 
  item: MenuItem
  isExpanded: boolean
  onToggle: () => void
  activeItem: string | null
  setActiveItem: (item: string | null) => void
  isCollapsed: boolean
}) {
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
          isExpanded 
            ? "bg-accent/80" 
            : "hover:bg-accent/50"
        }`}
        style={{
          borderLeft: isExpanded ? `3px solid ${item.color}` : "3px solid transparent"
        }}
      >
        <div 
          className={`p-2 rounded-lg transition-all duration-300 ${
            isExpanded ? "scale-110" : "group-hover:scale-105"
          }`}
          style={{ 
            backgroundColor: `${item.color}20`,
            color: item.color
          }}
        >
          {item.icon}
        </div>
        {!isCollapsed && (
          <>
            <span className={`flex-1 text-left font-medium transition-colors duration-200 ${
              isExpanded ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
            }`}>
              {item.label}
            </span>
            <ChevronRight
              size={16}
              className={`text-muted-foreground transition-all duration-300 ${
                isExpanded ? "rotate-90 text-foreground" : "group-hover:translate-x-0.5"
              }`}
            />
          </>
        )}
        {isExpanded && (
          <div 
            className="absolute inset-0 opacity-10 animate-shimmer"
            style={{ backgroundColor: item.color }}
          />
        )}
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-400 ease-out ${
          isExpanded && !isCollapsed ? "max-h-[600px] opacity-100 mt-1" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-4 space-y-0.5">
          {item.children.map((child, index) => (
            <a
              key={index}
              href={child.href}
              onClick={(e) => {
                e.preventDefault()
                setActiveItem(child.label)
              }}
              className={`group/item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 relative ${
                activeItem === child.label
                  ? "bg-primary/15 text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <span className={`transition-all duration-200 ${
                activeItem === child.label 
                  ? "text-primary scale-110" 
                  : "group-hover/item:scale-110 group-hover/item:text-foreground"
              }`}>
                {child.icon}
              </span>
              <span className="flex-1">{child.label}</span>
              {child.badge && (
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary/25 text-primary-foreground border border-primary/30">
                  {child.badge}
                </span>
              )}
              {child.isNew && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Sparkles size={10} />
                  NEW
                </span>
              )}
              {activeItem === child.label && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-full" />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const [expandedSection, setExpandedSection] = useState<string | null>("usuarios")
  const [activeItem, setActiveItem] = useState<string | null>("Pacientes")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const toggleSection = (id: string) => {
    setExpandedSection(prev => prev === id ? null : id)
  }

  return (
    <aside 
      className={`h-screen bg-card flex flex-col border-r border-border relative transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-3 top-20 z-10 p-1.5 rounded-full bg-accent border border-border shadow-lg transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChevronLeft size={14} className={`text-muted-foreground transition-transform duration-300 ${
          isCollapsed ? "rotate-180" : ""
        }`} />
      </button>

      {/* Logo Section - Prominente */}
      <div className={`p-4 ${isCollapsed ? "px-2" : ""}`}>
        <div className={`flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-accent/80 to-muted/50 border border-border/50 transition-all duration-300 ${
          isCollapsed ? "justify-center" : ""
        }`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-1.5 animate-float border border-primary/20">
              <Image
                src="/logo-caritas.png"
                alt="Cáritas Logo"
                width={48}
                height={48}
                className="object-contain drop-shadow-lg"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-card flex items-center justify-center">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <h1 className="text-lg font-bold text-foreground tracking-tight">Sis Caritas</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <p className="text-[11px] text-muted-foreground">Sistema Activo</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Nav */}
      {!isCollapsed && (
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-accent/50 border border-border/50">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary/15 text-primary-foreground text-sm font-medium transition-all hover:bg-primary/25">
              <Home size={16} />
              Inicio
            </button>
            <button className="relative p-2 rounded-lg hover:bg-accent transition-all group">
              <Bell size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto px-3 pb-4 ${isCollapsed ? "px-2" : ""}`}>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <MenuSection
              key={item.id}
              item={item}
              isExpanded={expandedSection === item.id}
              onToggle={() => toggleSection(item.id)}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </nav>

      {/* Stats Mini */}
      {!isCollapsed && (
        <div className="mx-4 mb-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 via-accent/50 to-secondary/10 border border-primary/10">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 rounded-lg bg-background/50">
              <p className="text-xl font-bold text-foreground">156</p>
              <p className="text-[10px] text-muted-foreground">Citas Hoy</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-background/50">
              <p className="text-xl font-bold text-primary-foreground">23</p>
              <p className="text-[10px] text-muted-foreground">Pendientes</p>
            </div>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className={`p-4 border-t border-border ${isCollapsed ? "px-2" : ""}`}>
        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-accent/50 transition-all duration-300 cursor-pointer group ${
          isCollapsed ? "justify-center" : ""
        }`}>
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
              <span className="text-sm font-bold text-primary-foreground">AD</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-card rounded-full" />
          </div>
          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Admin</p>
                <p className="text-[11px] text-muted-foreground truncate">Super Admin</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-primary/15 transition-all group/logout">
                <LogOut size={18} className="text-muted-foreground group-hover/logout:text-primary transition-colors" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
