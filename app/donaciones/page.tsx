"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { Gift, Download, Upload } from "lucide-react"

interface Donacion {
  id: string
  donationType: "MONETARIA" | "EN_ESPECIE" | "MIXTA"
  amount: number
  paymentMethod: "EFECTIVO" | "TRANSFERENCIA_BANCARIA" | "CHEQUE" | "YAPE" | "PLIN" | "TARJETA"
  donationDate: string
  status: "PENDING" | "RECEIVED" | "CANCELLED"
  donanteName: string
}

const mockDonaciones: Donacion[] = [
  { id: "1", donationType: "MONETARIA", amount: 1000, paymentMethod: "TRANSFERENCIA_BANCARIA", donationDate: "2024-01-15", status: "RECEIVED", donanteName: "Roberto Martinez" },
  { id: "2", donationType: "EN_ESPECIE", amount: 500, paymentMethod: "EFECTIVO", donationDate: "2024-01-20", status: "RECEIVED", donanteName: "Empresa ABC SAC" },
  { id: "3", donationType: "MONETARIA", amount: 2500, paymentMethod: "TRANSFERENCIA_BANCARIA", donationDate: "2024-01-25", status: "PENDING", donanteName: "Ana Garcia" },
]

export default function DonacionesPage() {
  const [donaciones, setDonaciones] = useState<Donacion[]>(mockDonaciones)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Donacion>>({})

  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-700",
    RECEIVED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  }

  const columns: Column<Donacion>[] = [
    { key: "donanteName", label: "Donante", width: "20%" },
    { key: "donationType", label: "Tipo", width: "15%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${value === "MONETARIA" ? "bg-green-100 text-green-700" : value === "EN_ESPECIE" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>{value}</span> },
    { key: "amount", label: "Monto", width: "15%", render: (value) => `S/. ${value.toLocaleString()}` },
    { key: "paymentMethod", label: "Metodo", width: "15%" },
    { key: "donationDate", label: "Fecha", width: "15%" },
    { key: "status", label: "Estado", width: "20%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${statusColors[value as keyof typeof statusColors]}`}>{value === "PENDING" ? "Pendiente" : value === "RECEIVED" ? "Recibida" : "Cancelada"}</span> },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const donacion = donaciones.find((d) => d.id === id)
    if (donacion) {
      setEditingId(id)
      setFormData(donacion)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    setDonaciones((prev) => prev.filter((d) => d.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setDonaciones((prev) => prev.map((d) => (d.id === editingId ? { ...d, ...formData } : d)))
    } else {
      setDonaciones((prev) => [...prev, { id: Date.now().toString(), ...formData as Donacion }])
    }
    setIsModalOpen(false)
  }

  const totalAmount = donaciones.reduce((sum, d) => sum + d.amount, 0)
  const monetarias = donaciones.filter((d) => d.donationType === "MONETARIA").length
  const received = donaciones.filter((d) => d.status === "RECEIVED").length

  return (
    <PageLayout
      title="Donaciones"
      subtitle="Gestiona donaciones monetarias y en especie"
      breadcrumbs={[{ label: "Social" }, { label: "Donaciones" }]}
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 rounded-xl">
            <Gift size={24} className="text-[#DC2626]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Lista de Donaciones</h2>
            <p className="text-sm text-gray-500">{donaciones.length} donaciones registradas</p>
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
          <p className="text-sm text-gray-600 mb-1">Total Donaciones</p>
          <p className="text-2xl font-bold text-gray-900">{donaciones.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Recibidas</p>
          <p className="text-2xl font-bold text-green-600">{received}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Monetarias</p>
          <p className="text-2xl font-bold text-blue-600">{monetarias}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Monto Total</p>
          <p className="text-2xl font-bold text-[#DC2626]">S/. {totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable<Donacion>
        columns={columns}
        data={donaciones}
        title="Lista de Donaciones"
        searchPlaceholder="Buscar por donante o tipo..."
        searchFields={["donanteName", "donationType"]}
        actions={(item) => [
          { type: "edit", onClick: () => handleEdit(item.id), tooltip: "Editar" },
          { type: "delete", onClick: () => handleDelete(item.id), tooltip: "Eliminar" },
        ]}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Donacion" : "Crear Nueva Donacion"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Donante" value={formData.donanteName || ""} onChange={(e) => setFormData({ ...formData, donanteName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626] col-span-2" />
            <select value={formData.donationType || ""} onChange={(e) => setFormData({ ...formData, donationType: e.target.value as Donacion["donationType"] })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]">
              <option value="">Tipo de donacion</option>
              <option value="MONETARIA">Monetaria</option>
              <option value="EN_ESPECIE">En Especie</option>
              <option value="MIXTA">Mixta</option>
            </select>
            <input type="number" placeholder="Monto" value={formData.amount || ""} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <select value={formData.paymentMethod || ""} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as Donacion["paymentMethod"] })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]">
              <option value="">Metodo de pago</option>
              <option value="EFECTIVO">Efectivo</option>
              <option value="TRANSFERENCIA_BANCARIA">Transferencia</option>
              <option value="TARJETA">Tarjeta</option>
              <option value="YAPE">Yape</option>
            </select>
            <input type="date" placeholder="Fecha" value={formData.donationDate || ""} onChange={(e) => setFormData({ ...formData, donationDate: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <select value={formData.status || ""} onChange={(e) => setFormData({ ...formData, status: e.target.value as Donacion["status"] })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]">
              <option value="">Estado</option>
              <option value="PENDING">Pendiente</option>
              <option value="RECEIVED">Recibida</option>
              <option value="CANCELLED">Cancelada</option>
            </select>
          </div>
        </div>
      </Modal>
    </PageLayout>
  )
}
