"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  Users,
  FileText,
  Settings,
  ChevronDown,
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
  Bell,
  X,
  User,
  LogOut,
  Home,
  Calendar,
  HelpCircle,
  Mail,
  ChevronLeft,
  Menu,
} from "lucide-react"

interface SubMenuItem {
  label: string
  icon: React.ReactNode
  href: string
  badge?: string
}

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  children: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: "inicio",
    label: "INICIO",
    icon: <Home size={20} />,
    children: [
      { label: "Dashboard", icon: <Home size={18} />, href: "/dashboard" },
      { label: "Agenda", icon: <Calendar size={18} />, href: "/agenda" },
    ],
  },
  {
    id: "usuarios",
    label: "USUARIOS",
    icon: <Users size={20} />,
    children: [
      { label: "Proveedores", icon: <Truck size={18} />, href: "/usuarios/proveedores" },
      { label: "Pacientes", icon: <UserCheck size={18} />, href: "/usuarios/pacientes", badge: "128" },
      { label: "Médicos", icon: <Stethoscope size={18} />, href: "/usuarios/medicos" },
    ],
  },
  {
    id: "reportes",
    label: "REPORTES",
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
      { label: "Ranking", icon: <Trophy size={18} />, href: "/reportes/ranking" },
    ],
  },
  {
    id: "productos",
    label: "PRODUCTOS",
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
    label: "ADMINISTRACIÓN",
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

// Tooltip Component
function Tooltip({ children, text, show }: { children: React.ReactNode; text: string; show: boolean }) {
  if (!show) return <>{children}</>
  
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
        {text}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900" />
      </div>
    </div>
  )
}

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
  // In collapsed mode, show only the section icon
  if (isCollapsed) {
    return (
      <div className="mb-2 px-2">
        <Tooltip text={item.label} show={isCollapsed}>
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-primary transition-all duration-200"
          >
            {item.icon}
          </button>
        </Tooltip>
      </div>
    )
  }

  return (
    <div className="mb-2">
      {/* Section Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors group"
      >
        <span>{item.label}</span>
        {isExpanded ? (
          <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 transition-transform duration-300" />
        ) : (
          <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-transform duration-300" />
        )}
      </button>
      
      {/* Section Items */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-2">
          {item.children.map((child, index) => (
            <a
              key={index}
              href={child.href}
              onClick={(e) => {
                e.preventDefault()
                setActiveItem(child.label)
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                activeItem === child.label
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className={`transition-transform duration-200 group-hover:scale-110 ${
                activeItem === child.label ? "text-white" : "text-gray-400 group-hover:text-primary"
              }`}>
                {child.icon}
              </span>
              <span className="flex-1">{child.label}</span>
              {child.badge && (
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full transition-colors ${
                  activeItem === child.label 
                    ? "bg-white/20 text-white" 
                    : "bg-primary/10 text-primary"
                }`}>
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
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["inicio", "usuarios"])
  const [activeItem, setActiveItem] = useState<string | null>("Dashboard")
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id) 
        : [...prev, id]
    )
  }

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const notifications = [
    { id: 1, title: "Nueva cita programada", desc: "Dr. García - 14:00", time: "Hace 5 min", unread: true },
    { id: 2, title: "Paciente registrado", desc: "María López", time: "Hace 15 min", unread: true },
    { id: 3, title: "Reporte completado", desc: "Ventas mensual", time: "Hace 1 hora", unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <aside 
      className={`h-screen bg-white flex flex-col border-r border-gray-200 shadow-xl transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Header */}
      <div className={`p-4 border-b border-gray-100 ${isCollapsed ? "px-2" : ""}`}>
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          {/* Logo + Name */}
          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <div className={`rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/20 transition-all duration-300 ${
              isCollapsed ? "w-12 h-12" : "w-11 h-11"
            }`}>
              <Image
                src="/logo-caritas.png"
                alt="Cáritas Logo"
                width={isCollapsed ? 32 : 28}
                height={isCollapsed ? 32 : 28}
                className="object-contain"
              />
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in">
                <h2 className="text-sm font-bold text-gray-900">SisCaritas</h2>
                <p className="text-xs text-primary font-medium">Admin</p>
              </div>
            )}
          </div>

          {/* Action Buttons - Only show when expanded */}
          {!isCollapsed && (
            <div className="flex items-center gap-2 animate-fade-in">
              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => {
                    setShowNotifications(!showNotifications)
                    setShowProfileMenu(false)
                  }}
                  className="relative p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300 transition-all duration-200"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="font-semibold text-gray-900 text-sm">Notificaciones</h3>
                      <span className="text-xs text-primary font-medium">{unreadCount} nuevas</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                            notif.unread ? "bg-primary/5" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {notif.unread && (
                              <span className="w-2 h-2 mt-1.5 rounded-full bg-primary shrink-0" />
                            )}
                            <div className={notif.unread ? "" : "ml-5"}>
                              <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                              <p className="text-xs text-gray-500">{notif.desc}</p>
                              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                      <button className="w-full text-center text-sm text-primary font-medium hover:underline">
                        Ver todas las notificaciones
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Collapse Button */}
              <button 
                onClick={() => setIsCollapsed(true)}
                className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300 transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Expand Button - Only show when collapsed */}
        {isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(false)}
            className="w-full mt-3 p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 flex items-center justify-center"
          >
            <Menu size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        {menuItems.map((item) => (
          <MenuSection
            key={item.id}
            item={item}
            isExpanded={expandedSections.includes(item.id)}
            onToggle={() => toggleSection(item.id)}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* Profile Menu Dropdown */}
      {showProfileMenu && !isCollapsed && (
        <div className="absolute bottom-20 left-4 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in">
          {/* Menu Options */}
          <div className="py-1.5">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
              <User size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
              Mi perfil
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
              <Settings size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
              Configuración
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
              <Bell size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
              Notificaciones
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors group">
              <HelpCircle size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
              Ayuda
            </button>
            <div className="my-1.5 border-t border-gray-100" />
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-primary hover:bg-primary/5 transition-colors font-medium">
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* Footer - Profile Selector */}
      <div className="border-t border-gray-100" ref={profileRef}>
        {isCollapsed ? (
          <Tooltip text="Administrador" show={true}>
            <button 
              onClick={() => {
                setShowProfileMenu(!showProfileMenu)
                setShowNotifications(false)
                setIsCollapsed(false)
              }}
              className="w-full flex items-center justify-center p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <User size={20} className="text-primary" />
              </div>
            </button>
          </Tooltip>
        ) : (
          <button 
            onClick={() => {
              setShowProfileMenu(!showProfileMenu)
              setShowNotifications(false)
            }}
            className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:shadow-md transition-shadow">
              <User size={20} className="text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-gray-900">Administrador</p>
              <p className="text-xs text-gray-500">admin@caritas.org</p>
            </div>
            <ChevronDown 
              size={18} 
              className={`text-gray-400 transition-transform duration-200 ${showProfileMenu ? "rotate-180" : ""}`} 
            />
          </button>
        )}
      </div>
    </aside>
  )
}
