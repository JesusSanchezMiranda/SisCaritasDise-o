"use client"

import { useState } from "react"
import { AppLayout } from "../app-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { Briefcase, Download, Upload } from "lucide-react"

interface Especialidad {
  id: string
  specialtyCode: string
  specialtyName: string
  description: string
  type: "SOCIAL" | "CLINICA"
  budget: number
  spent: number
  status: "ACTIVE" | "INACTIVE"
}

const mockEspecialidades: Especialidad[] = [
  { id: "1", specialtyCode: "ESP001", specialtyName: "Educación", description: "Programas educativos", type: "SOCIAL", budget: 50000, spent: 32000, status: "ACTIVE" },
  { id: "2", specialtyCode: "ESP002", specialtyName: "Salud Comunitaria", description: "Atención médica general", type: "CLINICA", budget: 80000, spent: 65000, status: "ACTIVE" },
  { id: "3", specialtyCode: "ESP003", specialtyName: "Alimentación", description: "Programas alimentarios", type: "SOCIAL", budget: 100000, spent: 89000, status: "ACTIVE" },
]

export default function EspecialidadesPage() {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>(mockEspecialidades)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Especialidad>>({})

  const columns: Column<Especialidad>[] = [
    { key: "specialtyCode", label: "Código", width: "12%" },
    { key: "specialtyName", label: "Nombre", width: "25%" },
    { key: "description", label: "Descripción", width: "25%" },
    { key: "type", label: "Tipo", width: "15%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${value === "SOCIAL" ? "bg-purple-100 text-purple-700" : "bg-cyan-100 text-cyan-700"}`}>{value}</span> },
    { key: "budget", label: "Presupuesto", width: "12%", render: (value) => `S/. ${value.toLocaleString()}` },
    { key: "status", label: "Estado", width: "11%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${value === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{value}</span> },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const especialidad = especialidades.find((e) => e.id === id)
    if (especialidad) {
      setEditingId(id)
      setFormData(especialidad)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    setEspecialidades((prev) => prev.filter((e) => e.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setEspecialidades((prev) => prev.map((e) => (e.id === editingId ? { ...e, ...formData } : e)))
    } else {
      setEspecialidades((prev) => [...prev, { id: Date.now().toString(), ...formData as Especialidad }])
    }
    setIsModalOpen(false)
  }

  const totalBudget = especialidades.reduce((sum, e) => sum + e.budget, 0)
  const totalSpent = especialidades.reduce((sum, e) => sum + e.spent, 0)

  const content = (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Briefcase size={24} className="text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Especialidades</h1>
          </div>
          <p className="text-sm text-gray-600">Gestiona especialidades sociales y clínicas</p>
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
              <p className="text-sm text-gray-600 mb-1">Total Especialidades</p>
              <p className="text-2xl font-bold text-gray-900">{especialidades.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Sociales</p>
              <p className="text-2xl font-bold text-purple-600">{especialidades.filter((e) => e.type === "SOCIAL").length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Presupuesto Total</p>
              <p className="text-2xl font-bold text-blue-600">S/. {totalBudget.toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Gastado</p>
              <p className="text-2xl font-bold text-orange-600">S/. {totalSpent.toLocaleString()}</p>
            </div>
          </div>

          <DataTable<Especialidad>
            columns={columns}
            data={especialidades}
            title="Lista de Especialidades"
            searchPlaceholder="Buscar por código o nombre..."
            searchFields={["specialtyCode", "specialtyName"]}
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
        title={editingId ? "Editar Especialidad" : "Crear Nueva Especialidad"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Código" value={formData.specialtyCode || ""} onChange={(e) => setFormData({ ...formData, specialtyCode: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Nombre" value={formData.specialtyName || ""} onChange={(e) => setFormData({ ...formData, specialtyName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Descripción" value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <select value={formData.type || ""} onChange={(e) => setFormData({ ...formData, type: e.target.value as any })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Seleccionar tipo</option>
              <option value="SOCIAL">Social</option>
              <option value="CLINICA">Clínica</option>
            </select>
            <input type="number" placeholder="Presupuesto" value={formData.budget || ""} onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <select value={formData.status || ""} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Seleccionar estado</option>
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
