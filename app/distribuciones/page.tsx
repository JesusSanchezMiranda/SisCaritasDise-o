"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { Truck, Download, Upload } from "lucide-react"

interface Distribucion {
  id: string
  distributionNumber: string
  distributionType: "ENTREGA_DOMICILIO" | "ENTREGA_LOCAL" | "ENTREGA_CAMPANA"
  beneficiaryName: string
  beneficiaryDNI: string
  distributionDate: string
  status: "PENDIENTE" | "ENTREGADO" | "PARCIAL"
}

const mockDistribuciones: Distribucion[] = [
  { id: "1", distributionNumber: "DIST001", distributionType: "ENTREGA_DOMICILIO", beneficiaryName: "Juan Perez", beneficiaryDNI: "12345678", distributionDate: "2024-01-20", status: "ENTREGADO" },
  { id: "2", distributionNumber: "DIST002", distributionType: "ENTREGA_LOCAL", beneficiaryName: "Maria Garcia", beneficiaryDNI: "87654321", distributionDate: "2024-01-21", status: "PENDIENTE" },
  { id: "3", distributionNumber: "DIST003", distributionType: "ENTREGA_CAMPANA", beneficiaryName: "Carlos Lopez", beneficiaryDNI: "11111111", distributionDate: "2024-01-22", status: "ENTREGADO" },
]

export default function DistribucionesPage() {
  const [distribuciones, setDistribuciones] = useState<Distribucion[]>(mockDistribuciones)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Distribucion>>({})

  const typeColors = {
    ENTREGA_DOMICILIO: "bg-blue-100 text-blue-700",
    ENTREGA_LOCAL: "bg-purple-100 text-purple-700",
    ENTREGA_CAMPANA: "bg-orange-100 text-orange-700",
  }

  const statusColors = {
    PENDIENTE: "bg-yellow-100 text-yellow-700",
    ENTREGADO: "bg-green-100 text-green-700",
    PARCIAL: "bg-orange-100 text-orange-700",
  }

  const columns: Column<Distribucion>[] = [
    { key: "distributionNumber", label: "Numero", width: "12%" },
    { key: "distributionType", label: "Tipo", width: "16%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${typeColors[value as keyof typeof typeColors]}`}>{value === "ENTREGA_DOMICILIO" ? "Domicilio" : value === "ENTREGA_LOCAL" ? "Local" : "Campana"}</span> },
    { key: "beneficiaryName", label: "Beneficiario", width: "20%" },
    { key: "beneficiaryDNI", label: "DNI", width: "12%" },
    { key: "distributionDate", label: "Fecha", width: "15%" },
    { key: "status", label: "Estado", width: "25%", render: (value) => <span className={`px-2 py-1 rounded text-sm ${statusColors[value as keyof typeof statusColors]}`}>{value}</span> },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const distribucion = distribuciones.find((d) => d.id === id)
    if (distribucion) {
      setEditingId(id)
      setFormData(distribucion)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    setDistribuciones((prev) => prev.filter((d) => d.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setDistribuciones((prev) => prev.map((d) => (d.id === editingId ? { ...d, ...formData } : d)))
    } else {
      setDistribuciones((prev) => [...prev, { id: Date.now().toString(), ...formData as Distribucion }])
    }
    setIsModalOpen(false)
  }

  const entregadas = distribuciones.filter((d) => d.status === "ENTREGADO").length
  const pendientes = distribuciones.filter((d) => d.status === "PENDIENTE").length

  return (
    <PageLayout
      title="Distribuciones"
      subtitle="Gestiona entregas a beneficiarios"
      breadcrumbs={[{ label: "Social" }, { label: "Distribuciones" }]}
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 rounded-xl">
            <Truck size={24} className="text-[#DC2626]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Lista de Distribuciones</h2>
            <p className="text-sm text-gray-500">{distribuciones.length} distribuciones registradas</p>
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
          <p className="text-sm text-gray-600 mb-1">Total Distribuciones</p>
          <p className="text-2xl font-bold text-gray-900">{distribuciones.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Entregadas</p>
          <p className="text-2xl font-bold text-green-600">{entregadas}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-600">{pendientes}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Tasa de Entrega</p>
          <p className="text-2xl font-bold text-[#DC2626]">{((entregadas / distribuciones.length) * 100).toFixed(0)}%</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable<Distribucion>
        columns={columns}
        data={distribuciones}
        title="Lista de Distribuciones"
        searchPlaceholder="Buscar por beneficiario, DNI o numero..."
        searchFields={["beneficiaryName", "beneficiaryDNI", "distributionNumber"]}
        actions={(item) => [
          { type: "edit", onClick: () => handleEdit(item.id), tooltip: "Editar" },
          { type: "delete", onClick: () => handleDelete(item.id), tooltip: "Eliminar" },
        ]}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Distribucion" : "Crear Nueva Distribucion"}
        size="lg"
        footer={<><CancelButton onClick={() => setIsModalOpen(false)} /><SaveButton onClick={handleSave} /></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Numero" value={formData.distributionNumber || ""} onChange={(e) => setFormData({ ...formData, distributionNumber: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <select value={formData.distributionType || ""} onChange={(e) => setFormData({ ...formData, distributionType: e.target.value as Distribucion["distributionType"] })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]">
              <option value="">Tipo de entrega</option>
              <option value="ENTREGA_DOMICILIO">Domicilio</option>
              <option value="ENTREGA_LOCAL">Local</option>
              <option value="ENTREGA_CAMPANA">Campana</option>
            </select>
            <input type="text" placeholder="Beneficiario" value={formData.beneficiaryName || ""} onChange={(e) => setFormData({ ...formData, beneficiaryName: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="text" placeholder="DNI" value={formData.beneficiaryDNI || ""} onChange={(e) => setFormData({ ...formData, beneficiaryDNI: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <input type="date" placeholder="Fecha" value={formData.distributionDate || ""} onChange={(e) => setFormData({ ...formData, distributionDate: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]" />
            <select value={formData.status || ""} onChange={(e) => setFormData({ ...formData, status: e.target.value as Distribucion["status"] })} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]">
              <option value="">Estado</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="ENTREGADO">Entregado</option>
              <option value="PARCIAL">Parcial</option>
            </select>
          </div>
        </div>
      </Modal>
    </PageLayout>
  )
}
