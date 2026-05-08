import { Sidebar } from "@/components/sidebar";
import { Users, FileText, Settings, TrendingUp, Calendar, Clock, ArrowUpRight, Activity, UserCheck, Heart, Stethoscope, Package } from "lucide-react";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Bienvenido de nuevo
              </h1>
              <p className="text-gray-500">
                Panel de control del sistema Cáritas
              </p>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm text-sm text-gray-700 font-medium">
              <Calendar size={18} className="text-primary" />
              <span>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
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
                  <Clock size={24} className="text-amber-600" />
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
          <h2 className="text-xl font-bold text-gray-900 mb-5">Acceso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
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

          {/* Activity Section */}
          <h2 className="text-xl font-bold text-gray-900 mb-5">Actividad Reciente</h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
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
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-500">{item.name}</p>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
