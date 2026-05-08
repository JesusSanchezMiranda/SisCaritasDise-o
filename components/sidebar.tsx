"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
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
  HelpCircle,
  Mail,
  ChevronLeft,
  Menu,
  Flag,
  Gift,
  CreditCard,
  Warehouse,
  TrendingUp,
  Briefcase,
  FolderOpen,
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

// Direct menu item for Dashboard (no section header needed)
interface DirectMenuItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  isDirect: true
}

const directItems: DirectMenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <Home size={18} />, href: "/dashboard", isDirect: true },
]

const menuItems: MenuItem[] = [
  {
    id: "gestion",
    label: "GESTIÓN",
    icon: <Users size={18} />,
    children: [
      { label: "Usuarios", icon: <Users size={18} />, href: "/usuarios" },
      { label: "Beneficiarios", icon: <Heart size={18} />, href: "/beneficiarios" },
      { label: "Voluntarios", icon: <UserCheck size={18} />, href: "/voluntarios" },
      { label: "Especialidades", icon: <Briefcase size={18} />, href: "/especialidades" },
      { label: "Proyectos", icon: <FolderOpen size={18} />, href: "/proyectos" },
    ],
  },
  {
    id: "campanas",
    label: "CAMPAÑAS",
    icon: <Flag size={18} />,
    children: [
      { label: "Campañas", icon: <Flag size={18} />, href: "/campanas" },
      { label: "Donantes", icon: <Gift size={18} />, href: "/donantes" },
      { label: "Donaciones", icon: <CreditCard size={18} />, href: "/donaciones" },
    ],
  },
  {
    id: "inventario",
    label: "INVENTARIO",
    icon: <Warehouse size={18} />,
    children: [
      { label: "Productos", icon: <Package size={18} />, href: "/productos" },
      { label: "Inventario", icon: <Warehouse size={18} />, href: "/inventario" },
      { label: "Movimientos", icon: <TrendingUp size={18} />, href: "/movimientos" },
      { label: "Distribuciones", icon: <Truck size={18} />, href: "/distribuciones" },
    ],
  },
  {
    id: "salud",
    label: "SALUD",
    icon: <Stethoscope size={18} />,
    children: [
      { label: "Personal Médico", icon: <Stethoscope size={18} />, href: "/personal-medico" },
      { label: "Atención Médica", icon: <Activity size={18} />, href: "/atencion-salud" },
      { label: "Ventas", icon: <ShoppingCart size={18} />, href: "/ventas" },
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

function DirectMenuItemComponent({ 
  item, 
  isActive,
  isCollapsed,
}: { 
  item: DirectMenuItem
  isActive: boolean
  isCollapsed: boolean
}) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push(item.href)
  }

  if (isCollapsed) {
    return (
      <div className="mb-2 px-2">
        <Tooltip text={item.label} show={isCollapsed}>
          <a
            href={item.href}
            onClick={handleClick}
            className={`w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "text-gray-500 hover:bg-gray-100 hover:text-primary"
            }`}
          >
            {item.icon}
          </a>
        </Tooltip>
      </div>
    )
  }

  return (
    <div className="mb-2 px-2">
      <a
        href={item.href}
        onClick={handleClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
          isActive
            ? "bg-primary text-white shadow-lg shadow-primary/25"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        <span className={`transition-transform duration-200 group-hover:scale-110 ${
          isActive ? "text-white" : "text-gray-400 group-hover:text-primary"
        }`}>
          {item.icon}
        </span>
        <span className="flex-1">{item.label}</span>
      </a>
    </div>
  )
}

function MenuSection({ 
  item, 
  isExpanded, 
  onToggle, 
  activeChild,
  isCollapsed,
}: { 
  item: MenuItem
  isExpanded: boolean
  onToggle: () => void
  activeChild: string | null
  isCollapsed: boolean
}) {
  const router = useRouter()

  const handleChildClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    router.push(href)
  }

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
    <div className="mb-1">
      {/* Section Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 hover:bg-gray-50/50 rounded-lg mx-2 transition-all duration-200 group"
        style={{ width: 'calc(100% - 16px)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-400 group-hover:text-primary transition-colors">{item.icon}</span>
          <span>{item.label}</span>
        </div>
        {isExpanded ? (
          <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-transform duration-300" />
        ) : (
          <ChevronRight size={14} className="text-gray-400 group-hover:text-gray-600 transition-transform duration-300" />
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
              onClick={(e) => handleChildClick(e, child.href)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                activeChild === child.href
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className={`transition-transform duration-200 group-hover:scale-110 ${
                activeChild === child.href ? "text-white" : "text-gray-400 group-hover:text-primary"
              }`}>
                {child.icon}
              </span>
              <span className="flex-1">{child.label}</span>
              {child.badge && (
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full transition-colors ${
                  activeChild === child.href 
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
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

  // Auto-expand sidebar y sección cuando se navega
  useEffect(() => {
    const currentPath = pathname.split('/')[1]
    
    // Encontrar qué sección contiene este path
    menuItems.forEach(section => {
      const hasChild = section.children.some(child => child.href.includes(currentPath))
      if (hasChild) {
        // Expandir el sidebar
        if (isCollapsed) setIsCollapsed(false)
        // Expandir la sección
        if (!expandedSections.includes(section.id)) {
          setExpandedSections(prev => [...prev, section.id])
        }
      }
    })
  }, [pathname])

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id) 
        : [...prev, id]
    )
  }

  // Determinar si el dashboard está activo
  const isDashboardActive = pathname === "/" || pathname === "/dashboard"

  // Determinar qué item está activo en las secciones
  const getActiveChild = () => {
    for (const section of menuItems) {
      const child = section.children.find(c => pathname.startsWith(c.href) && c.href !== "/")
      if (child) return child.href
    }
    return null
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
            <Image
              src="/logo-caritas.png"
              alt="Cáritas Logo"
              width={isCollapsed ? 40 : 36}
              height={isCollapsed ? 40 : 36}
              className="object-contain"
            />
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
        {/* Direct Items (Dashboard) */}
        {directItems.map((item) => (
          <DirectMenuItemComponent
            key={item.id}
            item={item}
            isActive={isDashboardActive}
            isCollapsed={isCollapsed}
          />
        ))}
        
        {/* Section Items */}
        {menuItems.map((item) => (
          <MenuSection
            key={item.id}
            item={item}
            isExpanded={expandedSections.includes(item.id)}
            onToggle={() => toggleSection(item.id)}
            activeChild={getActiveChild()}
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
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20 ring-2 ring-primary/10">
                <User size={18} className="text-white" />
              </div>
            </button>
          </Tooltip>
        ) : (
          <button 
            onClick={() => {
              setShowProfileMenu(!showProfileMenu)
              setShowNotifications(false)
            }}
            className="w-full flex items-center gap-3 p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-300 group"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-300 ring-2 ring-primary/10">
                <User size={20} className="text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">Administrador</p>
              <div className="flex items-center gap-1.5">
                <Mail size={11} className="text-gray-400 shrink-0" />
                <p className="text-xs text-gray-500 truncate">admin@caritas.org</p>
              </div>
            </div>
            <div className={`p-1.5 rounded-lg bg-gray-100 group-hover:bg-primary/10 transition-all duration-200 ${showProfileMenu ? "bg-primary/10" : ""}`}>
              <ChevronDown 
                size={16} 
                className={`text-gray-400 group-hover:text-primary transition-all duration-300 ${showProfileMenu ? "rotate-180 text-primary" : ""}`} 
              />
            </div>
          </button>
        )}
      </div>
    </aside>
  )
}
