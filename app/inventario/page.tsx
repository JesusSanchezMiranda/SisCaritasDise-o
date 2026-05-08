"use client"

import { useState } from "react"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { Package, AlertTriangle, Download, Upload } from "lucide-react"

interface Inventario {
  id: string
  productCode: string
  productName: string
  productCategory: string
  quantity: number
  unit: string
  minStock: number
  maxStock: number
  averageCost: number
  totalValue: number
  expirationDate: string
  status: "AVAILABLE" | "LOW_STOCK" | "OUT_OF_STOCK" | "EXPIRED"
  batchNumber: string
}

const mockInventario: Inventario[] = [
  {
    id: "1",
    productCode: "PROD-001",
    productName: "Arroz Integral",
    productCategory: "ALIMENTOS",
    quantity: 150,
    unit: "KG",
    minStock: 50,
    maxStock: 500,
    averageCost: 3.5,
    totalValue: 525,
    expirationDate: "2024-12-31",
    status: "AVAILABLE",
    batchNumber: "LOTE-2024-001",
  },
  {
    id: "2",
    productCode: "PROD-002",
    productName: "Leche en Polvo",
    productCategory: "ALIMENTOS",
    quantity: 45,
    unit: "KG",
    minStock: 100,
    maxStock: 300,
    averageCost: 8.5,
    totalValue: 382.5,
    expirationDate: "2024-08-15",
    status: "LOW_STOCK",
    batchNumber: "LOTE-2024-002",
  },
  {
    id: "3",
    productCode: "PROD-003",
    productName: "Mascarillas Quirúrgicas",
    productCategory: "HIGIENE",
    quantity: 0,
    unit: "CAJA",
    minStock: 20,
    maxStock: 100,
    averageCost: 15.0,
    totalValue: 0,
    expirationDate: "2025-06-30",
    status: "OUT_OF_STOCK",
    batchNumber: "LOTE-2024-003",
  },
]

export default function InventarioPage() {
  const [inventario, setInventario] = useState<Inventario[]>(mockInventario)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Inventario>>({})

  const columns: Column<Inventario>[] = [
    { key: "productCode", label: "Código", sortable: true, width: "120px" },
    { key: "productName", label: "Producto", sortable: true },
    { key: "productCategory", label: "Categoría", sortable: true },
    {
      key: "quantity",
      label: "Cantidad",
      render: (value, item) => `${value} ${item.unit}`,
    },
    {
      key: "status",
      label: "Estado",
      render: (value) => {
        const statusColors: Record<string, string> = {
          "AVAILABLE": "bg-green-100 text-green-800",
          "LOW_STOCK": "bg-yellow-100 text-yellow-800",
          "OUT_OF_STOCK": "bg-red-100 text-red-800",
          "EXPIRED": "bg-gray-100 text-gray-800",
        }
        const labels: Record<string, string> = {
          "AVAILABLE": "Disponible",
          "LOW_STOCK": "Bajo Stock",
          "OUT_OF_STOCK": "Agotado",
          "EXPIRED": "Vencido",
        }
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[value]}`}>
            {labels[value]}
          </span>
        )
      },
    },
    {
      key: "totalValue",
      label: "Valor Total",
      render: (value) => `S/. ${value.toLocaleString("es-PE")}`,
    },
    {
      key: "expirationDate",
      label: "Vencimiento",
      render: (value) => new Date(value).toLocaleDateString("es-PE"),
    },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const item = inventario.find((i) => i.id === id)
    if (item) {
      setEditingId(id)
      setFormData(item)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setInventario(inventario.filter((i) => i.id !== id))
    }
  }

  const handleSave = () => {
    if (editingId) {
      setInventario(
        inventario.map((i) =>
          i.id === editingId ? { ...i, ...(formData as Inventario) } : i
        )
      )
    } else {
      const newItem: Inventario = {
        id: Date.now().toString(),
        productCode: formData.productCode || "",
        productName: formData.productName || "",
        productCategory: formData.productCategory || "ALIMENTOS",
        quantity: formData.quantity || 0,
        unit: formData.unit || "UNIDAD",
        minStock: formData.minStock || 0,
        maxStock: formData.maxStock || 0,
        averageCost: formData.averageCost || 0,
        totalValue: (formData.quantity || 0) * (formData.averageCost || 0),
        expirationDate: formData.expirationDate || "",
        status: "AVAILABLE",
        batchNumber: formData.batchNumber || "",
      }
      setInventario([...inventario, newItem])
    }
    setIsModalOpen(false)
  }

  const lowStockItems = inventario.filter((i) => i.status === "LOW_STOCK").length
  const outOfStockItems = inventario.filter((i) => i.status === "OUT_OF_STOCK").length
  const totalValue = inventario.reduce((sum, i) => sum + i.totalValue, 0)

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Package size={24} className="text-emerald-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Inventario</h1>
            </div>
            <p className="text-gray-600">Gestiona productos y stock del almacén</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
              <Download size={18} />
              Exportar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
              <Upload size={18} />
              Importar
            </button>
            <CreateButton onClick={handleCreate} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Productos</p>
            <p className="text-2xl font-bold text-gray-900">{inventario.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Disponibles</p>
            <p className="text-2xl font-bold text-green-600">
              {inventario.filter((i) => i.status === "AVAILABLE").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 relative">
            <p className="text-sm text-gray-600 mb-1">Bajo Stock</p>
            <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
            {lowStockItems > 0 && (
              <AlertTriangle size={16} className="absolute top-4 right-4 text-yellow-600" />
            )}
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 relative">
            <p className="text-sm text-gray-600 mb-1">Agotados</p>
            <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
            {outOfStockItems > 0 && (
              <AlertTriangle size={16} className="absolute top-4 right-4 text-red-600" />
            )}
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Valor Total</p>
            <p className="text-lg font-bold text-gray-900">S/. {totalValue.toLocaleString("es-PE")}</p>
          </div>
        </div>

        {/* Data Table */}
        <DataTable<Inventario>
          columns={columns}
          data={inventario}
          title="Lista de Inventario"
          searchPlaceholder="Buscar por código, producto o categoría..."
          searchFields={["productCode", "productName", "productCategory"]}
          emptyMessage="No hay productos en el inventario"
          actions={(item) => [
            {
              type: "view",
              onClick: () => handleEdit(item.id),
              tooltip: "Ver detalles",
            },
            {
              type: "edit",
              onClick: () => handleEdit(item.id),
              tooltip: "Editar",
            },
            {
              type: "delete",
              onClick: () => handleDelete(item.id),
              tooltip: "Eliminar",
            },
          ]}
        />
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Producto" : "Agregar Nuevo Producto"}
        size="lg"
        footer={
          <>
            <CancelButton onClick={() => setIsModalOpen(false)} />
            <SaveButton onClick={handleSave} />
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Código de Producto"
              value={formData.productCode || ""}
              onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Nombre de Producto"
              value={formData.productName || ""}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <select
              value={formData.productCategory || ""}
              onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Seleccionar categoría</option>
              <option value="ALIMENTOS">Alimentos</option>
              <option value="ROPA_ABRIGO">Ropa y Abrigo</option>
              <option value="HIGIENE">Higiene</option>
              <option value="UTILES_ESCOLARES">Útiles Escolares</option>
              <option value="MEDICAMENTOS">Medicamentos</option>
              <option value="OTROS">Otros</option>
            </select>
            <input
              type="number"
              placeholder="Cantidad"
              value={formData.quantity || ""}
              onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <select
              value={formData.unit || ""}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Unidad</option>
              <option value="KG">Kilogramos</option>
              <option value="LITRO">Litros</option>
              <option value="UNIDAD">Unidad</option>
              <option value="CAJA">Caja</option>
              <option value="BOLSA">Bolsa</option>
              <option value="PAQUETE">Paquete</option>
            </select>
            <input
              type="number"
              placeholder="Stock Mínimo"
              value={formData.minStock || ""}
              onChange={(e) => setFormData({ ...formData, minStock: parseFloat(e.target.value) })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Stock Máximo"
              value={formData.maxStock || ""}
              onChange={(e) => setFormData({ ...formData, maxStock: parseFloat(e.target.value) })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Costo Promedio"
              value={formData.averageCost || ""}
              onChange={(e) => setFormData({ ...formData, averageCost: parseFloat(e.target.value) })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="date"
              placeholder="Fecha de Vencimiento"
              value={formData.expirationDate || ""}
              onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Número de Lote"
              value={formData.batchNumber || ""}
              onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
