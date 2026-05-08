"use client"

import { useState } from "react"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { Heart, Download, Upload, Plus } from "lucide-react"

interface Beneficiario {
  id: string
  dni: string
  firstName: string
  lastName: string
  birthDate: string
  gender: "MASCULINO" | "FEMENINO" | "OTRO"
  phone: string
  email: string
  vulnerabilityLevel: "BAJA" | "MEDIA" | "ALTA" | "CRITICA"
  familyMembers: number
  monthlyIncome: number
  housingType: string
  status: "ACTIVE" | "INACTIVE"
}

const mockBeneficiarios: Beneficiario[] = [
  {
    id: "1",
    dni: "12345678",
    firstName: "María",
    lastName: "González",
    birthDate: "1985-03-15",
    gender: "FEMENINO",
    phone: "987654321",
    email: "maria@example.com",
    vulnerabilityLevel: "ALTA",
    familyMembers: 4,
    monthlyIncome: 1500,
    housingType: "ALQUILADA",
    status: "ACTIVE",
  },
  {
    id: "2",
    dni: "87654321",
    firstName: "Juan",
    lastName: "Pérez",
    birthDate: "1990-07-22",
    gender: "MASCULINO",
    phone: "987654322",
    email: "juan@example.com",
    vulnerabilityLevel: "MEDIA",
    familyMembers: 3,
    monthlyIncome: 2000,
    housingType: "PROPIA",
    status: "ACTIVE",
  },
]

export default function BeneficiariosPage() {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>(mockBeneficiarios)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Beneficiario>>({})

  const columns: Column<Beneficiario>[] = [
    { key: "dni", label: "DNI", sortable: true, width: "100px" },
    { key: "firstName", label: "Nombre", sortable: true },
    { key: "lastName", label: "Apellido", sortable: true },
    { key: "phone", label: "Teléfono" },
    {
      key: "vulnerabilityLevel",
      label: "Vulnerabilidad",
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === "CRITICA"
            ? "bg-red-100 text-red-800"
            : value === "ALTA"
            ? "bg-orange-100 text-orange-800"
            : value === "MEDIA"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Estado",
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === "ACTIVE"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}>
          {value === "ACTIVE" ? "Activo" : "Inactivo"}
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
    const beneficiario = beneficiarios.find((b) => b.id === id)
    if (beneficiario) {
      setEditingId(id)
      setFormData(beneficiario)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este beneficiario?")) {
      setBeneficiarios(beneficiarios.filter((b) => b.id !== id))
    }
  }

  const handleSave = () => {
    if (editingId) {
      setBeneficiarios(
        beneficiarios.map((b) =>
          b.id === editingId ? { ...b, ...(formData as Beneficiario) } : b
        )
      )
    } else {
      const newBeneficiario: Beneficiario = {
        id: Date.now().toString(),
        dni: formData.dni || "",
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        birthDate: formData.birthDate || "",
        gender: formData.gender || "OTRO",
        phone: formData.phone || "",
        email: formData.email || "",
        vulnerabilityLevel: formData.vulnerabilityLevel || "MEDIA",
        familyMembers: formData.familyMembers || 0,
        monthlyIncome: formData.monthlyIncome || 0,
        housingType: formData.housingType || "NINGUNA",
        status: "ACTIVE",
      }
      setBeneficiarios([...beneficiarios, newBeneficiario])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-pink-100 rounded-xl">
                <Heart size={24} className="text-pink-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Beneficiarios</h1>
            </div>
            <p className="text-gray-600">Gestiona la información de los beneficiarios de Cáritas</p>
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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total de Beneficiarios</p>
            <p className="text-2xl font-bold text-gray-900">{beneficiarios.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Nivel Crítico</p>
            <p className="text-2xl font-bold text-red-600">
              {beneficiarios.filter((b) => b.vulnerabilityLevel === "CRITICA").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Activos</p>
            <p className="text-2xl font-bold text-green-600">
              {beneficiarios.filter((b) => b.status === "ACTIVE").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Inactivos</p>
            <p className="text-2xl font-bold text-gray-600">
              {beneficiarios.filter((b) => b.status === "INACTIVE").length}
            </p>
          </div>
        </div>

        {/* Data Table */}
        <DataTable<Beneficiario>
          columns={columns}
          data={beneficiarios}
          title="Lista de Beneficiarios"
          searchPlaceholder="Buscar por nombre, DNI o teléfono..."
          searchFields={["firstName", "lastName", "dni", "phone"]}
          emptyMessage="No hay beneficiarios registrados"
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
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Beneficiario" : "Crear Nuevo Beneficiario"}
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
              placeholder="DNI"
              value={formData.dni || ""}
              onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Nombre"
              value={formData.firstName || ""}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={formData.lastName || ""}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <select
              value={formData.vulnerabilityLevel || ""}
              onChange={(e) => setFormData({ ...formData, vulnerabilityLevel: e.target.value as any })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Seleccionar nivel de vulnerabilidad</option>
              <option value="BAJA">Baja</option>
              <option value="MEDIA">Media</option>
              <option value="ALTA">Alta</option>
              <option value="CRITICA">Crítica</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
