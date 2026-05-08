"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { ArrowLeftRight, Download, Upload } from "lucide-react"

interface Movimiento {
  id: string
  productName: string
  movementType: "ENTRADA" | "SALIDA" | "AJUSTE"
  movementReason: "DONACION" | "COMPRA" | "DISTRIBUCION" | "AJUSTE_INVENTARIO" | "VENCIMIENTO" | "DEVOLUCION"
  quantity: number
  unit: string
  movementDate: string
  status: "ACTIVO" | "ANULADO"
}

const mockMovimientos: Movimiento[] = [
  { id: "1", productName: "Arroz", movementType: "ENTRADA", movementReason: "DONACION", quantity: 500, unit: "KG", movementDate: "2024-01-20", status: "ACTIVO" },
  { id: "2", productName: "Abrigo", movementType: "SALIDA", movementReason: "DISTRIBUCION", quantity: 50, unit: "UNIDAD", movementDate: "2024-01-21", status: "ACTIVO" },
  { id: "3", productName: "Jabon", movementType: "ENTRADA", movementReason: "COMPRA", quantity: 200, unit: "UNIDAD", movementDate: "2024-01-22", status: "ACTIVO" },
]

export default function MovimientosPage() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>(mockMovimientos)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Movimiento>>({})

  const typeColors = {
    ENTRADA: "bg-green-100 text-green-700",
    SALIDA: "bg-red-100 text-red-700",
    AJUSTE: "bg-yellow-100 text-yellow-700",
  }

  const columns: Column<Movimiento>[] = [
    { key: "productName", label: "Producto", width: "20%" },
    { key: "movementType", label: "Tipo", width: "12%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${typeColors[value as keyof typeof typeColors]}`}>{value}</span> },
    { key: "movementReason", label: "Motivo", width: "18%" },
    { key: "quantity", label: "Cantidad", width: "12%" },
    { key: "unit", label: "Unidad", width: "10%" },
    { key: "movementDate", label: "Fecha", width: "15%" },
    { key: "status", label: "Estado", width: "13%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${value === "ACTIVO" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{value}</span> },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const movimiento = movimientos.find((m) => m.id === id)
    if (movimiento) {
      setEditingId(id)
      setFormData(movimiento)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    setMovimientos((prev) => prev.filter((m) => m.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setMovimientos((prev) => prev.map((m) => (m.id === editingId ? { ...m, ...formData } : m)))
    } else {
      setMovimientos((prev) => [...prev, { id: Date.now().toString(), ...formData as Movimiento }])
    }
    setIsModalOpen(false)
  }

  const entradas = movimientos.filter((m) => m.movementType === "ENTRADA").length
  const salidas = movimientos.filter((m) => m.movementType === "SALIDA").length
  const totalCantidad = movimientos.reduce((sum, m) => sum + m.quantity, 0)

  return (
    <PageLayout
      title="Movimientos"
      subtitle="Registro de entradas y salidas de inventario"
      breadcrumbs={[{ label: "Farmacia" }, { label: "Movimientos" }]}
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 rounded-xl">
            <ArrowLeftRight size={24} className="text-[#DC2626]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Movimientos de Inventario</h2>
            <p className="text-sm text-gray-500">{movimientos.length} movimientos registrados</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
            <Download size={18} />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
            <Upload size={18} />
            Importar
          </button>
          <CreateButton onClick={handleCreate} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Movimientos</p>
          <p className="text-2xl font-bold text-gray-900">{movimientos.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Entradas</p>
          <p className="text-2xl font-bold text-green-600">{entradas}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Salidas</p>
          <p className="text-2xl font-bold text-[#DC2626]">{salidas}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Cantidad</p>
          <p className="text-2xl font-bold text-blue-600">{totalCantidad}</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable<Movimiento>
        columns={columns}
        data={movimientos}
        title="Movimientos de Inventario"
        searchPlaceholder="Buscar por producto o motivo..."
        searchFields={["productName", "movementReason"]}
        actions={(item) => [
          { type: "edit", onClick: () => handleEdit(item.id), tooltip: "Editar" },
          { type: "delete", onClick: () => handleDelete(item.id), tooltip: "Eliminar" },
        ]}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Movimiento" : "Crear Nuevo Movimiento"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Producto" value={formData.productName || ""} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626] col-span-2" />
            <select value={formData.movementType || ""} onChange={(e) => setFormData({ ...formData, movementType: e.target.value as Movimiento["movementType"] })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]">
              <option value="">Tipo</option>
              <option value="ENTRADA">Entrada</option>
              <option value="SALIDA">Salida</option>
              <option value="AJUSTE">Ajuste</option>
            </select>
            <select value={formData.movementReason || ""} onChange={(e) => setFormData({ ...formData, movementReason: e.target.value as Movimiento["movementReason"] })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]">
              <option value="">Motivo</option>
              <option value="DONACION">Donacion</option>
              <option value="COMPRA">Compra</option>
              <option value="DISTRIBUCION">Distribucion</option>
              <option value="VENCIMIENTO">Vencimiento</option>
            </select>
            <input type="number" placeholder="Cantidad" value={formData.quantity || ""} onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="text" placeholder="Unidad" value={formData.unit || ""} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="date" placeholder="Fecha" value={formData.movementDate || ""} onChange={(e) => setFormData({ ...formData, movementDate: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
          </div>
        </div>
      </Modal>
    </PageLayout>
  )
}
