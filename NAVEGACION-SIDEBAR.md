# Navegación del Sidebar - Sistema SisCaritas

## Resumen de Actualización

Se ha actualizado el sidebar para proporcionar navegación inteligente y automática basada en las rutas actuales de la aplicación.

---

## Características Principales

### 1. **Detección Automática de Rutas**
- Utiliza `usePathname()` para detectar la URL actual
- Las secciones se expanden automáticamente al navegar a un item dentro de ellas
- Los items se resaltan dinámicamente según la ruta actual

### 2. **Navegación Fluida**
- Implementa `useRouter()` para navegación sin recargas de página
- Transiciones suaves entre secciones
- Compatible con botones de atrás/adelante del navegador

### 3. **Estructura Jerárquica**
El sidebar está organizado en 4 secciones principales:

```
GESTIÓN
├─ Usuarios (/usuarios)
├─ Beneficiarios (/beneficiarios)
├─ Voluntarios (/voluntarios)
├─ Especialidades (/especialidades)
└─ Proyectos (/proyectos)

CAMPAÑAS
├─ Campañas (/campanas)
├─ Donantes (/donantes)
└─ Donaciones (/donaciones)

INVENTARIO
├─ Productos (/productos)
├─ Inventario (/inventario)
├─ Movimientos (/movimientos)
└─ Distribuciones (/distribuciones)

SALUD
├─ Personal Médico (/personal-medico)
├─ Atención Médica (/atencion-salud)
└─ Ventas (/ventas)
```

---

## Cómo Funciona

### Flujo de Navegación

1. **Usuario navega a una sección**
   ```
   Usuario → Click en "Usuarios" → pathname = "/usuarios"
   ```

2. **Sidebar detecta automáticamente**
   ```
   usePathname() → detecta "/usuarios"
   useEffect() → busca qué sección contiene "/usuarios"
   ```

3. **Sección se expande y item se resalta**
   ```
   GESTIÓN se expande → "Usuarios" se resalta en rojo
   ```

---

## Componentes Modificados

### DirectMenuItemComponent
- Ahora usa `isActive` en lugar de `activeItem`
- Detecta si la ruta es `/` o `/dashboard`
- Navega usando `router.push()`

### MenuSection
- Ahora usa `activeChild` basado en `pathname`
- Compara `child.href` con la ruta actual
- Maneja expansión/colapso automático de secciones

### Sidebar (componente principal)
- Implementa `usePathname()` para detectar ruta actual
- Implementa `useEffect()` para auto-expandir secciones
- Determina dinámicamente el item activo

---

## Estilos Visuales

### Item Activo
```css
Fondo:     bg-primary (Rojo: #dc2626)
Texto:     text-white
Sombra:    shadow-lg shadow-primary/25
Icono:     Escala 110% al hover
Transición: 200ms
```

### Item Inactivo
```css
Fondo:     Transparente
Texto:     text-gray-600
Hover:     bg-gray-100 + text-gray-900
Icono:     text-gray-400 → text-primary (al hover)
Transición: 200ms
```

---

## Estados del Sidebar

### Expandido (Default)
- Ancho: w-72 (288px)
- Muestra: Iconos + Etiquetas
- Botón: X para colapsar
- Visibilidad: Total

### Colapsado
- Ancho: w-20 (80px)
- Muestra: Solo iconos
- Botón: ≡ para expandir
- Tooltips: Al pasar el mouse

---

## Rutas Disponibles

| Ruta | Descripción | Sección |
|------|-------------|---------|
| / o /dashboard | Dashboard principal | - |
| /usuarios | Gestión de usuarios | GESTIÓN |
| /beneficiarios | Gestión de beneficiarios | GESTIÓN |
| /voluntarios | Gestión de voluntarios | GESTIÓN |
| /especialidades | Gestión de especialidades | GESTIÓN |
| /proyectos | Gestión de proyectos | GESTIÓN |
| /campanas | Gestión de campañas | CAMPAÑAS |
| /donantes | Gestión de donantes | CAMPAÑAS |
| /donaciones | Gestión de donaciones | CAMPAÑAS |
| /productos | Gestión de productos | INVENTARIO |
| /inventario | Gestión de inventario | INVENTARIO |
| /movimientos | Gestión de movimientos | INVENTARIO |
| /distribuciones | Gestión de distribuciones | INVENTARIO |
| /personal-medico | Personal médico | SALUD |
| /atencion-salud | Atención de salud | SALUD |
| /ventas | Gestión de ventas | SALUD |

---

## Comportamiento Inteligente

✓ Las secciones se expanden automáticamente cuando navegas a un item dentro de ellas
✓ Las secciones se colapsan cuando navegas a una sección diferente
✓ El item correcto siempre está resaltado
✓ Funciona con navegación del navegador (back/forward)
✓ Funciona con links directos (bookmarks)
✓ Responsive en modo colapsado
✓ Tooltips informativos en modo colapsado

---

## Características Técnicas

- **Hook:** `usePathname()` - Detección de ruta actual
- **Hook:** `useRouter()` - Navegación sin recarga
- **Hook:** `useEffect()` - Auto-expandir secciones
- **Estado:** `expandedSections` - Controla qué secciones están expandidas
- **Tipado:** TypeScript con interfaces completas
- **Animaciones:** Transiciones CSS suaves (200ms)

---

## Implementación Técnica

### Detección de Ruta Activa

```typescript
const pathname = usePathname()

// Auto-expandir secciones basado en ruta
useEffect(() => {
  const currentPath = pathname.split('/')[1]
  
  menuItems.forEach(section => {
    const hasChild = section.children.some(child => 
      child.href.includes(currentPath)
    )
    if (hasChild && !expandedSections.includes(section.id)) {
      setExpandedSections(prev => [...prev, section.id])
    }
  })
}, [pathname])
```

### Determinar Item Activo

```typescript
const getActiveChild = () => {
  for (const section of menuItems) {
    const child = section.children.find(c => 
      pathname.startsWith(c.href) && c.href !== "/"
    )
    if (child) return child.href
  }
  return null
}
```

---

## Próximos Pasos

1. El dashboard puede actualizarse con métricas propias
2. Las secciones CRUD están listas para usar
3. Se pueden agregar nuevas secciones fácilmente
4. La navegación es completamente automática

---

## Commits Realizados

| Commit | Descripción |
|--------|-------------|
| Sistema CRUD completo | Componentes reutilizables con botones y tablas |
| 4 secciones implementadas | Usuarios, Beneficiarios, Campañas, Inventario |
| Página de secciones | Guía visual de acceso a todos los módulos |
| **Navegación mejorada** | **Detección automática de rutas y expansión** |

---

## Conclusión

La navegación del sidebar ahora es completamente inteligente y automática. Los usuarios pueden navegar fácilmente entre secciones sin necesidad de acciones manuales adicionales. El sistema está completamente listo para agregar métricas al dashboard y continuar con las secciones restantes.
