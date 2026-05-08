"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { ShoppingCart, Download, Upload } from "lucide-react"

interface Venta {
  id: string
  saleNumber: string
  customerName: string
  productName: string
  quantity: number
  unitPrice: number
  totalAmount: number
  saleDate: string
  paymentMethod: "EFECTIVO" | "TRANSFERENCIA" | "TARJETA"
  status: "COMPLETED" | "PENDING" | "CANCELLED"
}

const mockVentas: Venta[] = [
  { id: "1", saleNumber: "VENTA001", customerName: "Juan Perez", productName: "Medicamento A", quantity: 2, unitPrice: 50, totalAmount: 100, saleDate: "2024-01-20", paymentMethod: "EFECTIVO", status: "COMPLETED" },
  { id: "2", saleNumber: "VENTA002", customerName: "Maria Garcia", productName: "Medicamento B", quantity: 1, unitPrice: 75, totalAmount: 75, saleDate: "2024-01-21", paymentMethod: "TRANSFERENCIA", status: "COMPLETED" },
  { id: "3", saleNumber: "VENTA003", customerName: "Carlos Lopez", productName: "Medicamento C", quantity: 3, unitPrice: 45, totalAmount: 135, saleDate: "2024-01-22", paymentMethod: "TARJETA", status: "PENDING" },
]

export default function VentasPage() {
  const [ventas, setVentas] = useState<Venta[]>(mockVentas)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Venta>>({})

  const statusColors = {
    COMPLETED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
  }

  const columns: Column<Venta>[] = [
    { key: "saleNumber", label: "Numero", width: "10%" },
    { key: "customerName", label: "Cliente", width: "15%" },
    { key: "productName", label: "Producto", width: "20%" },
    { key: "quantity", label: "Cantidad", width: "10%" },
    { key: "unitPrice", label: "Precio Unit.", width: "10%", render: (value) => `S/. ${value}` },
    { key: "totalAmount", label: "Total", width: "12%", render: (value) => `S/. ${value.toFixed(2)}` },
    { key: "saleDate", label: "Fecha", width: "12%" },
    { key: "status", label: "Estado", width: "11%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${statusColors[value as keyof typeof statusColors]}`}>{value === "COMPLETED" ? "Completada" : value === "PENDING" ? "Pendiente" : "Cancelada"}</span> },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const venta = ventas.find((v) => v.id === id)
    if (venta) {
      setEditingId(id)
      setFormData(venta)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    setVentas((prev) => prev.filter((v) => v.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setVentas((prev) => prev.map((v) => (v.id === editingId ? { ...v, ...formData } : v)))
    } else {
      setVentas((prev) => [...prev, { id: Date.now().toString(), ...formData as Venta }])
    }
    setIsModalOpen(false)
  }

  const totalVentas = ventas.reduce((sum, v) => sum + v.totalAmount, 0)
  const completadas = ventas.filter((v) => v.status === "COMPLETED").length
  const cantidadProductos = ventas.reduce((sum, v) => sum + v.quantity, 0)

  return (
    <PageLayout
      title="Ventas Farmacia"
      subtitle="Gestiona ventas de medicamentos y productos"
      breadcrumbs={[{ label: "Farmacia" }, { label: "Ventas" }]}
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 rounded-xl">
            <ShoppingCart size={24} className="text-[#DC2626]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Registro de Ventas</h2>
            <p className="text-sm text-gray-500">{ventas.length} ventas registradas</p>
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
          <p className="text-sm text-gray-600 mb-1">Total Ventas</p>
          <p className="text-2xl font-bold text-gray-900">{ventas.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Completadas</p>
          <p className="text-2xl font-bold text-green-600">{completadas}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Monto Total</p>
          <p className="text-2xl font-bold text-[#DC2626]">S/. {totalVentas.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Productos Vendidos</p>
          <p className="text-2xl font-bold text-blue-600">{cantidadProductos}</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable<Venta>
        columns={columns}
        data={ventas}
        title="Registro de Ventas"
        searchPlaceholder="Buscar por cliente, producto o numero..."
        searchFields={["customerName", "productName", "saleNumber"]}
        actions={(item) => [
          { type: "edit", onClick: () => handleEdit(item.id), tooltip: "Editar" },
          { type: "delete", onClick: () => handleDelete(item.id), tooltip: "Eliminar" },
        ]}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Venta" : "Crear Nueva Venta"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Numero de venta" value={formData.saleNumber || ""} onChange={(e) => setFormData({ ...formData, saleNumber: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="text" placeholder="Cliente" value={formData.customerName || ""} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="text" placeholder="Producto" value={formData.productName || ""} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="number" placeholder="Cantidad" value={formData.quantity || ""} onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="number" placeholder="Precio Unitario" value={formData.unitPrice || ""} onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="number" placeholder="Monto Total" value={formData.totalAmount || ""} onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="date" placeholder="Fecha" value={formData.saleDate || ""} onChange={(e) => setFormData({ ...formData, saleDate: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <select value={formData.paymentMethod || ""} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as Venta["paymentMethod"] })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]">
              <option value="">Metodo de pago</option>
              <option value="EFECTIVO">Efectivo</option>
              <option value="TRANSFERENCIA">Transferencia</option>
              <option value="TARJETA">Tarjeta</option>
            </select>
            <select value={formData.status || ""} onChange={(e) => setFormData({ ...formData, status: e.target.value as Venta["status"] })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]">
              <option value="">Estado</option>
              <option value="COMPLETED">Completada</option>
              <option value="PENDING">Pendiente</option>
              <option value="CANCELLED">Cancelada</option>
            </select>
          </div>
        </div>
      </Modal>
    </PageLayout>
  )
}
