"use client"

import { Sidebar } from "@/components/sidebar"
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  Activity, 
  UserCheck, 
  Heart, 
  Stethoscope, 
  Package,
  Search,
  Bell,
  ChevronRight,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex w-full h-screen bg-[#F9FAFB] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Inicio</span>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-900 font-medium">Dashboard</span>
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
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Panel de control del sistema SisCaritas</p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#DC2626]/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-red-50 group-hover:bg-red-100 transition-colors">
                    <Users size={24} className="text-[#DC2626]" />
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Acceso Rapido</h2>
                <a href="/sections" className="text-sm text-[#DC2626] hover:underline font-medium">
                  Ver todas las secciones
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-[#DC2626]/50 transition-all duration-300 cursor-pointer hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <Users className="w-6 h-6 text-[#DC2626]" />
                    </div>
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-[#DC2626] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <a href="/usuarios" className="block">
                    <h3 className="font-semibold text-gray-900 mb-1">Usuarios</h3>
                    <p className="text-sm text-gray-500">Gestionar usuarios</p>
                  </a>
                </div>
                
                <div className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-pink-400/50 transition-all duration-300 cursor-pointer hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                      <Heart className="w-6 h-6 text-pink-600" />
                    </div>
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-pink-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <a href="/beneficiarios" className="block">
                    <h3 className="font-semibold text-gray-900 mb-1">Beneficiarios</h3>
                    <p className="text-sm text-gray-500">Gestionar beneficiarios</p>
                  </a>
                </div>
                
                <div className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <Package className="w-6 h-6 text-emerald-600" />
                    </div>
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <a href="/inventario" className="block">
                    <h3 className="font-semibold text-gray-900 mb-1">Inventario</h3>
                    <p className="text-sm text-gray-500">Gestionar inventario</p>
                  </a>
                </div>
                
                <div className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-[#DC2626]/50 transition-all duration-300 cursor-pointer hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <Stethoscope className="w-6 h-6 text-[#DC2626]" />
                    </div>
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-[#DC2626] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <a href="/atencion-medica" className="block">
                    <h3 className="font-semibold text-gray-900 mb-1">Clinica</h3>
                    <p className="text-sm text-gray-500">Atencion medica</p>
                  </a>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Actividad Reciente</h2>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {[
                    { icon: <UserCheck size={18} />, action: "Nuevo paciente registrado", name: "Maria Gonzalez", time: "Hace 5 min", color: "bg-red-50 text-[#DC2626]" },
                    { icon: <Stethoscope size={18} />, action: "Consulta completada", name: "Dr. Juan Perez", time: "Hace 12 min", color: "bg-emerald-50 text-emerald-600" },
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
