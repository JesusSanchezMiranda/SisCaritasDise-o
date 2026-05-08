# Sistema CRUD Completo - SisCaritas

## Descripción General

Se ha creado un **sistema completo y reutilizable de componentes CRUD** para el sistema de gestión de Cáritas. Los componentes están organizados modularmente y pueden ser aplicados a cualquier sección de la aplicación.

## 📁 Estructura de Componentes

### 1. **CRUD Buttons** (`components/crud-buttons.tsx`)
Botones especializados para todas las acciones CRUD:

- **CreateButton** - Crear nuevo registro (Emerald/Verde)
- **ViewButton** - Ver detalles (Blue/Azul)
- **EditButton** - Editar registro (Amber/Ámbar)
- **DeleteButton** - Eliminar registro (Red/Rojo)
- **DuplicateButton** - Duplicar registro (Purple/Púrpura)
- **ExportButton** - Exportar/Descargar (Indigo)
- **ImportButton** - Importar/Cargar (Teal)
- **SaveButton** - Guardar cambios (Blue/Azul)
- **CancelButton** - Cancelar/Cerrar (Gray/Gris)
- **ConfirmButton** - Confirmar acción (Green/Verde)
- **WarningButton** - Advertencias (Orange/Naranja)
- **MoreOptionsButton** - Más opciones (Gray/Gris)

**Componente Compuesto:**
- **ActionButtons** - Grupo de acciones configurables para filas de tabla

### 2. **Data Table** (`components/data-table.tsx`)
Tabla genérica y reutilizable con:

✓ Búsqueda en tiempo real
✓ Ordenamiento ascendente/descendente
✓ Columnas personalizables con renderizado custom
✓ Acciones por fila configurables
✓ Indicadores de estado de carga
✓ Contador de registros

```tsx
<DataTable<Beneficiario>
  columns={columns}
  data={beneficiarios}
  title="Lista de Beneficiarios"
  searchPlaceholder="Buscar..."
  searchFields={['firstName', 'lastName', 'dni']}
  actions={(item) => [
    { type: 'view', onClick: () => handleView(item.id) },
    { type: 'edit', onClick: () => handleEdit(item.id) },
    { type: 'delete', onClick: () => handleDelete(item.id) }
  ]}
/>
```

### 3. **Modal** (`components/modal.tsx`)
Modal flexible para formularios:

✓ Múltiples tamaños (sm, md, lg, xl)
✓ Encabezado con título y subtítulo
✓ Footer con botones personalizables
✓ Cierre al hacer click fuera (configurable)

```tsx
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Crear Beneficiario"
  size="lg"
  footer={
    <>
      <CancelButton onClick={() => setIsModalOpen(false)} />
      <SaveButton onClick={handleSave} />
    </>
  }
>
  {/* Contenido del formulario */}
</Modal>
```

## 🎯 Secciones Implementadas

### Gestión
- **Usuarios** (`/usuarios`) - CRUD completo con roles
- **Beneficiarios** (`/beneficiarios`) - Gestión de beneficiarios
- **Voluntarios** (`/voluntarios`) - Próximo
- **Especialidades** (`/especialidades`) - Próximo
- **Proyectos** (`/proyectos`) - Próximo

### Campañas
- **Campañas** (`/campanas`) - CRUD con presupuestos
- **Donantes** (`/donantes`) - Próximo
- **Donaciones** (`/donaciones`) - Próximo

### Inventario
- **Productos** (`/productos`) - Próximo
- **Inventario** (`/inventario`) - CRUD con alertas de stock
- **Movimientos** (`/movimientos`) - Próximo
- **Distribuciones** (`/distribuciones`) - Próximo

### Salud
- **Personal Médico** (`/personal-medico`) - Próximo
- **Atención Salud** (`/atencion-salud`) - Próximo
- **Ventas** (`/ventas`) - Próximo

## 📊 Estructura de Datos

Cada página CRUD sigue este patrón:

```tsx
export default function ModuloPage() {
  const [items, setItems] = useState<Tipo[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Tipo>>({})

  // Handlers
  const handleCreate = () => { /* ... */ }
  const handleEdit = (id: string) => { /* ... */ }
  const handleDelete = (id: string) => { /* ... */ }
  const handleSave = () => { /* ... */ }

  return (
    <div>
      <DataTable /* ... */ />
      <Modal /* ... */ />
    </div>
  )
}
```

## 🎨 Características Visuales

### Estadísticas por Sección
Cada módulo incluye tarjetas de estadísticas que muestran:
- Total de registros
- Registros activos/inactivos
- Métricas específicas (gastos, stock bajo, etc.)

### Estados Coloreados
- ✅ Activo: Green (Verde)
- ❌ Inactivo: Gray (Gris)
- ⚠️ Advertencia: Yellow/Orange (Amarillo/Naranja)
- 🔴 Crítico: Red (Rojo)

### Tablas
- Búsqueda en tiempo real
- Ordenamiento por columnas
- Acciones contextuales
- Indicadores de estado

## 🔧 Cómo Usar

### Crear una Nueva Sección CRUD

1. **Crear archivo de página**: `app/[modulo]/page.tsx`

2. **Definir interface de datos**:
```tsx
interface MiTipo {
  id: string
  nombre: string
  // ... otros campos
  status: "ACTIVE" | "INACTIVE"
}
```

3. **Definir columnas de tabla**:
```tsx
const columns: Column<MiTipo>[] = [
  { key: 'nombre', label: 'Nombre', sortable: true },
  { 
    key: 'status', 
    label: 'Estado',
    render: (value) => (
      <span className={value === 'ACTIVE' ? 'text-green-600' : 'text-gray-600'}>
        {value}
      </span>
    )
  }
]
```

4. **Implementar handlers CRUD**:
```tsx
const handleCreate = () => {
  setEditingId(null)
  setFormData({})
  setIsModalOpen(true)
}

const handleSave = () => {
  if (editingId) {
    setItems(items.map(i => 
      i.id === editingId ? { ...i, ...formData } : i
    ))
  } else {
    setItems([...items, { id: Date.now().toString(), ...formData }])
  }
  setIsModalOpen(false)
}
```

5. **Renderizar componentes**:
```tsx
<DataTable
  columns={columns}
  data={items}
  actions={(item) => [
    { type: 'view', onClick: () => handleEdit(item.id) },
    { type: 'edit', onClick: () => handleEdit(item.id) },
    { type: 'delete', onClick: () => handleDelete(item.id) }
  ]}
/>

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title={editingId ? 'Editar' : 'Crear'}
  footer={
    <>
      <CancelButton onClick={() => setIsModalOpen(false)} />
      <SaveButton onClick={handleSave} />
    </>
  }
>
  {/* Formulario */}
</Modal>
```

## 📋 Props Disponibles

### CreateButton Props
```typescript
{
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  tooltip?: string
}
```

### DataTable Props
```typescript
{
  columns: Column<T>[]
  data: T[]
  actions?: (item: T) => ActionButtonConfig[]
  onSearch?: (query: string) => void
  searchPlaceholder?: string
  title?: string
  subtitle?: string
  loading?: boolean
  emptyMessage?: string
  searchFields?: (keyof T)[]
}
```

### Modal Props
```typescript
{
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  footer?: React.ReactNode
  closeOnBackdropClick?: boolean
}
```

## 🎯 Próximos Pasos

1. **Completar las 11 secciones restantes** siguiendo el mismo patrón
2. **Integrar con API/Base de Datos** - Cambiar mock data por llamadas reales
3. **Añadir validaciones de formulario** - Implementar schemas Zod o similares
4. **Agregar confirmaciones de eliminación** - Modales de confirmación
5. **Exportación de datos** - Implementar descarga en CSV/Excel
6. **Importación de datos** - Cargar datos desde archivos
7. **Autenticación y autorización** - Integrar con sistema de auth
8. **Auditoría de cambios** - Registrar quién modificó qué y cuándo

## 🚀 Ejemplos Completos

### Secciones Completamente Implementadas

#### 1. Beneficiarios
- Tabla con filtrado por nombre, DNI, teléfono
- Estadísticas de nivel de vulnerabilidad
- Modal con 6 campos principales
- Estados ACTIVE/INACTIVE

#### 2. Usuarios
- Filtrado por usuario, nombre, email
- Estadísticas por rol (ADMIN, COORDINADOR, CONTADOR, VOLUNTARIO)
- Campos de autenticación
- Último acceso registrado

#### 3. Campañas
- Dominios SOCIAL y SALUD
- Presupuesto y gastos
- Estados de progreso
- Ubicación y fechas

#### 4. Inventario
- Categorías de productos
- Alertas de stock bajo/agotado
- Control de vencimiento
- Números de lote

## 📱 Responsive Design

Todos los componentes son **100% responsive**:
- ✓ Mobile (360px+)
- ✓ Tablet (768px+)
- ✓ Desktop (1024px+)
- ✓ Wide (1280px+)

## 🎯 Base de Datos Soportada

El sistema está diseñado para la siguiente estructura MongoDB:

```
usuarios, beneficiarios, voluntarios, especialidades, proyectos,
campanas, donantes, donaciones, productos, inventario,
movimientos_inventario, distribuciones, personal_medico,
atencion_salud, ventas
```

## 📝 Notas Importantes

- Todos los componentes usan **Tailwind CSS v4**
- Los iconos provienen de **lucide-react**
- Las búsquedas son **case-insensitive**
- Los datos actualmente son **mock data** (reemplazar con API)
- Los componentes son **completamente reutilizables**
- No hay dependencias externas pesadas

## 🔐 Seguridad

Recomendaciones de seguridad a implementar:

1. Validar datos en backend antes de guardar
2. Implementar Rate Limiting en endpoints
3. Usar prepared statements para queries
4. Implementar Row Level Security (RLS)
5. Encriptar datos sensibles
6. Auditar todos los cambios

## 📧 Soporte

Para dudas sobre la implementación CRUD, consultar:
- `/components/crud-buttons.tsx` - Botones individuales
- `/components/data-table.tsx` - Tabla genérica
- `/components/modal.tsx` - Modal reutilizable
- `/app/beneficiarios/page.tsx` - Ejemplo completo
- `/CRUD-SYSTEM.md` - Este archivo
