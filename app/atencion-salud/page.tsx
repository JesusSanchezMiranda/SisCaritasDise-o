"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { ClipboardPlus, Download, Upload } from "lucide-react"

interface AtencionSalud {
  id: string
  patientName: string
  patientDNI: string
  doctorName: string
  specialty: string
  serviceDate: string
  diagnosis: string
  status: "COMPLETED" | "PENDING" | "CANCELLED"
}

const mockAtenciones: AtencionSalud[] = [
  { id: "1", patientName: "Juan Perez", patientDNI: "12345678", doctorName: "Dr. Rodriguez", specialty: "Medicina General", serviceDate: "2024-01-20", diagnosis: "Hipertension", status: "COMPLETED" },
  { id: "2", patientName: "Maria Garcia", patientDNI: "87654321", doctorName: "Dra. Lopez", specialty: "Oftalmologia", serviceDate: "2024-01-21", diagnosis: "Miopia", status: "COMPLETED" },
  { id: "3", patientName: "Carlos Lopez", patientDNI: "11111111", doctorName: "Dr. Martinez", specialty: "Odontologia", serviceDate: "2024-01-22", diagnosis: "Caries", status: "PENDING" },
]

export default function AtencionSaludPage() {
  const [atenciones, setAtenciones] = useState<AtencionSalud[]>(mockAtenciones)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<AtencionSalud>>({})

  const statusColors = {
    COMPLETED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
  }

  const columns: Column<AtencionSalud>[] = [
    { key: "patientName", label: "Paciente", width: "15%" },
    { key: "patientDNI", label: "DNI", width: "12%" },
    { key: "doctorName", label: "Medico", width: "15%" },
    { key: "specialty", label: "Especialidad", width: "15%" },
    { key: "diagnosis", label: "Diagnostico", width: "18%" },
    { key: "serviceDate", label: "Fecha", width: "12%" },
    { key: "status", label: "Estado", width: "13%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${statusColors[value as keyof typeof statusColors]}`}>{value === "COMPLETED" ? "Completada" : value === "PENDING" ? "Pendiente" : "Cancelada"}</span> },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const atencion = atenciones.find((a) => a.id === id)
    if (atencion) {
      setEditingId(id)
      setFormData(atencion)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    setAtenciones((prev) => prev.filter((a) => a.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setAtenciones((prev) => prev.map((a) => (a.id === editingId ? { ...a, ...formData } : a)))
    } else {
      setAtenciones((prev) => [...prev, { id: Date.now().toString(), ...formData as AtencionSalud }])
    }
    setIsModalOpen(false)
  }

  const completadas = atenciones.filter((a) => a.status === "COMPLETED").length
  const pendientes = atenciones.filter((a) => a.status === "PENDING").length

  return (
    <PageLayout
      title="Atencion Medica"
      subtitle="Registro de atenciones medicas y consultas"
      breadcrumbs={[{ label: "Clinica" }, { label: "Atencion Medica" }]}
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 rounded-xl">
            <ClipboardPlus size={24} className="text-[#DC2626]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Registro de Atenciones</h2>
            <p className="text-sm text-gray-500">{atenciones.length} atenciones registradas</p>
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
          <p className="text-sm text-gray-600 mb-1">Total Atenciones</p>
          <p className="text-2xl font-bold text-gray-900">{atenciones.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Completadas</p>
          <p className="text-2xl font-bold text-green-600">{completadas}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-600">{pendientes}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Tasa de Cumplimiento</p>
          <p className="text-2xl font-bold text-[#DC2626]">{((completadas / atenciones.length) * 100).toFixed(0)}%</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable<AtencionSalud>
        columns={columns}
        data={atenciones}
        title="Registro de Atenciones"
        searchPlaceholder="Buscar por paciente, medico o diagnostico..."
        searchFields={["patientName", "doctorName", "diagnosis"]}
        actions={(item) => [
          { type: "edit", onClick: () => handleEdit(item.id), tooltip: "Editar" },
          { type: "delete", onClick: () => handleDelete(item.id), tooltip: "Eliminar" },
        ]}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Atencion" : "Crear Nueva Atencion"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Paciente" value={formData.patientName || ""} onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="text" placeholder="DNI" value={formData.patientDNI || ""} onChange={(e) => setFormData({ ...formData, patientDNI: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="text" placeholder="Medico" value={formData.doctorName || ""} onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="text" placeholder="Especialidad" value={formData.specialty || ""} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="text" placeholder="Diagnostico" value={formData.diagnosis || ""} onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626] col-span-2" />
            <input type="date" placeholder="Fecha" value={formData.serviceDate || ""} onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <select value={formData.status || ""} onChange={(e) => setFormData({ ...formData, status: e.target.value as AtencionSalud["status"] })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]">
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
