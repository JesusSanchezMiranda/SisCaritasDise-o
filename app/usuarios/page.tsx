"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { DataTable, Column } from "@/components/data-table"
import { CreateButton, SaveButton, CancelButton } from "@/components/crud-buttons"
import { Modal } from "@/components/modal"
import { Users, Download, Upload } from "lucide-react"

interface Usuario {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  role: "ADMIN" | "COORDINADOR" | "CONTADOR" | "VOLUNTARIO"
  documentNumber: string
  phone: string
  status: "ACTIVE" | "INACTIVE"
  lastLogin: string
}

const mockUsuarios: Usuario[] = [
  {
    id: "1",
    firstName: "Carlos",
    lastName: "Admin",
    email: "admin@caritas.com",
    username: "admin",
    role: "ADMIN",
    documentNumber: "10000001",
    phone: "987000001",
    status: "ACTIVE",
    lastLogin: "2024-03-15T10:30:00",
  },
  {
    id: "2",
    firstName: "Rosa",
    lastName: "Coordinadora",
    email: "rosa@caritas.com",
    username: "rosa.coordinador",
    role: "COORDINADOR",
    documentNumber: "10000002",
    phone: "987000002",
    status: "ACTIVE",
    lastLogin: "2024-03-14T14:15:00",
  },
]

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Usuario>>({})

  const columns: Column<Usuario>[] = [
    { key: "username", label: "Usuario", sortable: true },
    { key: "firstName", label: "Nombre", sortable: true },
    { key: "lastName", label: "Apellido", sortable: true },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Rol",
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === "ADMIN"
            ? "bg-red-100 text-red-800"
            : value === "COORDINADOR"
            ? "bg-blue-100 text-blue-800"
            : value === "CONTADOR"
            ? "bg-purple-100 text-purple-800"
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
    {
      key: "lastLogin",
      label: "Ultimo acceso",
      render: (value) => {
        const date = new Date(value)
        return date.toLocaleDateString("es-ES") + " " + date.toLocaleTimeString("es-ES")
      },
    },
  ]

  const handleCreate = () => {
    setEditingId(null)
    setFormData({})
    setIsModalOpen(true)
  }

  const handleEdit = (id: string) => {
    const usuario = usuarios.find((u) => u.id === id)
    if (usuario) {
      setEditingId(id)
      setFormData(usuario)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Estas seguro de que deseas eliminar este usuario?")) {
      setUsuarios(usuarios.filter((u) => u.id !== id))
    }
  }

  const handleSave = () => {
    if (editingId) {
      setUsuarios(
        usuarios.map((u) =>
          u.id === editingId ? { ...u, ...(formData as Usuario) } : u
        )
      )
    } else {
      const newUsuario: Usuario = {
        id: Date.now().toString(),
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        email: formData.email || "",
        username: formData.username || "",
        role: formData.role || "VOLUNTARIO",
        documentNumber: formData.documentNumber || "",
        phone: formData.phone || "",
        status: "ACTIVE",
        lastLogin: new Date().toISOString(),
      }
      setUsuarios([...usuarios, newUsuario])
    }
    setIsModalOpen(false)
  }

  return (
    <PageLayout 
      title="Usuarios del Sistema"
      subtitle="Gestiona usuarios y roles del sistema"
      breadcrumbs={[{ label: "Personas" }, { label: "Usuarios Sistema" }]}
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 rounded-xl">
            <Users size={24} className="text-[#DC2626]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Lista de Usuarios</h2>
            <p className="text-sm text-gray-500">{usuarios.length} usuarios registrados</p>
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
          <p className="text-sm text-gray-600 mb-1">Total Usuarios</p>
          <p className="text-2xl font-bold text-gray-900">{usuarios.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Administradores</p>
          <p className="text-2xl font-bold text-[#DC2626]">
            {usuarios.filter((u) => u.role === "ADMIN").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Coordinadores</p>
          <p className="text-2xl font-bold text-blue-600">
            {usuarios.filter((u) => u.role === "COORDINADOR").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Contadores</p>
          <p className="text-2xl font-bold text-purple-600">
            {usuarios.filter((u) => u.role === "CONTADOR").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Activos</p>
          <p className="text-2xl font-bold text-green-600">
            {usuarios.filter((u) => u.status === "ACTIVE").length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable<Usuario>
        columns={columns}
        data={usuarios}
        title="Lista de Usuarios"
        searchPlaceholder="Buscar por usuario, nombre o email..."
        searchFields={["username", "firstName", "lastName", "email"]}
        emptyMessage="No hay usuarios registrados"
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
        title={editingId ? "Editar Usuario" : "Crear Nuevo Usuario"}
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
              placeholder="Nombre"
              value={formData.firstName || ""}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={formData.lastName || ""}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            />
            <input
              type="text"
              placeholder="Usuario"
              value={formData.username || ""}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            />
            <input
              type="tel"
              placeholder="Telefono"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            />
            <select
              value={formData.role || ""}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as Usuario["role"] })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DC2626]"
            >
              <option value="">Seleccionar rol</option>
              <option value="ADMIN">Administrador</option>
              <option value="COORDINADOR">Coordinador</option>
              <option value="CONTADOR">Contador</option>
              <option value="VOLUNTARIO">Voluntario</option>
            </select>
          </div>
        </div>
      </Modal>
    </PageLayout>
  )
}
