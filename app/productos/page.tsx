"use client"

import { useState } from "react"
import { AppLayout } from "../app-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { Box, Download, Upload } from "lucide-react"

interface Producto {
  id: string
  productCode: string
  productName: string
  category: "ALIMENTOS" | "ROPA_ABRIGO" | "HIGIENE" | "UTILES_ESCOLARES" | "MEDICAMENTOS" | "OTROS"
  unit: "KG" | "LITRO" | "UNIDAD" | "CAJA" | "BOLSA" | "PAQUETE"
  estimatedValue: number
  status: "ACTIVE" | "INACTIVE"
}

const mockProductos: Producto[] = [
  { id: "1", productCode: "PROD001", productName: "Arroz", category: "ALIMENTOS", unit: "KG", estimatedValue: 3.50, status: "ACTIVE" },
  { id: "2", productCode: "PROD002", productName: "Abrigo", category: "ROPA_ABRIGO", unit: "UNIDAD", estimatedValue: 45.00, status: "ACTIVE" },
  { id: "3", productCode: "PROD003", productName: "Jabón", category: "HIGIENE", unit: "UNIDAD", estimatedValue: 2.50, status: "ACTIVE" },
]

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>(mockProductos)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Producto>>({})

  const categoryColors = {
    ALIMENTOS: "bg-green-100 text-green-700",
    ROPA_ABRIGO: "bg-blue-100 text-blue-700",
    HIGIENE: "bg-cyan-100 text-cyan-700",
    UTILES_ESCOLARES: "bg-yellow-100 text-yellow-700",
    MEDICAMENTOS: "bg-red-100 text-red-700",
    OTROS: "bg-gray-100 text-gray-700",
  }

  const columns: Column<Producto>[] = [
    { key: "productCode", label: "Código", width: "12%" },
    { key: "productName", label: "Nombre", width: "25%" },
    { key: "category", label: "Categoría", width: "18%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${categoryColors[value as keyof typeof categoryColors]}`}>{value}</span> },
    { key: "unit", label: "Unidad", width: "12%" },
    { key: "estimatedValue", label: "Valor Estimado", width: "15%", render: (value) => `S/. ${value.toFixed(2)}` },
    { key: "status", label: "Estado", width: "18%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${value === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{value}</span> },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const producto = productos.find((p) => p.id === id)
    if (producto) {
      setEditingId(id)
      setFormData(producto)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    setProductos((prev) => prev.filter((p) => p.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setProductos((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...formData } : p)))
    } else {
      setProductos((prev) => [...prev, { id: Date.now().toString(), ...formData as Producto }])
    }
    setIsModalOpen(false)
  }

  const totalValue = productos.reduce((sum, p) => sum + p.estimatedValue, 0)
  const activos = productos.filter((p) => p.status === "ACTIVE").length

  const content = (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-lime-100 rounded-xl">
              <Box size={24} className="text-lime-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          </div>
          <p className="text-sm text-gray-600">Catálogo de bienes para inventario</p>
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
      </header>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Total Productos</p>
              <p className="text-2xl font-bold text-gray-900">{productos.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Activos</p>
              <p className="text-2xl font-bold text-green-600">{activos}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Valor Total</p>
              <p className="text-2xl font-bold text-blue-600">S/. {totalValue.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Categorías</p>
              <p className="text-2xl font-bold text-purple-600">6</p>
            </div>
          </div>

          <DataTable<Producto>
            columns={columns}
            data={productos}
            title="Catálogo de Productos"
            searchPlaceholder="Buscar por código o nombre..."
            searchFields={["productCode", "productName"]}
            actions={(item) => [
              { type: "edit", onClick: () => handleEdit(item.id), tooltip: "Editar" },
              { type: "delete", onClick: () => handleDelete(item.id), tooltip: "Eliminar" },
            ]}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Producto" : "Crear Nuevo Producto"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Código" value={formData.productCode || ""} onChange={(e) => setFormData({ ...formData, productCode: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Nombre" value={formData.productName || ""} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <select value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value as any })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Categoría</option>
              <option value="ALIMENTOS">Alimentos</option>
              <option value="ROPA_ABRIGO">Ropa/Abrigo</option>
              <option value="HIGIENE">Higiene</option>
              <option value="UTILES_ESCOLARES">Útiles Escolares</option>
              <option value="MEDICAMENTOS">Medicamentos</option>
              <option value="OTROS">Otros</option>
            </select>
            <select value={formData.unit || ""} onChange={(e) => setFormData({ ...formData, unit: e.target.value as any })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Unidad</option>
              <option value="KG">KG</option>
              <option value="LITRO">Litro</option>
              <option value="UNIDAD">Unidad</option>
              <option value="CAJA">Caja</option>
              <option value="BOLSA">Bolsa</option>
              <option value="PAQUETE">Paquete</option>
            </select>
            <input type="number" placeholder="Valor Estimado" value={formData.estimatedValue || ""} onChange={(e) => setFormData({ ...formData, estimatedValue: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <select value={formData.status || ""} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Estado</option>
              <option value="ACTIVE">Activo</option>
              <option value="INACTIVE">Inactivo</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )

  return <AppLayout>{content}</AppLayout>
}
