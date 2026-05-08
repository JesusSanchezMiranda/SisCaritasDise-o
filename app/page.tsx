import { Sidebar } from "@/components/sidebar";
import { Users, FileText, Settings, TrendingUp, Calendar, Clock, ArrowUpRight, Activity, UserCheck, Heart, Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">
                Bienvenido de nuevo
              </h1>
              <p className="text-muted-foreground">
                Panel de control del sistema Cáritas
              </p>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-border shadow-sm text-sm text-foreground font-medium">
              <Calendar size={18} className="text-primary" />
              <span>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="group bg-white p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-red-50 group-hover:bg-red-100 transition-colors">
                  <Users size={24} className="text-primary" />
                </div>
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-xs font-semibold text-emerald-600 border border-emerald-200">
                  <TrendingUp size={12} />
                  +12%
                </span>
              </div>
              <p className="text-4xl font-bold text-foreground mb-1">1,284</p>
              <p className="text-sm text-muted-foreground">Pacientes activos</p>
            </div>

            <div className="group bg-white p-6 rounded-2xl border border-border hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300 cursor-pointer hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <Calendar size={24} className="text-secondary" />
                </div>
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-xs font-semibold text-emerald-600 border border-emerald-200">
                  <TrendingUp size={12} />
                  +8%
                </span>
              </div>
              <p className="text-4xl font-bold text-foreground mb-1">156</p>
              <p className="text-sm text-muted-foreground">Citas esta semana</p>
            </div>

            <div className="group bg-white p-6 rounded-2xl border border-border hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 cursor-pointer hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                  <FileText size={24} className="text-emerald-600" />
                </div>
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-xs font-semibold text-emerald-600 border border-emerald-200">
                  <TrendingUp size={12} />
                  +24%
                </span>
              </div>
              <p className="text-4xl font-bold text-foreground mb-1">89</p>
              <p className="text-sm text-muted-foreground">Reportes generados</p>
            </div>

            <div className="group bg-white p-6 rounded-2xl border border-border hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 cursor-pointer hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-amber-50 group-hover:bg-amber-100 transition-colors">
                  <Clock size={24} className="text-amber-600" />
                </div>
                <span className="px-3 py-1.5 rounded-full bg-amber-50 text-xs font-semibold text-amber-600 border border-amber-200">
                  Pendiente
                </span>
              </div>
              <p className="text-4xl font-bold text-foreground mb-1">23</p>
              <p className="text-sm text-muted-foreground">Consultas hoy</p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <h2 className="text-xl font-bold text-foreground mb-5">Acceso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="group bg-white p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer relative overflow-hidden hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-red-100 transition-all duration-300">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <ArrowUpRight size={22} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">Usuarios</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Gestione proveedores, pacientes y médicos del sistema</p>
              </div>
            </div>
            
            <div className="group bg-white p-6 rounded-2xl border border-border hover:border-secondary/30 transition-all duration-300 cursor-pointer relative overflow-hidden hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                    <FileText className="w-7 h-7 text-secondary" />
                  </div>
                  <ArrowUpRight size={22} className="text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">Reportes</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Visualice informes detallados y estadísticas</p>
              </div>
            </div>
            
            <div className="group bg-white p-6 rounded-2xl border border-border hover:border-slate-400/30 transition-all duration-300 cursor-pointer relative overflow-hidden hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-slate-200 transition-all duration-300">
                    <Settings className="w-7 h-7 text-slate-600" />
                  </div>
                  <ArrowUpRight size={22} className="text-muted-foreground group-hover:text-slate-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">Administración</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Configure especialidades, precios y más</p>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <h2 className="text-xl font-bold text-foreground mb-5">Actividad Reciente</h2>
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <div className="space-y-3">
              {[
                { icon: <UserCheck size={20} />, action: "Nuevo paciente registrado", name: "María González", time: "Hace 5 min", color: "bg-red-50 text-primary" },
                { icon: <Stethoscope size={20} />, action: "Consulta completada", name: "Dr. Juan Pérez", time: "Hace 12 min", color: "bg-emerald-50 text-emerald-600" },
                { icon: <FileText size={20} />, action: "Reporte generado", name: "Ventas Marzo 2024", time: "Hace 1 hora", color: "bg-blue-50 text-secondary" },
                { icon: <Heart size={20} />, action: "Terapia programada", name: "Carlos Mendoza", time: "Hace 2 horas", color: "bg-pink-50 text-pink-600" },
                { icon: <Activity size={20} />, action: "Laboratorio actualizado", name: "Resultados pendientes", time: "Hace 3 horas", color: "bg-amber-50 text-amber-600" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all cursor-pointer group">
                  <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium bg-muted px-3 py-1.5 rounded-full">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
