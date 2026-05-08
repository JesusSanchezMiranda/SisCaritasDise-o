import { Sidebar } from "@/components/sidebar";
import { Users, FileText, Settings, TrendingUp, Calendar, Clock } from "lucide-react";

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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={16} />
              <span>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card p-5 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users size={20} className="text-primary" />
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-500">
                  <TrendingUp size={14} />
                  +12%
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">1,284</p>
              <p className="text-xs text-muted-foreground mt-1">Pacientes activos</p>
            </div>

            <div className="bg-card p-5 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Calendar size={20} className="text-secondary" />
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-500">
                  <TrendingUp size={14} />
                  +8%
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-xs text-muted-foreground mt-1">Citas esta semana</p>
            </div>

            <div className="bg-card p-5 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <FileText size={20} className="text-emerald-500" />
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-500">
                  <TrendingUp size={14} />
                  +24%
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">89</p>
              <p className="text-xs text-muted-foreground mt-1">Reportes generados</p>
            </div>

            <div className="bg-card p-5 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Clock size={20} className="text-amber-500" />
                </div>
                <span className="text-xs text-muted-foreground">Pendiente</span>
              </div>
              <p className="text-2xl font-bold text-foreground">23</p>
              <p className="text-xs text-muted-foreground mt-1">Consultas hoy</p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <h2 className="text-lg font-semibold text-foreground mb-4">Acceso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Usuarios</h3>
              <p className="text-sm text-muted-foreground">Gestione proveedores, pacientes y médicos del sistema</p>
            </div>
            
            <div className="group bg-card p-6 rounded-xl border border-border hover:border-secondary/50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Reportes</h3>
              <p className="text-sm text-muted-foreground">Visualice informes detallados y estadísticas</p>
            </div>
            
            <div className="group bg-card p-6 rounded-xl border border-border hover:border-muted-foreground/50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Settings className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Administración</h3>
              <p className="text-sm text-muted-foreground">Configure especialidades, precios y más</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
