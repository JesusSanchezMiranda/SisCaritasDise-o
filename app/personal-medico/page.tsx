"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { Stethoscope, Download, Upload } from "lucide-react"

interface PersonalMedico {
  id: string
  firstName: string
  lastName: string
  specialty: string
  license: string
  phone: string
  email: string
  experience: number
  status: "ACTIVE" | "INACTIVE"
}

const mockPersonalMedico: PersonalMedico[] = [
  { id: "1", firstName: "Dr. Juan", lastName: "Rodriguez", specialty: "Medicina General", license: "MED001", phone: "987654321", email: "juan@medical.com", experience: 10, status: "ACTIVE" },
  { id: "2", firstName: "Dra. Maria", lastName: "Lopez", specialty: "Oftalmologia", license: "MED002", phone: "987654322", email: "maria@medical.com", experience: 8, status: "ACTIVE" },
  { id: "3", firstName: "Dr. Carlos", lastName: "Martinez", specialty: "Odontologia", license: "MED003", phone: "987654323", email: "carlos@medical.com", experience: 12, status: "ACTIVE" },
]

export default function PersonalMedicoPage() {
  const [personal, setPersonal] = useState<PersonalMedico[]>(mockPersonalMedico)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<PersonalMedico>>({})

  const columns: Column<PersonalMedico>[] = [
    { key: "firstName", label: "Nombre", width: "15%" },
    { key: "lastName", label: "Apellido", width: "15%" },
    { key: "specialty", label: "Especialidad", width: "20%" },
    { key: "license", label: "Licencia", width: "12%" },
    { key: "experience", label: "Experiencia", width: "10%", render: (value) => `${value} anos` },
    { key: "phone", label: "Telefono", width: "12%" },
    { key: "status", label: "Estado", width: "16%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${value === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{value === "ACTIVE" ? "Activo" : "Inactivo"}</span> },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const medico = personal.find((p) => p.id === id)
    if (medico) {
      setEditingId(id)
      setFormData(medico)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    setPersonal((prev) => prev.filter((p) => p.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setPersonal((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...formData } : p)))
    } else {
      setPersonal((prev) => [...prev, { id: Date.now().toString(), ...formData as PersonalMedico }])
    }
    setIsModalOpen(false)
  }

  const activos = personal.filter((p) => p.status === "ACTIVE").length
  const experienciaPromedio = (personal.reduce((sum, p) => sum + p.experience, 0) / personal.length).toFixed(1)

  return (
    <PageLayout
      title="Personal Medico"
      subtitle="Gestiona medicos y especialistas"
      breadcrumbs={[{ label: "Personas" }, { label: "Personal Medico" }]}
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 rounded-xl">
            <Stethoscope size={24} className="text-[#DC2626]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Equipo Medico</h2>
            <p className="text-sm text-gray-500">{personal.length} profesionales registrados</p>
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
          <p className="text-sm text-gray-600 mb-1">Total Personal</p>
          <p className="text-2xl font-bold text-gray-900">{personal.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Activos</p>
          <p className="text-2xl font-bold text-green-600">{activos}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Experiencia Promedio</p>
          <p className="text-2xl font-bold text-blue-600">{experienciaPromedio} anos</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Especialidades</p>
          <p className="text-2xl font-bold text-[#DC2626]">{new Set(personal.map((p) => p.specialty)).size}</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable<PersonalMedico>
        columns={columns}
        data={personal}
        title="Equipo Medico"
        searchPlaceholder="Buscar por nombre, especialidad o licencia..."
        searchFields={["firstName", "lastName", "specialty", "license"]}
        actions={(item) => [
          { type: "edit", onClick: () => handleEdit(item.id), tooltip: "Editar" },
          { type: "delete", onClick: () => handleDelete(item.id), tooltip: "Eliminar" },
        ]}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Personal Medico" : "Crear Nuevo Personal Medico"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre" value={formData.firstName || ""} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="text" placeholder="Apellido" value={formData.lastName || ""} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="text" placeholder="Especialidad" value={formData.specialty || ""} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="text" placeholder="Numero de Licencia" value={formData.license || ""} onChange={(e) => setFormData({ ...formData, license: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="tel" placeholder="Telefono" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="email" placeholder="Email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="number" placeholder="Anos de experiencia" value={formData.experience || ""} onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <select value={formData.status || ""} onChange={(e) => setFormData({ ...formData, status: e.target.value as PersonalMedico["status"] })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]">
              <option value="">Estado</option>
              <option value="ACTIVE">Activo</option>
              <option value="INACTIVE">Inactivo</option>
            </select>
          </div>
        </div>
      </Modal>
    </PageLayout>
  )
}
