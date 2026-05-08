"use client"

import { useState, useRef, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { 
  Users, 
  FileText, 
  Settings, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  Activity, 
  UserCheck, 
  Heart, 
  Stethoscope, 
  Package,
  Bell,
  User,
  LogOut,
  ChevronDown,
  X
} from "lucide-react"

export default function Home() {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

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
    <div className="flex w-full h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Panel de control del sistema Cáritas</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Date Badge */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600">
              <Calendar size={16} className="text-primary" />
              <span className="capitalize">{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setShowProfileMenu(false)
                }}
                className="relative p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                          notif.unread ? "bg-primary/5" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notif.unread && (
                            <span className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
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
                  <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                    <button className="w-full text-center text-sm text-primary font-medium hover:underline">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu)
                  setShowNotifications(false)
                }}
                className="flex items-center gap-3 p-2 pr-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-white">AD</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">Administrador</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showProfileMenu ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info */}
                  <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="text-lg font-bold text-white">AD</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Administrador</p>
                        <p className="text-sm text-gray-500">Super Admin</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Menu Options */}
                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <User size={18} className="text-gray-400" />
                      Ver Perfil
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings size={18} className="text-gray-400" />
                      Configuración
                    </button>
                  </div>
                  
                  {/* Logout */}
                  <div className="border-t border-gray-100 py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-primary hover:bg-primary/5 transition-colors">
                      <LogOut size={18} />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-red-50 group-hover:bg-red-100 transition-colors">
                    <Users size={24} className="text-primary" />
                  </div>
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-xs font-semibold text-emerald-600">
                    <TrendingUp size={12} />
                    +12%
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">1,284</p>
                <p className="text-sm text-gray-500">Pacientes activos</p>
              </div>

              <div className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-400/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <Calendar size={24} className="text-blue-600" />
                  </div>
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-xs font-semibold text-emerald-600">
                    <TrendingUp size={12} />
                    +8%
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">156</p>
                <p className="text-sm text-gray-500">Citas esta semana</p>
              </div>

              <div className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-emerald-400/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                    <FileText size={24} className="text-emerald-600" />
                  </div>
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-xs font-semibold text-emerald-600">
                    <TrendingUp size={12} />
                    +24%
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">89</p>
                <p className="text-sm text-gray-500">Reportes generados</p>
              </div>

              <div className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-amber-400/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-amber-50 group-hover:bg-amber-100 transition-colors">
                    <Stethoscope size={24} className="text-amber-600" />
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-amber-50 text-xs font-semibold text-amber-600">
                    Pendiente
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">23</p>
                <p className="text-sm text-gray-500">Consultas hoy</p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Acceso Rápido</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Usuarios</h3>
                  <p className="text-sm text-gray-500">Gestionar usuarios</p>
                </div>
                
                <div className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-400/50 transition-all duration-300 cursor-pointer hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Reportes</h3>
                  <p className="text-sm text-gray-500">Ver informes</p>
                </div>
                
                <div className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <Package className="w-6 h-6 text-emerald-600" />
                    </div>
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Productos</h3>
                  <p className="text-sm text-gray-500">Gestionar productos</p>
                </div>
                
                <div className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-gray-400/50 transition-all duration-300 cursor-pointer hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Settings className="w-6 h-6 text-gray-600" />
                    </div>
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Administración</h3>
                  <p className="text-sm text-gray-500">Configurar sistema</p>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Actividad Reciente</h2>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {[
                    { icon: <UserCheck size={18} />, action: "Nuevo paciente registrado", name: "María González", time: "Hace 5 min", color: "bg-red-50 text-primary" },
                    { icon: <Stethoscope size={18} />, action: "Consulta completada", name: "Dr. Juan Pérez", time: "Hace 12 min", color: "bg-emerald-50 text-emerald-600" },
                    { icon: <FileText size={18} />, action: "Reporte generado", name: "Ventas Marzo 2024", time: "Hace 1 hora", color: "bg-blue-50 text-blue-600" },
                    { icon: <Heart size={18} />, action: "Terapia programada", name: "Carlos Mendoza", time: "Hace 2 horas", color: "bg-pink-50 text-pink-600" },
                    { icon: <Activity size={18} />, action: "Laboratorio actualizado", name: "Resultados pendientes", time: "Hace 3 horas", color: "bg-amber-50 text-amber-600" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-all cursor-pointer">
                      <div className={`p-2.5 rounded-xl ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{item.action}</p>
                        <p className="text-sm text-gray-500 truncate">{item.name}</p>
                      </div>
                      <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
