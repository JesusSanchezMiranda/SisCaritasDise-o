import { Sidebar } from "@/components/sidebar";
import { Users, FileText, Settings, TrendingUp, Calendar, Clock, ArrowUpRight, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Bienvenido de nuevo, Administrador
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-sm text-muted-foreground">
              <Calendar size={16} />
              <span>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="group bg-card p-5 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-primary/15 group-hover:bg-primary/25 transition-colors">
                  <Users size={22} className="text-primary" />
                </div>
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-xs font-medium text-emerald-400">
                  <TrendingUp size={12} />
                  +12%
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">1,284</p>
              <p className="text-sm text-muted-foreground">Pacientes activos</p>
            </div>

            <div className="group bg-card p-5 rounded-2xl border border-border hover:border-secondary/30 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-secondary/15 group-hover:bg-secondary/25 transition-colors">
                  <Calendar size={22} className="text-secondary" />
                </div>
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-xs font-medium text-emerald-400">
                  <TrendingUp size={12} />
                  +8%
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">156</p>
              <p className="text-sm text-muted-foreground">Citas esta semana</p>
            </div>

            <div className="group bg-card p-5 rounded-2xl border border-border hover:border-emerald-500/30 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 group-hover:bg-emerald-500/25 transition-colors">
                  <FileText size={22} className="text-emerald-400" />
                </div>
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-xs font-medium text-emerald-400">
                  <TrendingUp size={12} />
                  +24%
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">89</p>
              <p className="text-sm text-muted-foreground">Reportes generados</p>
            </div>

            <div className="group bg-card p-5 rounded-2xl border border-border hover:border-amber-500/30 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-amber-500/15 group-hover:bg-amber-500/25 transition-colors">
                  <Clock size={22} className="text-amber-400" />
                </div>
                <span className="px-2 py-1 rounded-lg bg-amber-500/10 text-xs font-medium text-amber-400">
                  Pendiente
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">23</p>
              <p className="text-sm text-muted-foreground">Consultas hoy</p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <h2 className="text-lg font-semibold text-foreground mb-4">Acceso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="group bg-card p-6 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Usuarios</h3>
                <p className="text-sm text-muted-foreground">Gestione proveedores, pacientes y médicos del sistema</p>
              </div>
            </div>
            
            <div className="group bg-card p-6 rounded-2xl border border-border hover:border-secondary/40 transition-all duration-300 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-secondary/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-6 h-6 text-secondary" />
                  </div>
                  <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Reportes</h3>
                <p className="text-sm text-muted-foreground">Visualice informes detallados y estadísticas</p>
              </div>
            </div>
            
            <div className="group bg-card p-6 rounded-2xl border border-border hover:border-muted-foreground/40 transition-all duration-300 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-muted-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-muted-foreground/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Settings className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <ArrowUpRight size={20} className="text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Administración</h3>
                <p className="text-sm text-muted-foreground">Configure especialidades, precios y más</p>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <h2 className="text-lg font-semibold text-foreground mb-4">Actividad Reciente</h2>
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="space-y-4">
              {[
                { icon: <UserCheck size={18} />, action: "Nuevo paciente registrado", name: "María González", time: "Hace 5 min", color: "text-primary" },
                { icon: <Activity size={18} />, action: "Consulta completada", name: "Dr. Juan Pérez", time: "Hace 12 min", color: "text-emerald-400" },
                { icon: <FileText size={18} />, action: "Reporte generado", name: "Ventas Marzo 2024", time: "Hace 1 hora", color: "text-secondary" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className={`p-2 rounded-lg bg-accent ${item.color}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
