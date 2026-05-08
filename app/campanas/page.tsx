"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { Flag, Download, Upload } from "lucide-react"

interface Campana {
  id: string
  campaignName: string
  campaignNumber: string
  domain: "SOCIAL" | "SALUD"
  description: string
  location: string
  startDate: string
  endDate: string
  budget: number
  spent: number
  status: "DRAFT" | "ACTIVE" | "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "SUSPENDED"
  campaignType?: "SOLIDARIA" | "ALIMENTARIA" | "SALUD" | "EDUCACION"
  goal?: number
  current?: number
}

const mockCampanas: Campana[] = [
  {
    id: "1",
    campaignName: "Campana de Alimentos Marzo",
    campaignNumber: "CAM-2024-001",
    domain: "SOCIAL",
    description: "Recoleccion de alimentos para familias en situacion de pobreza",
    location: "San Isidro, Lima",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    budget: 50000,
    spent: 35000,
    status: "IN_PROGRESS",
    campaignType: "ALIMENTARIA",
    goal: 1000,
    current: 750,
  },
  {
    id: "2",
    campaignName: "Campana de Oftalmologia",
    campaignNumber: "CAM-2024-002",
    domain: "SALUD",
    description: "Jornada de atencion oftalmologica gratuita",
    location: "Centro de Salud Caritas",
    startDate: "2024-03-10",
    endDate: "2024-03-15",
    budget: 30000,
    spent: 28000,
    status: "COMPLETED",
    goal: 200,
    current: 185,
  },
]

export default function CampanasPage() {
  const [campanas, setCampanas] = useState<Campana[]>(mockCampanas)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Campana>>({})

  const columns: Column<Campana>[] = [
    { key: "campaignNumber", label: "Numero", sortable: true, width: "120px" },
    { key: "campaignName", label: "Nombre", sortable: true },
    {
      key: "domain",
      label: "Dominio",
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === "SOCIAL"
            ? "bg-emerald-100 text-emerald-800"
            : "bg-blue-100 text-blue-800"
        }`}>
          {value}
        </span>
      ),
    },
    { key: "location", label: "Ubicacion" },
    {
      key: "status",
      label: "Estado",
      render: (value) => {
        const statusColors: Record<string, string> = {
          "DRAFT": "bg-gray-100 text-gray-800",
          "ACTIVE": "bg-blue-100 text-blue-800",
          "PLANNED": "bg-yellow-100 text-yellow-800",
          "IN_PROGRESS": "bg-orange-100 text-orange-800",
          "COMPLETED": "bg-green-100 text-green-800",
          "SUSPENDED": "bg-red-100 text-red-800",
        }
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[value] || statusColors.DRAFT}`}>
            {value}
          </span>
        )
      },
    },
    {
      key: "budget",
      label: "Presupuesto",
      render: (value) => `S/. ${value.toLocaleString("es-PE")}`,
    },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({ domain: "SOCIAL" })
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const campana = campanas.find((c) => c.id === id)
    if (campana) {
      setEditingId(id)
      setFormData(campana)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Estas seguro de que deseas eliminar esta campana?")) {
      setCampanas(campanas.filter((c) => c.id !== id))
    }
  }

  const handleSave = () => {
    if (editingId) {
      setCampanas(
        campanas.map((c) =>
          c.id === editingId ? { ...c, ...(formData as Campana) } : c
        )
      )
    } else {
      const newCampana: Campana = {
        id: Date.now().toString(),
        campaignName: formData.campaignName || "",
        campaignNumber: formData.campaignNumber || "",
        domain: formData.domain || "SOCIAL",
        description: formData.description || "",
        location: formData.location || "",
        startDate: formData.startDate || "",
        endDate: formData.endDate || "",
        budget: formData.budget || 0,
        spent: formData.spent || 0,
        status: "DRAFT",
        campaignType: formData.campaignType || "SOLIDARIA",
      }
      setCampanas([...campanas, newCampana])
    }
    setIsModalOpen(false)
  }

  const totalBudget = campanas.reduce((sum, c) => sum + c.budget, 0)
  const totalSpent = campanas.reduce((sum, c) => sum + c.spent, 0)

  return (
    <PageLayout
      title="Campanas"
      subtitle="Gestiona campanas sociales y de salud"
      breadcrumbs={[{ label: "Social" }, { label: "Campanas" }]}
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 rounded-xl">
            <Flag size={24} className="text-[#DC2626]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Lista de Campanas</h2>
            <p className="text-sm text-gray-500">{campanas.length} campanas registradas</p>
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Campanas</p>
          <p className="text-2xl font-bold text-gray-900">{campanas.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">En Progreso</p>
          <p className="text-2xl font-bold text-orange-600">
            {campanas.filter((c) => c.status === "IN_PROGRESS").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Completadas</p>
          <p className="text-2xl font-bold text-green-600">
            {campanas.filter((c) => c.status === "COMPLETED").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Presupuesto Total</p>
          <p className="text-xl font-bold text-gray-900">S/. {totalBudget.toLocaleString("es-PE")}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Gastado</p>
          <p className="text-xl font-bold text-[#DC2626]">S/. {totalSpent.toLocaleString("es-PE")}</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable<Campana>
        columns={columns}
        data={campanas}
        title="Lista de Campanas"
        searchPlaceholder="Buscar por nombre, numero o ubicacion..."
        searchFields={["campaignName", "campaignNumber", "location"]}
        emptyMessage="No hay campanas registradas"
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Campana" : "Crear Nueva Campana"}
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
              placeholder="Nombre de Campana"
              value={formData.campaignName || ""}
              onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            />
            <input
              type="text"
              placeholder="Numero de Campana"
              value={formData.campaignNumber || ""}
              onChange={(e) => setFormData({ ...formData, campaignNumber: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            />
            <select
              value={formData.domain || ""}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value as Campana["domain"] })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            >
              <option value="">Seleccionar dominio</option>
              <option value="SOCIAL">Social</option>
              <option value="SALUD">Salud</option>
            </select>
            <input
              type="text"
              placeholder="Ubicacion"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            />
            <input
              type="date"
              placeholder="Fecha Inicio"
              value={formData.startDate || ""}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            />
            <input
              type="date"
              placeholder="Fecha Fin"
              value={formData.endDate || ""}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            />
            <input
              type="number"
              placeholder="Presupuesto"
              value={formData.budget || ""}
              onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            />
            <input
              type="number"
              placeholder="Gastado"
              value={formData.spent || ""}
              onChange={(e) => setFormData({ ...formData, spent: parseFloat(e.target.value) })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            />
          </div>
          <textarea
            placeholder="Descripcion"
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            rows={3}
          />
        </div>
      </Modal>
    </PageLayout>
  )
}
