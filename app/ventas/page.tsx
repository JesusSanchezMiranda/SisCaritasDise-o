"use client"

import { useState } from "react"
import { AppLayout } from "../app-layout"
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
  { id: "1", saleNumber: "VENTA001", customerName: "Juan Pérez", productName: "Medicamento A", quantity: 2, unitPrice: 50, totalAmount: 100, saleDate: "2024-01-20", paymentMethod: "EFECTIVO", status: "COMPLETED" },
  { id: "2", saleNumber: "VENTA002", customerName: "María García", productName: "Medicamento B", quantity: 1, unitPrice: 75, totalAmount: 75, saleDate: "2024-01-21", paymentMethod: "TRANSFERENCIA", status: "COMPLETED" },
  { id: "3", saleNumber: "VENTA003", customerName: "Carlos López", productName: "Medicamento C", quantity: 3, unitPrice: 45, totalAmount: 135, saleDate: "2024-01-22", paymentMethod: "TARJETA", status: "PENDING" },
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
    { key: "saleNumber", label: "Número", width: "10%" },
    { key: "customerName", label: "Cliente", width: "15%" },
    { key: "productName", label: "Producto", width: "20%" },
    { key: "quantity", label: "Cantidad", width: "10%" },
    { key: "unitPrice", label: "Precio Unit.", width: "10%", render: (value) => `S/. ${value}` },
    { key: "totalAmount", label: "Total", width: "12%", render: (value) => `S/. ${value.toFixed(2)}` },
    { key: "saleDate", label: "Fecha", width: "12%" },
    { key: "status", label: "Estado", width: "11%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${statusColors[value as keyof typeof statusColors]}`}>{value}</span> },
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

  const content = (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-orange-100 rounded-xl">
              <ShoppingCart size={24} className="text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Ventas</h1>
          </div>
          <p className="text-sm text-gray-600">Gestiona ventas de medicamentos y terapias</p>
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
              <p className="text-sm text-gray-600 mb-1">Total Ventas</p>
              <p className="text-2xl font-bold text-gray-900">{ventas.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Completadas</p>
              <p className="text-2xl font-bold text-green-600">{completadas}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Monto Total</p>
              <p className="text-2xl font-bold text-green-600">S/. {totalVentas.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Productos Vendidos</p>
              <p className="text-2xl font-bold text-blue-600">{cantidadProductos}</p>
            </div>
          </div>

          <DataTable<Venta>
            columns={columns}
            data={ventas}
            title="Registro de Ventas"
            searchPlaceholder="Buscar por cliente, producto o número..."
            searchFields={["customerName", "productName", "saleNumber"]}
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
        title={editingId ? "Editar Venta" : "Crear Nueva Venta"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Número de venta" value={formData.saleNumber || ""} onChange={(e) => setFormData({ ...formData, saleNumber: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Cliente" value={formData.customerName || ""} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Producto" value={formData.productName || ""} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="number" placeholder="Cantidad" value={formData.quantity || ""} onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="number" placeholder="Precio Unitario" value={formData.unitPrice || ""} onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="number" placeholder="Monto Total" value={formData.totalAmount || ""} onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="date" placeholder="Fecha" value={formData.saleDate || ""} onChange={(e) => setFormData({ ...formData, saleDate: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <select value={formData.paymentMethod || ""} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Método de pago</option>
              <option value="EFECTIVO">Efectivo</option>
              <option value="TRANSFERENCIA">Transferencia</option>
              <option value="TARJETA">Tarjeta</option>
            </select>
            <select value={formData.status || ""} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Estado</option>
              <option value="COMPLETED">Completada</option>
              <option value="PENDING">Pendiente</option>
              <option value="CANCELLED">Cancelada</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )

  return <AppLayout>{content}</AppLayout>
}
