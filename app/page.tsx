"use client"

import { AppLayout } from "./app-layout"
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
} from "lucide-react"

export default function Home() {
  return (
    <AppLayout>
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Panel de control del sistema Cáritas</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600">
              <Calendar size={16} className="text-primary" />
              <span className="capitalize">{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Acceso Rápido</h2>
                <a href="/sections" className="text-sm text-primary hover:underline font-medium">
                  Ver todas las secciones →
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
                
                <div className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-orange-400/50 transition-all duration-300 cursor-pointer hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                      <Settings className="w-6 h-6 text-orange-600" />
                    </div>
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-orange-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <a href="/sections" className="block">
                    <h3 className="font-semibold text-gray-900 mb-1">Más Secciones</h3>
                    <p className="text-sm text-gray-500">Acceso a todos los módulos</p>
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
      </div>
    </AppLayout>
  )
}
