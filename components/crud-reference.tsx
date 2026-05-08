"use client"

/**
 * SISTEMA DE COMPONENTES CRUD PARA SISCARITAS
 * 
 * Este archivo documenta cómo usar los componentes CRUD reutilizables
 * creados para el sistema de gestión SisCaritas.
 * 
 * ESTRUCTURA:
 * - crud-buttons.tsx: Botones individuales para acciones CRUD
 * - data-table.tsx: Tabla genérica con búsqueda, ordenamiento y acciones
 * - modal.tsx: Modal reutilizable para formularios
 * 
 * COMPONENTES DISPONIBLES:
 */

export const CRUDReference = {
  // ============================================================================
  // 1. BOTONES CRUD INDIVIDUALES (crud-buttons.tsx)
  // ============================================================================
  
  buttonComponents: {
    CreateButton: {
      uso: "Crear nuevo registro",
      color: "Emerald (Verde)",
      icono: "Plus",
      props: {
        onClick: "() => void - Manejador de clic",
        disabled: "boolean - Desabilitar botón",
        loading: "boolean - Estado de carga",
        className: "string - Clases Tailwind adicionales",
        tooltip: "string - Texto de ayuda"
      }
    },
    
    ViewButton: {
      uso: "Ver detalles de un registro",
      color: "Blue (Azul)",
      icono: "Eye",
      props: {
        onClick: "() => void",
        disabled: "boolean",
        tooltip: "string"
      }
    },
    
    EditButton: {
      uso: "Editar un registro existente",
      color: "Amber (Ámbar)",
      icono: "Edit2",
      props: {
        onClick: "() => void",
        disabled: "boolean",
        tooltip: "string"
      }
    },
    
    DeleteButton: {
      uso: "Eliminar un registro",
      color: "Red (Rojo)",
      icono: "Trash2",
      props: {
        onClick: "() => void",
        disabled: "boolean",
        tooltip: "string"
      }
    },
    
    DuplicateButton: {
      uso: "Duplicar un registro",
      color: "Purple (Púrpura)",
      icono: "Copy",
      props: {
        onClick: "() => void",
        tooltip: "string"
      }
    },
    
    ExportButton: {
      uso: "Exportar/Descargar datos",
      color: "Indigo",
      icono: "Download",
      props: {
        onClick: "() => void",
        tooltip: "string"
      }
    },
    
    ImportButton: {
      uso: "Importar/Cargar datos",
      color: "Teal (Verde azulado)",
      icono: "Upload",
      props: {
        onClick: "() => void",
        tooltip: "string"
      }
    },
    
    SaveButton: {
      uso: "Guardar cambios en formularios",
      color: "Blue (Azul)",
      icono: "Save",
      props: {
        onClick: "() => void",
        loading: "boolean",
        tooltip: "string"
      }
    },
    
    CancelButton: {
      uso: "Cancelar/Cerrar",
      color: "Gray (Gris)",
      icono: "X",
      props: {
        onClick: "() => void",
        tooltip: "string"
      }
    },
    
    ConfirmButton: {
      uso: "Confirmar acción",
      color: "Green (Verde)",
      icono: "Check",
      props: {
        onClick: "() => void",
        loading: "boolean",
        tooltip: "string"
      }
    }
  },

  // ============================================================================
  // 2. TABLA DE DATOS GENÉRICA (data-table.tsx)
  // ============================================================================
  
  dataTable: {
    descripcion: "Componente tabla reutilizable con búsqueda, ordenamiento y acciones integradas",
    features: [
      "Búsqueda en tiempo real",
      "Ordenamiento ascendente/descendente",
      "Acciones personalizadas por fila",
      "Renderizado personalizado de columnas",
      "Contador de registros",
      "Estado de carga"
    ],
    props: {
      columns: "Column<T>[] - Definición de columnas",
      data: "T[] - Datos a mostrar",
      actions: "(item: T) => ActionButtonConfig[] - Acciones por fila",
      onSearch: "(query: string) => void - Callback de búsqueda",
      searchPlaceholder: "string - Placeholder del input",
      title: "string - Título de la tabla",
      searchFields: "(keyof T)[] - Campos para búsqueda"
    },
    ejemplo: `
    const columns: Column<Beneficiario>[] = [
      { key: 'dni', label: 'DNI', sortable: true },
      { key: 'firstName', label: 'Nombre', sortable: true },
      {
        key: 'status',
        label: 'Estado',
        render: (value) => (
          <span className={value === 'ACTIVE' ? 'text-green-600' : 'text-gray-600'}>
            {value}
          </span>
        )
      }
    ];

    <DataTable
      columns={columns}
      data={beneficiarios}
      title="Beneficiarios"
      searchPlaceholder="Buscar..."
      searchFields={['firstName', 'lastName', 'dni']}
      actions={(item) => [
        {
          type: 'view',
          onClick: () => handleView(item.id),
          tooltip: 'Ver detalles'
        },
        {
          type: 'edit',
          onClick: () => handleEdit(item.id),
          tooltip: 'Editar'
        },
        {
          type: 'delete',
          onClick: () => handleDelete(item.id),
          tooltip: 'Eliminar'
        }
      ]}
    />
    `
  },

  // ============================================================================
  // 3. MODAL REUTILIZABLE (modal.tsx)
  // ============================================================================
  
  modal: {
    descripcion: "Modal con encabezado, contenido y footer",
    props: {
      isOpen: "boolean - Mostrar/ocultar modal",
      onClose: "() => void - Cerrar modal",
      title: "string - Título del modal",
      subtitle: "string - Subtítulo opcional",
      children: "React.ReactNode - Contenido",
      size: "'sm' | 'md' | 'lg' | 'xl' - Tamaño del modal",
      footer: "React.ReactNode - Footer con botones",
      closeOnBackdropClick: "boolean - Cerrar al hacer click fuera"
    },
    ejemplo: `
    const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={formData.firstName || ''}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg"
        />
      </div>
    </Modal>
    `
  },

  // ============================================================================
  // 4. PATRONES DE IMPLEMENTACIÓN
  // ============================================================================
  
  patrones: {
    listaConCRUD: `
    // Estructura básica de una página con CRUD
    
    export default function MiPagina() {
      const [items, setItems] = useState<MiTipo[]>([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editingId, setEditingId] = useState<string | null>(null);
      const [formData, setFormData] = useState<Partial<MiTipo>>({});

      const handleCreate = () => {
        setEditingId(null);
        setFormData({});
        setIsModalOpen(true);
      };

      const handleEdit = (id: string) => {
        const item = items.find(i => i.id === id);
        if (item) {
          setEditingId(id);
          setFormData(item);
          setIsModalOpen(true);
        }
      };

      const handleDelete = (id: string) => {
        if (confirm('¿Estás seguro?')) {
          setItems(items.filter(i => i.id !== id));
        }
      };

      const handleSave = () => {
        if (editingId) {
          setItems(items.map(i => 
            i.id === editingId ? { ...i, ...formData } : i
          ));
        } else {
          setItems([...items, { id: Date.now().toString(), ...formData }]);
        }
        setIsModalOpen(false);
      };

      return (
        <div>
          <CreateButton onClick={handleCreate} />
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
            footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
          >
            {/* Formulario */}
          </Modal>
        </div>
      );
    }
    `,

    columnasPersonalizadas: `
    // Renderizar columnas personalizadas
    
    const columns: Column<MiTipo>[] = [
      { key: 'nombre', label: 'Nombre', sortable: true },
      
      // Columna con colores según estado
      {
        key: 'status',
        label: 'Estado',
        render: (value) => (
          <span className={value === 'ACTIVE' ? 'text-green-600' : 'text-gray-600'}>
            {value}
          </span>
        )
      },
      
      // Columna con formato monetario
      {
        key: 'monto',
        label: 'Monto',
        render: (value) => 'S/. ' + value.toLocaleString('es-PE')
      },
      
      // Columna con fecha formateada
      {
        key: 'fecha',
        label: 'Fecha',
        render: (value) => new Date(value).toLocaleDateString('es-PE')
      }
    ];
    `
  },

  // ============================================================================
  // 5. COLECCIONES SOPORTADAS DEL CONFIG.YAML
  // ============================================================================
  
  colecciones: [
    { nombre: 'USUARIOS', icono: 'Users', ruta: '/usuarios' },
    { nombre: 'BENEFICIARIOS', icono: 'Heart', ruta: '/beneficiarios' },
    { nombre: 'VOLUNTARIOS', icono: 'UserCheck', ruta: '/voluntarios' },
    { nombre: 'ESPECIALIDADES', icono: 'Briefcase', ruta: '/especialidades' },
    { nombre: 'PROYECTOS', icono: 'FolderOpen', ruta: '/proyectos' },
    { nombre: 'CAMPANAS', icono: 'Flag', ruta: '/campanas' },
    { nombre: 'DONANTES', icono: 'Gift', ruta: '/donantes' },
    { nombre: 'DONACIONES', icono: 'CreditCard', ruta: '/donaciones' },
    { nombre: 'PRODUCTOS', icono: 'Package', ruta: '/productos' },
    { nombre: 'INVENTARIO', icono: 'Warehouse', ruta: '/inventario' },
    { nombre: 'MOVIMIENTOS_INVENTARIO', icono: 'TrendingUp', ruta: '/movimientos' },
    { nombre: 'DISTRIBUCIONES', icono: 'Truck', ruta: '/distribuciones' },
    { nombre: 'PERSONAL_MEDICO', icono: 'Stethoscope', ruta: '/personal-medico' },
    { nombre: 'ATENCION_SALUD', icono: 'Pill', ruta: '/atencion-salud' },
    { nombre: 'VENTAS', icono: 'ShoppingCart', ruta: '/ventas' }
  ]
}

export default function CRUDReferenceComponent() {
  return (
    <div className="w-full bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema CRUD - Guía de Referencia</h1>
        <p className="text-gray-600 mb-6">Documentación completa de componentes reutilizables para SisCaritas</p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Componentes Principales</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✓ <strong>CRUD Buttons</strong> - 10+ botones especializados para acciones</li>
              <li>✓ <strong>Data Table</strong> - Tabla completa con búsqueda y ordenamiento</li>
              <li>✓ <strong>Modal</strong> - Modal reutilizable para formularios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Colecciones Disponibles</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CRUDReference.colecciones.map((col) => (
                <div key={col.nombre} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-medium text-gray-900">{col.nombre}</p>
                  <p className="text-xs text-gray-500">{col.ruta}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">💡 Próximas Secciones</h3>
            <p className="text-sm text-blue-800">
              Las páginas para Voluntarios, Especialidades, Proyectos, Donantes, Donaciones, Productos y Movimientos 
              de Inventario seguirán el mismo patrón que las ya creadas (Beneficiarios, Usuarios, Campañas e Inventario).
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
