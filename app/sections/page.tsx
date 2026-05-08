"use client"

import { AppLayout } from "../app-layout"
import {
  Users,
  Heart,
  UserCheck,
  Briefcase,
  FolderOpen,
  Flag,
  Gift,
  CreditCard,
  Package,
  Warehouse,
  TrendingUp,
  Truck,
  Stethoscope,
  Activity,
  ShoppingCart,
  ArrowRight,
} from "lucide-react"

const sections = [
  {
    category: "GESTIÓN",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    items: [
      {
        name: "Usuarios",
        description: "Gestiona usuarios y roles del sistema (ADMIN, COORDINADOR, CONTADOR, VOLUNTARIO)",
        icon: Users,
        href: "/usuarios",
        color: "blue",
      },
      {
        name: "Beneficiarios",
        description: "Administra información de beneficiarios y sus datos de vulnerabilidad",
        icon: Heart,
        href: "/beneficiarios",
        color: "pink",
      },
      {
        name: "Voluntarios",
        description: "Gestiona voluntarios, disponibilidad y horas trabajadas",
        icon: UserCheck,
        href: "/voluntarios",
        color: "green",
      },
      {
        name: "Especialidades",
        description: "Define especialidades sociales y clínicas del sistema",
        icon: Briefcase,
        href: "/especialidades",
        color: "purple",
      },
      {
        name: "Proyectos",
        description: "Crea y gestiona proyectos sociales con objetivos y presupuestos",
        icon: FolderOpen,
        href: "/proyectos",
        color: "indigo",
      },
    ],
  },
  {
    category: "CAMPAÑAS",
    icon: Flag,
    color: "bg-orange-50 text-orange-600",
    items: [
      {
        name: "Campañas",
        description: "Gestiona campañas sociales y de salud con presupuestos e indicadores",
        icon: Flag,
        href: "/campanas",
        color: "orange",
      },
      {
        name: "Donantes",
        description: "Administra donantes (personas y empresas) con historial de donaciones",
        icon: Gift,
        href: "/donantes",
        color: "cyan",
      },
      {
        name: "Donaciones",
        description: "Registra donaciones monetarias, en especie y mixtas con seguimiento",
        icon: CreditCard,
        href: "/donaciones",
        color: "teal",
      },
    ],
  },
  {
    category: "INVENTARIO",
    icon: Warehouse,
    color: "bg-emerald-50 text-emerald-600",
    items: [
      {
        name: "Productos",
        description: "Catálogo de bienes para inventario y distribución",
        icon: Package,
        href: "/productos",
        color: "emerald",
      },
      {
        name: "Inventario",
        description: "Gestiona stock, valores y alertas de productos en almacén",
        icon: Warehouse,
        href: "/inventario",
        color: "emerald",
      },
      {
        name: "Movimientos",
        description: "Registra entrada, salida y ajustes de inventario con trazabilidad",
        icon: TrendingUp,
        href: "/movimientos",
        color: "lime",
      },
      {
        name: "Distribuciones",
        description: "Controla distribución de productos a beneficiarios",
        icon: Truck,
        href: "/distribuciones",
        color: "amber",
      },
    ],
  },
  {
    category: "SALUD",
    icon: Stethoscope,
    color: "bg-red-50 text-red-600",
    items: [
      {
        name: "Personal Médico",
        description: "Gestiona profesionales de salud y sus especialidades",
        icon: Stethoscope,
        href: "/personal-medico",
        color: "red",
      },
      {
        name: "Atención Médica",
        description: "Registra consultas, terapias y atenciones de salud",
        icon: Activity,
        href: "/atencion-salud",
        color: "rose",
      },
      {
        name: "Ventas",
        description: "Gestiona ventas de medicamentos y servicios de salud",
        icon: ShoppingCart,
        href: "/ventas",
        color: "fuchsia",
      },
    ],
  },
]

function SectionCard({ item, colorClass }: { item: any; colorClass: string }) {
  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      pink: "bg-pink-100 text-pink-700 hover:bg-pink-200",
      green: "bg-green-100 text-green-700 hover:bg-green-200",
      purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
      indigo: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
      orange: "bg-orange-100 text-orange-700 hover:bg-orange-200",
      cyan: "bg-cyan-100 text-cyan-700 hover:bg-cyan-200",
      teal: "bg-teal-100 text-teal-700 hover:bg-teal-200",
      emerald: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      lime: "bg-lime-100 text-lime-700 hover:bg-lime-200",
      amber: "bg-amber-100 text-amber-700 hover:bg-amber-200",
      red: "bg-red-100 text-red-700 hover:bg-red-200",
      rose: "bg-rose-100 text-rose-700 hover:bg-rose-200",
      fuchsia: "bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200",
    }
    return colors[color] || colors.blue
  }

  const IconComponent = item.icon

  return (
    <a
      href={item.href}
      className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(item.color)} transition-transform group-hover:scale-110`}>
          <IconComponent size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-end text-gray-400 group-hover:text-blue-600 transition-colors">
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  )
}

export default function SectionsPage() {
  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-5 shrink-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Secciones del Sistema SisCaritas</h1>
        <p className="text-gray-600">Acceso a todos los módulos de gestión del sistema. Cada sección incluye operaciones CRUD completas.</p>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {sections.map((section, index) => {
            const SectionIcon = section.icon
            return (
              <div key={index}>
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg ${section.color}`}>
                    <SectionIcon size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.category}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {section.items.length} módulos disponibles
                    </p>
                  </div>
                </div>

                {/* Section Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {section.items.map((item, itemIndex) => (
                    <SectionCard key={itemIndex} item={item} colorClass={section.color} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Features Info */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Funcionalidades CRUD Incluidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-600" />
                <p className="font-semibold text-gray-900">Crear (CREATE)</p>
              </div>
              <p className="text-sm text-gray-700 ml-4">Agregar nuevos registros con formularios validados</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <p className="font-semibold text-gray-900">Leer (READ)</p>
              </div>
              <p className="text-sm text-gray-700 ml-4">Visualizar detalles con vista previa rápida</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-600" />
                <p className="font-semibold text-gray-900">Actualizar (UPDATE)</p>
              </div>
              <p className="text-sm text-gray-700 ml-4">Editar registros existentes sin límites</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-600" />
                <p className="font-semibold text-gray-900">Eliminar (DELETE)</p>
              </div>
              <p className="text-sm text-gray-700 ml-4">Borrar registros con confirmación de seguridad</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <p className="font-semibold text-gray-900 mb-2">Búsqueda y Filtrado</p>
              <p className="text-sm text-gray-700">Búsqueda en tiempo real en múltiples campos</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <p className="font-semibold text-gray-900 mb-2">Ordenamiento</p>
              <p className="text-sm text-gray-700">Ordena columnas ascendente/descendente</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <p className="font-semibold text-gray-900 mb-2">Exportación</p>
              <p className="text-sm text-gray-700">Exporta e importa datos en múltiples formatos</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Total de Secciones</p>
            <p className="text-3xl font-bold text-gray-900">15</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Módulos Disponibles</p>
            <p className="text-3xl font-bold text-gray-900">{sections.reduce((sum, s) => sum + s.items.length, 0)}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Botones CRUD</p>
            <p className="text-3xl font-bold text-gray-900">10+</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Componentes Reutilizables</p>
            <p className="text-3xl font-bold text-gray-900">5</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
  
  return <AppLayout>{content}</AppLayout>
}
