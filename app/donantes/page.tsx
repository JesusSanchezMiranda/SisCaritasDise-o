"use client"

import { useState } from "react"
import { AppLayout } from "../app-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { Gift, Download, Upload } from "lucide-react"

interface Donante {
  id: string
  donorType: "PERSONA" | "EMPRESA"
  firstName: string
  lastName: string
  email: string
  phone: string
  totalDonations: number
  totalAmount: number
  status: "ACTIVE" | "INACTIVE"
}

const mockDonantes: Donante[] = [
  { id: "1", donorType: "PERSONA", firstName: "Roberto", lastName: "Martínez", email: "roberto@email.com", phone: "987654321", totalDonations: 12, totalAmount: 5000, status: "ACTIVE" },
  { id: "2", donorType: "EMPRESA", firstName: "Empresa", lastName: "ABC SAC", email: "contact@empresa.com", phone: "987654322", totalDonations: 8, totalAmount: 15000, status: "ACTIVE" },
  { id: "3", donorType: "PERSONA", firstName: "Ana", lastName: "García", email: "ana@email.com", phone: "987654323", totalDonations: 5, totalAmount: 2000, status: "ACTIVE" },
]

export default function DonantesPage() {
  const [donantes, setDonantes] = useState<Donante[]>(mockDonantes)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Donante>>({})

  const columns: Column<Donante>[] = [
    { key: "donorType", label: "Tipo", width: "12%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${value === "PERSONA" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>{value}</span> },
    { key: "firstName", label: "Nombre", width: "20%" },
    { key: "lastName", label: "Apellido/Empresa", width: "20%" },
    { key: "email", label: "Email", width: "18%" },
    { key: "totalDonations", label: "Donaciones", width: "10%", render: (value) => `${value}` },
    { key: "totalAmount", label: "Monto Total", width: "14%", render: (value) => `S/. ${value.toLocaleString()}` },
    { key: "status", label: "Estado", width: "6%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${value === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{value}</span> },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const donante = donantes.find((d) => d.id === id)
    if (donante) {
      setEditingId(id)
      setFormData(donante)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    setDonantes((prev) => prev.filter((d) => d.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setDonantes((prev) => prev.map((d) => (d.id === editingId ? { ...d, ...formData } : d)))
    } else {
      setDonantes((prev) => [...prev, { id: Date.now().toString(), ...formData as Donante }])
    }
    setIsModalOpen(false)
  }

  const totalAmount = donantes.reduce((sum, d) => sum + d.totalAmount, 0)
  const totalDonadores = donantes.filter((d) => d.status === "ACTIVE").length
  const personas = donantes.filter((d) => d.donorType === "PERSONA").length

  const content = (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-rose-100 rounded-xl">
              <Gift size={24} className="text-rose-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Donantes</h1>
          </div>
          <p className="text-sm text-gray-600">Gestiona donantes y sus contribuciones</p>
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
              <p className="text-sm text-gray-600 mb-1">Total Donantes</p>
              <p className="text-2xl font-bold text-gray-900">{donantes.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Activos</p>
              <p className="text-2xl font-bold text-green-600">{totalDonadores}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Personas Naturales</p>
              <p className="text-2xl font-bold text-blue-600">{personas}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Monto Total</p>
              <p className="text-2xl font-bold text-green-600">S/. {totalAmount.toLocaleString()}</p>
            </div>
          </div>

          <DataTable<Donante>
            columns={columns}
            data={donantes}
            title="Lista de Donantes"
            searchPlaceholder="Buscar por nombre, email o teléfono..."
            searchFields={["firstName", "lastName", "email", "phone"]}
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
        title={editingId ? "Editar Donante" : "Crear Nuevo Donante"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <select value={formData.donorType || ""} onChange={(e) => setFormData({ ...formData, donorType: e.target.value as any })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 col-span-2">
              <option value="">Seleccionar tipo</option>
              <option value="PERSONA">Persona Natural</option>
              <option value="EMPRESA">Empresa</option>
            </select>
            <input type="text" placeholder="Nombre" value={formData.firstName || ""} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Apellido/Empresa" value={formData.lastName || ""} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="email" placeholder="Email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="tel" placeholder="Teléfono" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
        </div>
      </Modal>
    </div>
  )

  return <AppLayout>{content}</AppLayout>
}
