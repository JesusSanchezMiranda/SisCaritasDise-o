"use client"

import { useState } from "react"
import { AppLayout } from "../app-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { FolderOpen, Download, Upload } from "lucide-react"

interface Proyecto {
  id: string
  projectName: string
  description: string
  startDate: string
  endDate: string
  budget: number
  spent: number
  status: "PLANNING" | "IN_PROGRESS" | "COMPLETED" | "SUSPENDED" | "CANCELLED"
}

const mockProyectos: Proyecto[] = [
  { id: "1", projectName: "Escuela Rural", description: "Construcción escuela en zona rural", startDate: "2024-01-01", endDate: "2024-12-31", budget: 150000, spent: 89000, status: "IN_PROGRESS" },
  { id: "2", projectName: "Clínica Móvil", description: "Atención médica itinerante", startDate: "2024-02-01", endDate: "2024-06-30", budget: 80000, spent: 45000, status: "IN_PROGRESS" },
  { id: "3", projectName: "Comedor Comunitario", description: "Alimentación para comunidades vulnerables", startDate: "2024-03-01", endDate: "2024-12-31", budget: 120000, spent: 0, status: "PLANNING" },
]

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>(mockProyectos)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Proyecto>>({})

  const statusColors = {
    PLANNING: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-green-100 text-green-700",
    SUSPENDED: "bg-orange-100 text-orange-700",
    CANCELLED: "bg-red-100 text-red-700",
  }

  const columns: Column<Proyecto>[] = [
    { key: "projectName", label: "Proyecto", width: "25%" },
    { key: "description", label: "Descripción", width: "25%" },
    { key: "startDate", label: "Inicio", width: "12%" },
    { key: "budget", label: "Presupuesto", width: "12%", render: (value) => `S/. ${value.toLocaleString()}` },
    { key: "spent", label: "Gastado", width: "12%", render: (value) => `S/. ${value.toLocaleString()}` },
    { key: "status", label: "Estado", width: "14%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${statusColors[value as keyof typeof statusColors]}`}>{value}</span> },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const proyecto = proyectos.find((p) => p.id === id)
    if (proyecto) {
      setEditingId(id)
      setFormData(proyecto)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    setProyectos((prev) => prev.filter((p) => p.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setProyectos((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...formData } : p)))
    } else {
      setProyectos((prev) => [...prev, { id: Date.now().toString(), ...formData as Proyecto }])
    }
    setIsModalOpen(false)
  }

  const totalBudget = proyectos.reduce((sum, p) => sum + p.budget, 0)
  const totalSpent = proyectos.reduce((sum, p) => sum + p.spent, 0)
  const inProgress = proyectos.filter((p) => p.status === "IN_PROGRESS").length

  const content = (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-teal-100 rounded-xl">
              <FolderOpen size={24} className="text-teal-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
          </div>
          <p className="text-sm text-gray-600">Gestiona proyectos sociales y de desarrollo</p>
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
              <p className="text-sm text-gray-600 mb-1">Total Proyectos</p>
              <p className="text-2xl font-bold text-gray-900">{proyectos.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">En Progreso</p>
              <p className="text-2xl font-bold text-yellow-600">{inProgress}</p>
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

          <DataTable<Proyecto>
            columns={columns}
            data={proyectos}
            title="Lista de Proyectos"
            searchPlaceholder="Buscar por nombre o descripción..."
            searchFields={["projectName", "description"]}
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
        title={editingId ? "Editar Proyecto" : "Crear Nuevo Proyecto"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre" value={formData.projectName || ""} onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 col-span-2" />
            <input type="text" placeholder="Descripción" value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 col-span-2" />
            <input type="date" placeholder="Inicio" value={formData.startDate || ""} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="date" placeholder="Fin" value={formData.endDate || ""} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="number" placeholder="Presupuesto" value={formData.budget || ""} onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <select value={formData.status || ""} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Seleccionar estado</option>
              <option value="PLANNING">Planificación</option>
              <option value="IN_PROGRESS">En Progreso</option>
              <option value="COMPLETED">Completado</option>
              <option value="SUSPENDED">Suspendido</option>
              <option value="CANCELLED">Cancelado</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )

  return <AppLayout>{content}</AppLayout>
}
