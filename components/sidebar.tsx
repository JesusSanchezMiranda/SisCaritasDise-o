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
  return (
    <div className="mb-2">
      {/* Section Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
      >
        <span>{item.label}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
        />
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeItem === child.label
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className={activeItem === child.label ? "text-white" : "text-gray-500"}>
                {child.icon}
              </span>
              <span className="flex-1">{child.label}</span>
              {child.badge && (
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                  activeItem === child.label 
                    ? "bg-white/20 text-white" 
                    : "bg-gray-200 text-gray-600"
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
    <aside className="w-72 h-screen bg-white flex flex-col border-r border-gray-200 shadow-lg">
      {/* Header - User Info + Actions */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {/* User Avatar + Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <Image
                src="/logo-caritas.png"
                alt="Cáritas Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">SisCaritas</h2>
              <p className="text-xs text-primary font-medium">Admin</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setShowProfileMenu(false)
                }}
                className="relative p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
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
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-sm">Notificaciones</h3>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                          notif.unread ? "bg-primary/5" : ""
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {notif.unread && (
                            <span className="w-2 h-2 mt-1.5 rounded-full bg-primary shrink-0" />
                          )}
                          <div className={notif.unread ? "" : "ml-4"}>
                            <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                            <p className="text-xs text-gray-500">{notif.desc}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all">
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <MenuSection
            key={item.id}
            item={item}
            isExpanded={expandedSections.includes(item.id)}
            onToggle={() => toggleSection(item.id)}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        ))}
      </nav>

      {/* Profile Menu Dropdown */}
      {showProfileMenu && (
        <div className="absolute bottom-20 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in">
          <div className="py-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <User size={18} className="text-gray-400" />
              Ver Perfil
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Settings size={18} className="text-gray-400" />
              Configuración
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-primary hover:bg-primary/5 transition-colors">
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}

      {/* Footer - Family/User Selector */}
      <div className="border-t border-gray-100" ref={profileRef}>
        <button 
          onClick={() => {
            setShowProfileMenu(!showProfileMenu)
            setShowNotifications(false)
          }}
          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-bold text-blue-600">FG</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-gray-900">Familia García</p>
            <p className="text-xs text-gray-500">Padre</p>
          </div>
          <ChevronDown 
            size={18} 
            className={`text-gray-400 transition-transform duration-200 ${showProfileMenu ? "rotate-180" : ""}`} 
          />
        </button>
      </div>
    </aside>
  )
}
