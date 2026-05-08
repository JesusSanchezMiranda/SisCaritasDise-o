"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import {
  Home,
  Users,
  Leaf,
  Building2,
  Pill,
  Package,
  DollarSign,
  BarChart2,
  Settings,
  UserCircle,
  X,
  UserCog,
  Heart,
  HandHelping,
  User,
  Stethoscope,
  Truck,
  FolderOpen,
  Flag,
  Gift,
  UsersRound,
  ClipboardPlus,
  Activity,
  Syringe,
  FlaskConical,
  TestTube,
  BoxesIcon,
  BriefcaseMedical,
  ShoppingCart,
  ShoppingBag,
  Warehouse,
  ArrowLeftRight,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Receipt,
  Wallet,
  Scale,
  LineChart,
  FileBarChart,
  FlaskRound,
  ListChecks,
  Star,
  Tag,
  Coins,
  ReceiptText,
} from "lucide-react"

// Definición de módulos con sus secciones
interface ModuleSection {
  label: string
  href: string
  icon: React.ReactNode
}

interface Module {
  id: string
  label: string
  icon: React.ReactNode
  sections: ModuleSection[]
}

const modules: Module[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Home size={22} />,
    sections: []
  },
  {
    id: "personas",
    label: "Personas",
    icon: <Users size={22} />,
    sections: [
      { label: "Usuarios Sistema", href: "/usuarios", icon: <UserCog size={18} /> },
      { label: "Beneficiarios", href: "/beneficiarios", icon: <Heart size={18} /> },
      { label: "Voluntarios", href: "/voluntarios", icon: <HandHelping size={18} /> },
      { label: "Pacientes", href: "/pacientes", icon: <User size={18} /> },
      { label: "Personal Medico", href: "/personal-medico", icon: <Stethoscope size={18} /> },
      { label: "Proveedores", href: "/proveedores", icon: <Truck size={18} /> },
    ]
  },
  {
    id: "social",
    label: "Social",
    icon: <Leaf size={22} />,
    sections: [
      { label: "Proyectos", href: "/proyectos", icon: <FolderOpen size={18} /> },
      { label: "Campanas", href: "/campanas", icon: <Flag size={18} /> },
      { label: "Distribuciones", href: "/distribuciones", icon: <Truck size={18} /> },
      { label: "Beneficiarios Atendidos", href: "/beneficiarios-atendidos", icon: <UsersRound size={18} /> },
      { label: "Donaciones", href: "/donaciones", icon: <Gift size={18} /> },
    ]
  },
  {
    id: "clinica",
    label: "Clinica",
    icon: <Building2 size={22} />,
    sections: [
      { label: "Atencion Medica", href: "/atencion-medica", icon: <ClipboardPlus size={18} /> },
      { label: "Consultas", href: "/consultas", icon: <Activity size={18} /> },
      { label: "Terapias", href: "/terapias", icon: <Syringe size={18} /> },
      { label: "Tratamientos", href: "/tratamientos", icon: <BriefcaseMedical size={18} /> },
      { label: "Laboratorio", href: "/laboratorio", icon: <FlaskConical size={18} /> },
      { label: "Pruebas Laboratorio", href: "/pruebas-laboratorio", icon: <TestTube size={18} /> },
      { label: "Kits Laboratorio", href: "/kits-laboratorio", icon: <BoxesIcon size={18} /> },
      { label: "Especialidades", href: "/especialidades", icon: <BriefcaseMedical size={18} /> },
      { label: "Personal Medico", href: "/personal-medico-clinica", icon: <Stethoscope size={18} /> },
    ]
  },
  {
    id: "farmacia",
    label: "Farmacia",
    icon: <Pill size={22} />,
    sections: [
      { label: "Medicamentos", href: "/medicamentos", icon: <Pill size={18} /> },
      { label: "Ventas Farmacia", href: "/ventas-farmacia", icon: <ShoppingCart size={18} /> },
      { label: "Compras Farmacia", href: "/compras-farmacia", icon: <ShoppingBag size={18} /> },
      { label: "Inventario Farmacia", href: "/inventario-farmacia", icon: <Warehouse size={18} /> },
      { label: "Movimientos", href: "/movimientos", icon: <ArrowLeftRight size={18} /> },
      { label: "Alertas de Stock", href: "/alertas-stock", icon: <AlertTriangle size={18} /> },
    ]
  },
  {
    id: "productos",
    label: "Productos",
    icon: <Package size={22} />,
    sections: [
      { label: "Tratamientos", href: "/productos-tratamientos", icon: <BriefcaseMedical size={18} /> },
      { label: "Consultas", href: "/productos-consultas", icon: <Activity size={18} /> },
      { label: "Terapias", href: "/productos-terapias", icon: <Syringe size={18} /> },
      { label: "Medicamentos", href: "/productos-medicamentos", icon: <Pill size={18} /> },
      { label: "Kits Laboratorio", href: "/productos-kits", icon: <BoxesIcon size={18} /> },
    ]
  },
  {
    id: "finanzas",
    label: "Finanzas",
    icon: <DollarSign size={22} />,
    sections: [
      { label: "Ingresos", href: "/ingresos", icon: <TrendingUp size={18} /> },
      { label: "Egresos", href: "/egresos", icon: <TrendingDown size={18} /> },
      { label: "Gastos", href: "/gastos", icon: <Receipt size={18} /> },
      { label: "Compras", href: "/compras", icon: <ShoppingBag size={18} /> },
      { label: "Balance General", href: "/balance-general", icon: <Scale size={18} /> },
      { label: "Flujo de Caja", href: "/flujo-caja", icon: <Wallet size={18} /> },
    ]
  },
  {
    id: "reportes",
    label: "Reportes",
    icon: <BarChart2 size={22} />,
    sections: [
      { label: "Ventas Medicas", href: "/reportes-ventas-medicas", icon: <LineChart size={18} /> },
      { label: "Compras Medicas", href: "/reportes-compras-medicas", icon: <FileBarChart size={18} /> },
      { label: "Laboratorio", href: "/reportes-laboratorio", icon: <FlaskRound size={18} /> },
      { label: "Productos", href: "/reportes-productos", icon: <Package size={18} /> },
      { label: "Tratamientos", href: "/reportes-tratamientos", icon: <BriefcaseMedical size={18} /> },
      { label: "Consultas", href: "/reportes-consultas", icon: <Activity size={18} /> },
      { label: "Terapias", href: "/reportes-terapias", icon: <Syringe size={18} /> },
      { label: "Pacientes", href: "/reportes-pacientes", icon: <User size={18} /> },
      { label: "Ranking", href: "/reportes-ranking", icon: <Star size={18} /> },
    ]
  },
  {
    id: "configuracion",
    label: "Configuracion",
    icon: <Settings size={22} />,
    sections: [
      { label: "Especialidades", href: "/config-especialidades", icon: <BriefcaseMedical size={18} /> },
      { label: "Tipo de Cliente", href: "/config-tipo-cliente", icon: <Tag size={18} /> },
      { label: "Precios de Terapias", href: "/config-precios-terapias", icon: <Coins size={18} /> },
      { label: "Precios de Consultas", href: "/config-precios-consultas", icon: <ReceiptText size={18} /> },
      { label: "Pruebas Laboratorio", href: "/config-pruebas-laboratorio", icon: <TestTube size={18} /> },
      { label: "Kits Laboratorio", href: "/config-kits-laboratorio", icon: <BoxesIcon size={18} /> },
      { label: "Precios de Productos", href: "/config-precios-productos", icon: <ListChecks size={18} /> },
      { label: "Compras", href: "/config-compras", icon: <ShoppingBag size={18} /> },
    ]
  },
]

// Color principal - rojo vibrante y suave
const PRIMARY_RED = "#C53030"
const PRIMARY_RED_LIGHT = "#E53E3E"
const PRIMARY_RED_HOVER = "#9B2C2C"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  
  // Determinar el modulo activo basado en la ruta actual
  const getActiveModuleFromPath = (): string => {
    if (pathname === "/" || pathname === "/dashboard") return "dashboard"
    
    for (const module of modules) {
      if (module.sections.some(section => pathname.startsWith(section.href))) {
        return module.id
      }
    }
    return "dashboard"
  }
  
  const [activeModule, setActiveModule] = useState<string>(getActiveModuleFromPath())
  
  const currentModule = modules.find(m => m.id === activeModule)
  
  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId)
    if (moduleId === "dashboard") {
      router.push("/")
    }
  }
  
  const handleSectionClick = (href: string) => {
    router.push(href)
  }
  
  const isActiveSection = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar Principal - 64px */}
      <aside 
        className="w-16 flex flex-col items-center py-4 shrink-0"
        style={{ backgroundColor: PRIMARY_RED }}
      >
        {/* Logo y Nombre del Sistema */}
        <div className="mb-4 flex flex-col items-center">
          <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md">
            <Image
              src="/logo-caritas.png"
              alt="Caritas Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <span className="text-white/90 text-[8px] font-medium mt-1 tracking-wide">SisCaritas</span>
          <span className="text-white/60 text-[6px] mt-0.5 px-1.5 py-0.5 bg-white/10 rounded-full">v1.0</span>
        </div>
        
        {/* Iconos de Modulos */}
        <nav className="flex-1 flex flex-col items-center gap-1.5 w-full px-2">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                activeModule === module.id
                  ? "bg-white shadow-md"
                  : "text-white hover:bg-white/15"
              }`}
              style={activeModule === module.id ? { color: PRIMARY_RED } : undefined}
              title={module.label}
            >
              {module.icon}
            </button>
          ))}
        </nav>
        
        {/* Avatar Usuario */}
        <div className="mt-auto pt-4">
          <button className="w-11 h-11 rounded-xl flex items-center justify-center text-white hover:bg-white/15 transition-all duration-200">
            <UserCircle size={26} />
          </button>
        </div>
      </aside>
      
      {/* Panel Secundario - ~220px */}
      {currentModule && currentModule.sections.length > 0 && (
        <aside className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0 shadow-sm">
          {/* Cabecera del Modulo */}
          <div 
            className="px-3 py-3 flex items-center justify-between gap-2"
            style={{ backgroundColor: PRIMARY_RED }}
          >
            {/* Icono + Nombre del modulo en pill */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-white shrink-0">
                {currentModule.icon}
              </span>
              <span className="bg-[#9B2C2C] text-white font-medium text-sm px-4 py-1.5 rounded-full truncate">
                {currentModule.label}
              </span>
            </div>
            {/* Boton cerrar */}
            <button 
              onClick={() => setActiveModule("dashboard")}
              className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-all duration-200 shrink-0"
              title="Cerrar panel"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Lista de Secciones */}
          <nav className="flex-1 py-3 px-2 overflow-y-auto">
            {currentModule.sections.map((section, index) => (
              <button
                key={index}
                onClick={() => handleSectionClick(section.href)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200 text-left rounded-lg mb-0.5 ${
                  isActiveSection(section.href)
                    ? "bg-red-50 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                style={isActiveSection(section.href) ? { 
                  color: PRIMARY_RED_LIGHT
                } : undefined}
              >
                <span style={isActiveSection(section.href) ? { color: PRIMARY_RED_LIGHT } : { color: '#9CA3AF' }}>
                  {section.icon}
                </span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
          
          {/* Footer del Modulo */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex justify-center">
              <span 
                className="px-3 py-1.5 rounded-full border text-xs font-medium"
                style={{ borderColor: PRIMARY_RED_LIGHT, color: PRIMARY_RED_LIGHT }}
              >
                Modulo: {currentModule.label}
              </span>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}
