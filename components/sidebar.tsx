"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Users,
  FileText,
  Settings,
  ChevronDown,
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
  Sparkles,
  Circle,
  ChevronRight,
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
  bgColor: string
  children: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: "usuarios",
    label: "Usuarios",
    icon: <Users size={22} />,
    color: "#b91c1c",
    bgColor: "#fef2f2",
    children: [
      { label: "Proveedores", icon: <Truck size={18} />, href: "/usuarios/proveedores" },
      { label: "Pacientes", icon: <UserCheck size={18} />, href: "/usuarios/pacientes", badge: "128" },
      { label: "Médicos", icon: <Stethoscope size={18} />, href: "/usuarios/medicos", isNew: true },
    ],
  },
  {
    id: "reportes",
    label: "Reportes",
    icon: <FileText size={22} />,
    color: "#1e3a5f",
    bgColor: "#eff6ff",
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
    icon: <Settings size={22} />,
    color: "#475569",
    bgColor: "#f8fafc",
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
}: { 
  item: MenuItem
  isExpanded: boolean
  onToggle: () => void
  activeItem: string | null
  setActiveItem: (item: string | null) => void
}) {
  const [hoveredChild, setHoveredChild] = useState<string | null>(null)

  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden hover-lift ${
          isExpanded 
            ? "bg-white shadow-lg shadow-black/5" 
            : "hover:bg-white/80"
        }`}
      >
        {/* Icon Container */}
        <div 
          className={`relative p-3 rounded-xl transition-all duration-300 ${
            isExpanded ? "scale-110" : "group-hover:scale-105"
          }`}
          style={{ 
            backgroundColor: item.bgColor,
            color: item.color
          }}
        >
          {item.icon}
          {isExpanded && (
            <span 
              className="absolute inset-0 rounded-xl opacity-30"
              style={{ 
                background: `radial-gradient(circle at center, ${item.color}40 0%, transparent 70%)`
              }}
            />
          )}
        </div>

        {/* Label */}
        <span className={`flex-1 text-left font-semibold text-[15px] transition-colors duration-200 ${
          isExpanded ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
        }`}>
          {item.label}
        </span>

        {/* Items count */}
        <span className={`text-xs font-medium px-2 py-1 rounded-lg transition-all ${
          isExpanded 
            ? "bg-muted text-muted-foreground" 
            : "bg-transparent text-muted-foreground/60"
        }`}>
          {item.children.length}
        </span>

        {/* Chevron */}
        <ChevronDown
          size={18}
          className={`text-muted-foreground transition-all duration-300 ${
            isExpanded ? "rotate-180 text-foreground" : "group-hover:text-foreground"
          }`}
        />

        {/* Active indicator line */}
        {isExpanded && (
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-r-full transition-all"
            style={{ backgroundColor: item.color }}
          />
        )}
      </button>
      
      {/* Submenu */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-out ${
          isExpanded ? "max-h-[800px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-6 pl-4 border-l-2 border-border space-y-1">
          {item.children.map((child, index) => (
            <a
              key={index}
              href={child.href}
              onClick={(e) => {
                e.preventDefault()
                setActiveItem(child.label)
              }}
              onMouseEnter={() => setHoveredChild(child.label)}
              onMouseLeave={() => setHoveredChild(null)}
              className={`group/item flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 relative animate-fade-in ${
                activeItem === child.label
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-sm"
              }`}
              style={{
                animationDelay: `${index * 40}ms`,
              }}
            >
              {/* Icon with animation */}
              <span className={`transition-all duration-300 ${
                activeItem === child.label 
                  ? "text-primary-foreground" 
                  : hoveredChild === child.label 
                    ? "scale-110 text-primary" 
                    : ""
              }`}>
                {child.icon}
              </span>

              {/* Label */}
              <span className="flex-1 font-medium">{child.label}</span>

              {/* Badge */}
              {child.badge && (
                <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all ${
                  activeItem === child.label 
                    ? "bg-white/20 text-white" 
                    : "bg-primary/10 text-primary"
                }`}>
                  {child.badge}
                </span>
              )}

              {/* New badge */}
              {child.isNew && (
                <span className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-full bg-emerald-500 text-white shadow-sm">
                  <Sparkles size={10} />
                  NUEVO
                </span>
              )}

              {/* Hover arrow */}
              {hoveredChild === child.label && activeItem !== child.label && (
                <ChevronRight size={14} className="text-primary animate-slide-in" />
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
  const [isHoveringProfile, setIsHoveringProfile] = useState(false)

  const toggleSection = (id: string) => {
    setExpandedSection(prev => prev === id ? null : id)
  }

  return (
    <aside className="w-80 h-screen bg-gradient-to-b from-white to-slate-50/50 flex flex-col border-r border-border relative">
      
      {/* Logo Section - PROMINENTE */}
      <div className="p-6">
        <div className="relative p-6 rounded-3xl bg-gradient-to-br from-primary/5 via-white to-secondary/5 border border-primary/10 shadow-xl shadow-primary/5 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl" />
          
          {/* Logo Container */}
          <div className="relative flex flex-col items-center">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />
              
              {/* Logo wrapper */}
              <div className="relative w-28 h-28 rounded-3xl overflow-hidden bg-white flex items-center justify-center p-3 animate-float border-2 border-primary/20 shadow-2xl shadow-primary/10 group-hover:shadow-primary/30 transition-all duration-500 group-hover:scale-105">
                <Image
                  src="/logo-caritas.png"
                  alt="Cáritas Logo"
                  width={96}
                  height={96}
                  className="object-contain drop-shadow-lg"
                />
              </div>

              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            {/* Title */}
            <h1 className="mt-5 text-2xl font-bold text-foreground tracking-tight">
              Sis <span className="text-primary">Caritas</span>
            </h1>
            
            {/* Status */}
            <div className="flex items-center gap-2 mt-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <Circle size={8} className="fill-emerald-500 text-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-emerald-700">Sistema en línea</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Banner */}
      <div className="mx-6 mb-4 p-3 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 flex items-center gap-3 cursor-pointer hover:bg-primary/15 transition-all group">
        <div className="relative">
          <Bell size={20} className="text-primary" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-bounce-soft" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">3 notificaciones nuevas</p>
          <p className="text-xs text-muted-foreground">Pendientes por revisar</p>
        </div>
        <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 pb-4">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-3">
          Menú Principal
        </p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <MenuSection
              key={item.id}
              item={item}
              isExpanded={expandedSection === item.id}
              onToggle={() => toggleSection(item.id)}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          ))}
        </div>
      </nav>

      {/* Stats Card */}
      <div className="mx-4 mb-4 p-5 rounded-2xl bg-white border border-border shadow-lg shadow-black/5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-foreground">Resumen del día</p>
          <span className="text-xs text-muted-foreground">Hoy</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors cursor-pointer group">
            <p className="text-2xl font-bold text-primary group-hover:scale-105 transition-transform">156</p>
            <p className="text-[11px] text-muted-foreground font-medium">Citas programadas</p>
          </div>
          <div className="p-3 rounded-xl bg-secondary/5 border border-secondary/10 hover:bg-secondary/10 transition-colors cursor-pointer group">
            <p className="text-2xl font-bold text-secondary group-hover:scale-105 transition-transform">23</p>
            <p className="text-[11px] text-muted-foreground font-medium">En espera</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border bg-white">
        <div 
          className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 cursor-pointer ${
            isHoveringProfile ? "bg-muted shadow-md" : "hover:bg-muted/50"
          }`}
          onMouseEnter={() => setIsHoveringProfile(true)}
          onMouseLeave={() => setIsHoveringProfile(false)}
        >
          {/* Avatar */}
          <div className="relative">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg transition-all duration-300 ${
              isHoveringProfile ? "shadow-primary/30 scale-105" : "shadow-primary/10"
            }`}>
              <span className="text-base font-bold text-white">AD</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">Administrador</p>
            <p className="text-xs text-muted-foreground truncate">Super Admin</p>
          </div>

          {/* Logout */}
          <button className={`p-2.5 rounded-xl transition-all duration-300 ${
            isHoveringProfile ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
          }`}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  )
}
