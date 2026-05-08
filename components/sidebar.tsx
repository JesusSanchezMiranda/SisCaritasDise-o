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
  Search,
  LogOut,
  Bell,
  MoreHorizontal,
} from "lucide-react"

interface SubMenuItem {
  label: string
  icon: React.ReactNode
  href: string
  badge?: string
}

interface MenuItem {
  label: string
  icon: React.ReactNode
  children: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  {
    label: "USUARIOS",
    icon: <Users size={18} />,
    children: [
      { label: "Proveedores", icon: <Truck size={16} />, href: "/usuarios/proveedores" },
      { label: "Pacientes", icon: <UserCheck size={16} />, href: "/usuarios/pacientes", badge: "128" },
      { label: "Médicos", icon: <Stethoscope size={16} />, href: "/usuarios/medicos" },
    ],
  },
  {
    label: "REPORTES",
    icon: <FileText size={18} />,
    children: [
      { label: "Ventas Médicas", icon: <ShoppingCart size={16} />, href: "/reportes/ventas-medicas" },
      { label: "Compras Médicas", icon: <ShoppingBag size={16} />, href: "/reportes/compras-medicas" },
      { label: "Laboratorio", icon: <FlaskConical size={16} />, href: "/reportes/laboratorio" },
      { label: "Productos", icon: <Package size={16} />, href: "/reportes/productos" },
      { label: "Tratamientos", icon: <Pill size={16} />, href: "/reportes/tratamientos" },
      { label: "Consultas", icon: <ClipboardList size={16} />, href: "/reportes/consultas" },
      { label: "Terapias", icon: <Activity size={16} />, href: "/reportes/terapias" },
      { label: "Pacientes", icon: <Heart size={16} />, href: "/reportes/pacientes" },
      { label: "Ranking", icon: <Trophy size={16} />, href: "/reportes/ranking" },
    ],
  },
  {
    label: "ADMINISTRACIÓN",
    icon: <Settings size={18} />,
    children: [
      { label: "Especialidades", icon: <Layers size={16} />, href: "/administracion/especialidades" },
      { label: "Tipo de Cliente", icon: <Tag size={16} />, href: "/administracion/tipo-cliente" },
      { label: "Precios de Terapias", icon: <DollarSign size={16} />, href: "/administracion/precios-terapias" },
      { label: "Precio de Consultas", icon: <DollarSign size={16} />, href: "/administracion/precio-consultas" },
      { label: "Tratamientos", icon: <Pill size={16} />, href: "/administracion/tratamientos" },
      { label: "Pruebas Laboratorio", icon: <TestTube size={16} />, href: "/administracion/pruebas-laboratorio" },
      { label: "Kits Laboratorio", icon: <Boxes size={16} />, href: "/administracion/kits-laboratorio" },
      { label: "Medicamentos", icon: <PillBottle size={16} />, href: "/administracion/medicamentos" },
      { label: "Productos", icon: <Package size={16} />, href: "/administracion/productos" },
      { label: "Compras", icon: <ShoppingCart size={16} />, href: "/administracion/compras" },
    ],
  },
]

function MenuSection({ item, defaultOpen = false }: { item: MenuItem; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <span className="opacity-70">{item.icon}</span>
          <span>{item.label}</span>
        </div>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ease-out ${isOpen ? "rotate-0" : "-rotate-90"}`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-1 space-y-0.5">
          {item.children.map((child, index) => (
            <a
              key={index}
              href={child.href}
              onClick={() => setActiveItem(child.label)}
              className={`group flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-sm transition-all duration-200 ${
                activeItem === child.label
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <span className={`transition-colors duration-200 ${
                activeItem === child.label ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              }`}>
                {child.icon}
              </span>
              <span className="flex-1">{child.label}</span>
              {child.badge && (
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/20 text-primary">
                  {child.badge}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-card flex flex-col border-r border-border">
      {/* Logo Section */}
      <div className="p-5 flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-background flex items-center justify-center p-1">
          <Image
            src="/logo-caritas.png"
            alt="Cáritas Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-base font-bold text-foreground tracking-tight">Sis Caritas</h1>
          <p className="text-[11px] text-muted-foreground">Sistema de Gestión</p>
        </div>
        <button className="p-2 rounded-lg hover:bg-accent transition-colors">
          <MoreHorizontal size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-muted rounded border border-border">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {menuItems.map((item, index) => (
          <MenuSection key={index} item={item} defaultOpen={index === 0} />
        ))}
      </nav>

      {/* Notifications Banner */}
      <div className="mx-4 mb-4 p-3 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Bell size={16} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground">3 notificaciones nuevas</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Revisar citas pendientes</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-sm font-semibold text-white">AD</span>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-card rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Administrador</p>
            <p className="text-[11px] text-muted-foreground truncate">admin@caritas.org</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-accent transition-colors group">
            <LogOut size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </aside>
  )
}
