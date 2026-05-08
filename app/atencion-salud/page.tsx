"use client"

import { useState } from "react"
import { AppLayout } from "../app-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { Activity, Download, Upload } from "lucide-react"

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
  { id: "1", patientName: "Juan Pérez", patientDNI: "12345678", doctorName: "Dr. Rodríguez", specialty: "Medicina General", serviceDate: "2024-01-20", diagnosis: "Hipertensión", status: "COMPLETED" },
  { id: "2", patientName: "María García", patientDNI: "87654321", doctorName: "Dra. López", specialty: "Oftalmología", serviceDate: "2024-01-21", diagnosis: "Miopía", status: "COMPLETED" },
  { id: "3", patientName: "Carlos López", patientDNI: "11111111", doctorName: "Dr. Martínez", specialty: "Odontología", serviceDate: "2024-01-22", diagnosis: "Caries", status: "PENDING" },
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
    { key: "doctorName", label: "Médico", width: "15%" },
    { key: "specialty", label: "Especialidad", width: "15%" },
    { key: "diagnosis", label: "Diagnóstico", width: "18%" },
    { key: "serviceDate", label: "Fecha", width: "12%" },
    { key: "status", label: "Estado", width: "13%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${statusColors[value as keyof typeof statusColors]}`}>{value}</span> },
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

  const content = (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-pink-100 rounded-xl">
              <Activity size={24} className="text-pink-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Atención de Salud</h1>
          </div>
          <p className="text-sm text-gray-600">Registro de atenciones médicas y consultas</p>
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
              <p className="text-2xl font-bold text-blue-600">{((completadas / atenciones.length) * 100).toFixed(0)}%</p>
            </div>
          </div>

          <DataTable<AtencionSalud>
            columns={columns}
            data={atenciones}
            title="Registro de Atenciones"
            searchPlaceholder="Buscar por paciente, médico o diagnóstico..."
            searchFields={["patientName", "doctorName", "diagnosis"]}
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
        title={editingId ? "Editar Atención" : "Crear Nueva Atención"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Paciente" value={formData.patientName || ""} onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="DNI" value={formData.patientDNI || ""} onChange={(e) => setFormData({ ...formData, patientDNI: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Médico" value={formData.doctorName || ""} onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Especialidad" value={formData.specialty || ""} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Diagnóstico" value={formData.diagnosis || ""} onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 col-span-2" />
            <input type="date" placeholder="Fecha" value={formData.serviceDate || ""} onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
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
