# Layout Persistente con Sidebar Estático

## Descripción General

Se ha implementado un sistema de layout que mantiene el sidebar visible y estático en todas las secciones del sistema. Esto permite una navegación fluida sin perder el contexto de la aplicación.

## Arquitectura

### Estructura de Carpetas

```
app/
├── app-layout.tsx          ← Wrapper del layout con sidebar
├── layout.tsx              ← Layout raíz de Next.js
├── page.tsx                ← Dashboard principal (usa AppLayout)
├── usuarios/
│   └── page.tsx            ← Sección usuarios (usa AppLayout)
├── beneficiarios/
│   └── page.tsx            ← Sección beneficiarios (usa AppLayout)
├── campanas/
│   └── page.tsx            ← Sección campañas (usa AppLayout)
└── inventario/
    └── page.tsx            ← Sección inventario (usa AppLayout)
```

## Componentes Principales

### 1. AppLayout (app-layout.tsx)

Wrapper que proporciona la estructura de layout con sidebar persistente:

```typescript
"use client"

import { Sidebar } from "@/components/sidebar"
import { ReactNode } from "react"

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar - Fixed, Static */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}
```

**Características:**
- Flexbox layout horizontal
- Sidebar en el lado izquierdo
- Contenido principal (children) ocupa el espacio restante
- `overflow-hidden` en main para prevenir scroll del body

### 2. Estructura de Cada Página

Cada sección ahora sigue este patrón:

```typescript
"use client"

import { AppLayout } from "../app-layout"
// ... otros imports

export default function MiPaginaPage() {
  // Estado y lógica de la página
  const [data, setData] = useState(...)
  
  // Estructura del contenido
  const content = (
    <div className="flex flex-col h-full">
      {/* Header con navegación de la sección */}
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 shrink-0">
        {/* Título, descripción, botones */}
      </header>

      {/* Contenido principal scrolleable */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats, tablas, datos */}
        </div>
      </div>

      {/* Modales y componentes flotantes */}
      <Modal {...props} />
    </div>
  )

  // Envolver con AppLayout
  return <AppLayout>{content}</AppLayout>
}
```

## Comportamiento de Scroll

```
┌─────────────────────────────────────┐
│          Viewport (100vh)            │
├─────────────────────────────────────┤
│ Sidebar  │       Main Content        │
│ (fixed)  │ ┌─────────────────────┐   │
│          │ │      Header         │   │
│          │ │ (no scroll)         │   │
│          │ ├─────────────────────┤   │
│          │ │   Contenido Prin    │   │
│          │ │   (scrolleable)     │   │
│          │ │                     │   │
│          │ └─────────────────────┘   │
└─────────────────────────────────────┘
```

**Flujo de scroll:**
- Header: Permanece fijo en la parte superior
- Contenido: Scrollable verticalmente
- Sidebar: Permanece visible (fixed en Next.js)

## Clases Tailwind Utilizadas

| Clase | Propósito |
|-------|-----------|
| `flex` | Layout flexbox horizontal |
| `flex-col` | Layout vertical |
| `w-full` | Ancho completo |
| `min-h-screen` | Alto mínimo del viewport |
| `flex-1` | Ocupa espacio disponible |
| `overflow-hidden` | Oculta overflow |
| `overflow-y-auto` | Scroll vertical solo |
| `shrink-0` | No se comprime |
| `h-full` | Alto 100% del contenedor |
| `bg-gray-50` | Fondo gris claro |

## Secciones Actualizadas

### 1. Dashboard (/)
- **Estado:** Actualizado con AppLayout
- **Header:** Título "Dashboard" con fecha
- **Contenido:** Stats y acciones rápidas

### 2. Usuarios (/usuarios)
- **Estado:** Actualizado con AppLayout
- **Header:** Ícono azul, título "Usuarios"
- **Contenido:** Stats (5 tarjetas) + tabla de usuarios

### 3. Beneficiarios (/beneficiarios)
- **Estado:** Actualizado con AppLayout
- **Header:** Ícono rosa, título "Beneficiarios"
- **Contenido:** Stats (4 tarjetas) + tabla de beneficiarios

### 4. Campañas (/campanas)
- **Estado:** Actualizado con AppLayout
- **Header:** Ícono naranja, título "Campañas"
- **Contenido:** Stats (5 tarjetas) + tabla de campañas

### 5. Inventario (/inventario)
- **Estado:** Actualizado con AppLayout
- **Header:** Ícono verde, título "Inventario"
- **Contenido:** Stats (5 tarjetas) + tabla de inventario

## Navegación

### Flujo de Navegación

```
Usuario clica en "Usuarios" en sidebar
         ↓
Router navega a /usuarios
         ↓
Page renderiza con AppLayout
         ↓
Sidebar permanece visible
         ↓
Contenido de usuarios carga
         ↓
Usuario puede navegar a otra sección sin perder sidebar
```

### Características de Navegación

- **Detección automática de ruta:** Sidebar destaca la sección activa
- **Transiciones suaves:** 200ms CSS transitions
- **Sin recarga de página:** useRouter() de Next.js
- **Contexto persistente:** Sidebar siempre visible

## Patrones Reutilizables

### Patrón de Página

Usar este patrón para nuevas secciones:

```typescript
export default function NuevaSectionPage() {
  const content = (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[COLOR]-100 rounded-xl">
              <[ICON] size={24} className="text-[COLOR]-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">[TÍTULO]</h1>
          </div>
          <p className="text-sm text-gray-600">[DESCRIPCIÓN]</p>
        </div>
        <div className="flex gap-3">
          {/* Botones de acción */}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats, tablas, contenido */}
        </div>
      </div>

      {/* Modales */}
    </div>
  )

  return <AppLayout>{content}</AppLayout>
}
```

## Ventajas del Diseño

✓ **Navegación fluida:** Sin perder contexto
✓ **Acceso rápido:** Sidebar siempre visible
✓ **Consistencia:** Mismo layout en todas las secciones
✓ **Performance:** Sidebar reutilizable
✓ **UX mejorada:** No hay sorpresas al navegar
✓ **Responsive:** Funciona en todos los tamaños

## Consideraciones de Rendimiento

- Sidebar renderiza una sola vez
- usePathname() para detectar cambios de ruta
- No hay re-renders innecesarios
- Scroll del contenido principal es eficiente

## Próximos Pasos

1. Aplicar el mismo patrón a las 11 secciones restantes
2. Considerar agregar animaciones de transición
3. Implementar localStorage para recordar secciones expandidas
4. Agregar breadcrumbs en el header si es necesario

## Troubleshooting

### Problema: El sidebar desaparece al navegar
**Solución:** Asegurar que la página usa `<AppLayout>{content}</AppLayout>`

### Problema: El contenido no scrollea
**Solución:** Asegurar que el contenido esté dentro de `<div className="flex-1 p-8 overflow-y-auto">`

### Problema: El header scrollea con el contenido
**Solución:** Asegurar que el header tiene `shrink-0` y está fuera del `overflow-y-auto`

## Referencias

- Next.js Routing: https://nextjs.org/docs/app/building-your-application/routing
- Tailwind CSS Layout: https://tailwindcss.com/docs/display
- React Hooks: https://react.dev/reference/react/hooks
