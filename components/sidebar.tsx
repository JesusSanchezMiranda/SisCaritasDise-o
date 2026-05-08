"use client"

import { useState, useEffect } from "react"
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
  ChevronRight,
  Home,
  Menu,
  X,
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
  children: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: "usuarios",
    label: "Usuarios",
    icon: <Users size={20} />,
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
    id: "productos",
    label: "Productos",
    icon: <Package size={20} />,
    children: [
      { label: "Tratamientos", icon: <Pill size={18} />, href: "/productos/tratamientos" },
      { label: "Consultas", icon: <ClipboardList size={18} />, href: "/productos/consultas" },
      { label: "Terapias", icon: <Activity size={18} />, href: "/productos/terapias" },
      { label: "Medicamentos", icon: <PillBottle size={18} />, href: "/productos/medicamentos" },
      { label: "Kits Laboratorio", icon: <Boxes size={18} />, href: "/productos/kits-laboratorio" },
    ],
  },
  {
    id: "administracion",
    label: "Administración",
    icon: <Settings size={20} />,
    children: [
      { label: "Especialidades", icon: <Layers size={18} />, href: "/administracion/especialidades" },
      { label: "Tipo de Cliente", icon: <Tag size={18} />, href: "/administracion/tipo-cliente" },
      { label: "Precios de Terapias", icon: <DollarSign size={18} />, href: "/administracion/precios-terapias" },
      { label: "Precio de Consultas", icon: <DollarSign size={18} />, href: "/administracion/precio-consultas" },
      { label: "Pruebas Laboratorio", icon: <TestTube size={18} />, href: "/administracion/pruebas-laboratorio" },
      { label: "Kits Laboratorio", icon: <Boxes size={18} />, href: "/administracion/kits-laboratorio" },
      { label: "Precios de Productos", icon: <DollarSign size={18} />, href: "/administracion/precios-productos" },
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
  isCollapsed,
}: { 
  item: MenuItem
  isExpanded: boolean
  onToggle: () => void
  activeItem: string | null
  setActiveItem: (item: string | null) => void
  isCollapsed: boolean
}) {
  const [hoveredChild, setHoveredChild] = useState<string | null>(null)

  if (isCollapsed) {
    return (
      <div className="relative group">
        <button
          onClick={onToggle}
          className={`w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 ${
            isExpanded 
              ? "bg-primary text-white shadow-lg shadow-primary/30" 
              : "text-gray-600 hover:bg-primary/10 hover:text-primary"
          }`}
        >
          {item.icon}
        </button>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-2 top-0 z-50 hidden group-hover:block">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
            {item.label}
            <div className="absolute left-0 top-3 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
          isExpanded 
            ? "bg-primary text-white shadow-lg shadow-primary/20" 
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span className={`transition-transform duration-200 ${isExpanded ? "" : "group-hover:scale-110"}`}>
          {item.icon}
        </span>
        <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          isExpanded ? "bg-white/20" : "bg-gray-200 text-gray-600"
        }`}>
          {item.children.length}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-2 pl-4 space-y-1">
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
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                activeItem === child.label
                  ? "bg-primary/10 text-primary font-medium border-l-4 border-primary ml-0"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 ml-1"
              }`}
              style={{
                animationDelay: `${index * 30}ms`,
              }}
            >
              <span className={`transition-all duration-200 ${
                hoveredChild === child.label ? "scale-110 text-primary" : ""
              }`}>
                {child.icon}
              </span>
              <span className="flex-1">{child.label}</span>
              {child.badge && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                  {child.badge}
                </span>
              )}
              {child.isNew && (
                <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500 text-white">
                  <Sparkles size={10} />
                  NEW
                </span>
              )}
              {hoveredChild === child.label && activeItem !== child.label && (
                <ChevronRight size={14} className="text-primary" />
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
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notifications] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleSection = (id: string) => {
    setExpandedSection(prev => prev === id ? null : id)
  }

  return (
    <aside 
      className={`h-screen bg-white flex flex-col border-r border-gray-200 shadow-xl transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Header with Logo */}
      <div className={`p-4 border-b border-gray-100 ${isCollapsed ? "px-3" : ""}`}>
        <div className={`relative ${isCollapsed ? "flex justify-center" : ""}`}>
          {/* Logo Container */}
          <div className={`relative ${isCollapsed ? "" : "flex items-center gap-4"}`}>
            {/* Logo with red accent background */}
            <div className="relative">
              <div className={`relative bg-gradient-to-br from-primary/10 via-white to-primary/5 rounded-2xl p-2 border-2 border-primary/20 shadow-lg shadow-primary/10 ${
                isCollapsed ? "w-14 h-14" : "w-16 h-16"
              }`}>
                <Image
                  src="/logo-caritas.png"
                  alt="Cáritas Logo"
                  width={isCollapsed ? 48 : 56}
                  height={isCollapsed ? 48 : 56}
                  className="object-contain drop-shadow-md"
                />
              </div>
              {/* Online indicator */}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </span>
            </div>

            {/* Title and status */}
            {!isCollapsed && (
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Sis<span className="text-primary">Caritas</span>
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">Sistema de Gestión</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-medium text-emerald-600">En línea</span>
                </div>
              </div>
            )}
          </div>

          {/* Collapse button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`absolute top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gray-100 hover:bg-primary hover:text-white text-gray-600 transition-all duration-200 shadow-sm ${
              isCollapsed ? "-right-10" : "-right-2"
            }`}
          >
            {isCollapsed ? <Menu size={16} /> : <X size={16} />}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]">
              <Home size={16} />
              <span className="text-sm font-medium">Inicio</span>
            </button>
            <button className="relative p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
              <Bell size={18} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Time Display */}
      {!isCollapsed && (
        <div className="px-4 py-3">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {currentTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {currentTime.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-primary">Turno</p>
              <p className="text-sm font-bold text-gray-700">Mañana</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto ${isCollapsed ? "px-2 py-4" : "px-3 pb-4"}`}>
        {!isCollapsed && (
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
            Navegación
          </p>
        )}
        <div className={`space-y-1 ${isCollapsed ? "space-y-2" : ""}`}>
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

      {/* Stats Mini Card */}
      {!isCollapsed && (
        <div className="px-4 pb-3">
          <div className="p-4 bg-gradient-to-br from-primary/5 via-white to-primary/10 rounded-xl border border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-700">Hoy</span>
              <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">En vivo</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-xl font-bold text-primary">24</p>
                <p className="text-[10px] text-gray-500">Citas</p>
              </div>
              <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-xl font-bold text-emerald-600">18</p>
                <p className="text-[10px] text-gray-500">Atendidos</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className={`border-t border-gray-200 bg-gray-50 ${isCollapsed ? "p-2" : "p-4"}`}>
        <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : "p-3 bg-white rounded-xl shadow-sm border border-gray-100"}`}>
          {/* Avatar */}
          <div className="relative">
            <div className={`bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 ${
              isCollapsed ? "w-10 h-10" : "w-11 h-11"
            }`}>
              <span className="text-sm font-bold text-white">AD</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Administrador</p>
                <p className="text-xs text-gray-500 truncate">Super Admin</p>
              </div>
              <button className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-all">
                <LogOut size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
