"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Users,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  UserCog,
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
} from "lucide-react"

interface MenuItem {
  label: string
  icon: React.ReactNode
  href?: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    label: "Usuarios",
    icon: <Users size={20} />,
    children: [
      { label: "Proveedores", icon: <Truck size={18} />, href: "/usuarios/proveedores" },
      { label: "Pacientes", icon: <UserCheck size={18} />, href: "/usuarios/pacientes" },
      { label: "Médicos", icon: <Stethoscope size={18} />, href: "/usuarios/medicos" },
    ],
  },
  {
    label: "Reportes",
    icon: <FileText size={20} />,
    children: [
      { label: "Ventas Médicas", icon: <ShoppingCart size={18} />, href: "/reportes/ventas-medicas" },
      { label: "Compras Médicas", icon: <ShoppingBag size={18} />, href: "/reportes/compras-medicas" },
      { label: "Laboratorio", icon: <FlaskConical size={18} />, href: "/reportes/laboratorio" },
      { label: "Productos", icon: <Package size={18} />, href: "/reportes/productos" },
      { label: "Tratamientos", icon: <Pill size={18} />, href: "/reportes/tratamientos" },
      { label: "Consultas", icon: <ClipboardList size={18} />, href: "/reportes/consultas" },
      { label: "Terapias", icon: <Activity size={18} />, href: "/reportes/terapias" },
      { label: "Pacientes", icon: <Heart size={18} />, href: "/reportes/pacientes" },
      { label: "Ranking", icon: <Trophy size={18} />, href: "/reportes/ranking" },
    ],
  },
  {
    label: "Administración",
    icon: <Settings size={20} />,
    children: [
      { label: "Especialidades", icon: <Layers size={18} />, href: "/administracion/especialidades" },
      { label: "Tipo de Cliente", icon: <Tag size={18} />, href: "/administracion/tipo-cliente" },
      { label: "Precios de Terapias", icon: <DollarSign size={18} />, href: "/administracion/precios-terapias" },
      { label: "Precio de Consultas", icon: <DollarSign size={18} />, href: "/administracion/precio-consultas" },
      { label: "Tratamientos", icon: <Pill size={18} />, href: "/administracion/tratamientos" },
      { label: "Pruebas Laboratorio", icon: <TestTube size={18} />, href: "/administracion/pruebas-laboratorio" },
      { label: "Kits Laboratorio", icon: <Boxes size={18} />, href: "/administracion/kits-laboratorio" },
      { label: "Medicamentos", icon: <PillBottle size={18} />, href: "/administracion/medicamentos" },
      { label: "Productos", icon: <Package size={18} />, href: "/administracion/productos" },
      { label: "Compras", icon: <ShoppingCart size={18} />, href: "/administracion/compras" },
    ],
  },
]

function SidebarItem({ item, depth = 0 }: { item: MenuItem; depth?: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  return (
    <div>
      <button
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-primary/10 ${
          depth === 0 ? "font-medium" : "text-sm"
        }`}
        style={{ paddingLeft: `${16 + depth * 16}px` }}
      >
        <span className="text-primary">{item.icon}</span>
        <span className="flex-1 text-foreground">{item.label}</span>
        {hasChildren && (
          <span className="text-muted-foreground">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </button>
      {hasChildren && isOpen && (
        <div className="bg-muted/30">
          {item.children!.map((child, index) => (
            <a
              key={index}
              href={child.href}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
              style={{ paddingLeft: `${32 + depth * 16}px` }}
            >
              <span className="text-muted-foreground">{child.icon}</span>
              <span>{child.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-card border-r border-border flex flex-col shadow-sm">
      {/* Logo Section */}
      <div className="p-6 border-b border-border flex flex-col items-center">
        <Image
          src="/logo-caritas.png"
          alt="Cáritas Logo"
          width={120}
          height={120}
          className="mb-2"
        />
        <h1 className="text-lg font-semibold text-primary">Sis Caritas</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <UserCog size={20} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Administrador</p>
            <p className="text-xs text-muted-foreground truncate">admin@caritas.org</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
