"use client"

import { useState } from "react"
import { AppLayout } from "../app-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { UserCheck, Download, Upload } from "lucide-react"

interface Voluntario {
  id: string
  dni: string
  firstName: string
  lastName: string
  phone: string
  email: string
  skills: string[]
  hoursWorked: number
  rating: number
  status: "ACTIVE" | "INACTIVE"
}

const mockVoluntarios: Voluntario[] = [
  { id: "1", dni: "12345678", firstName: "Juan", lastName: "Pérez", phone: "987654321", email: "juan@email.com", skills: ["Gestión", "Enseñanza"], hoursWorked: 120, rating: 4.5, status: "ACTIVE" },
  { id: "2", dni: "87654321", firstName: "María", lastName: "García", phone: "987654322", email: "maria@email.com", skills: ["Enfermería"], hoursWorked: 95, rating: 4.8, status: "ACTIVE" },
  { id: "3", dni: "11111111", firstName: "Carlos", lastName: "López", phone: "987654323", email: "carlos@email.com", skills: ["Mecánica"], hoursWorked: 60, rating: 4.0, status: "INACTIVE" },
]

export default function VoluntariosPage() {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>(mockVoluntarios)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Voluntario>>({})

  const columns: Column<Voluntario>[] = [
    { key: "dni", label: "DNI", width: "15%" },
    { key: "firstName", label: "Nombre", width: "20%" },
    { key: "lastName", label: "Apellido", width: "20%" },
    { key: "phone", label: "Teléfono", width: "15%" },
    { key: "hoursWorked", label: "Horas", width: "10%", render: (value) => `${value}h` },
    { key: "rating", label: "Calificación", width: "10%", render: (value) => `${value}/5` },
    {
      key: "status",
      label: "Estado",
      width: "10%",
      render: (value) => (
        <span className={`px-2 py-1 rounded text-sm ${value === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {value}
        </span>
      ),
    },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const voluntario = voluntarios.find((v) => v.id === id)
    if (voluntario) {
      setEditingId(id)
      setFormData(voluntario)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    setVoluntarios((prev) => prev.filter((v) => v.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setVoluntarios((prev) => prev.map((v) => (v.id === editingId ? { ...v, ...formData } : v)))
    } else {
      setVoluntarios((prev) => [...prev, { id: Date.now().toString(), ...formData as Voluntario }])
    }
    setIsModalOpen(false)
  }

  const content = (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-100 rounded-xl">
              <UserCheck size={24} className="text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Voluntarios</h1>
          </div>
          <p className="text-sm text-gray-600">Gestiona voluntarios y sus horas de trabajo</p>
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
              <p className="text-sm text-gray-600 mb-1">Total Voluntarios</p>
              <p className="text-2xl font-bold text-gray-900">{voluntarios.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Activos</p>
              <p className="text-2xl font-bold text-green-600">{voluntarios.filter((v) => v.status === "ACTIVE").length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Horas Totales</p>
              <p className="text-2xl font-bold text-blue-600">{voluntarios.reduce((sum, v) => sum + v.hoursWorked, 0)}h</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Calificación Promedio</p>
              <p className="text-2xl font-bold text-yellow-600">{(voluntarios.reduce((sum, v) => sum + v.rating, 0) / voluntarios.length).toFixed(1)}/5</p>
            </div>
          </div>

          <DataTable<Voluntario>
            columns={columns}
            data={voluntarios}
            title="Lista de Voluntarios"
            searchPlaceholder="Buscar por DNI, nombre o teléfono..."
            searchFields={["dni", "firstName", "lastName", "phone"]}
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
        title={editingId ? "Editar Voluntario" : "Crear Nuevo Voluntario"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="DNI" value={formData.dni || ""} onChange={(e) => setFormData({ ...formData, dni: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Nombre" value={formData.firstName || ""} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Apellido" value={formData.lastName || ""} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="tel" placeholder="Teléfono" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="email" placeholder="Email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="number" placeholder="Horas trabajadas" value={formData.hoursWorked || ""} onChange={(e) => setFormData({ ...formData, hoursWorked: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
        </div>
      </Modal>
    </div>
  )

  return <AppLayout>{content}</AppLayout>
}
