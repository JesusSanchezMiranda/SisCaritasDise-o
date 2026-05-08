"use client"

import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Copy, 
  Download, 
  Upload,
  MoreVertical,
  Save,
  X,
  Check,
  AlertCircle
} from "lucide-react"

interface CRUDButtonProps {
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  tooltip?: string
}

// CREATE Button
export function CreateButton({ onClick, disabled, loading, className = "", tooltip = "Crear nuevo registro" }: CRUDButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      title={tooltip}
      className={`flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium ${className}`}
    >
      <Plus size={18} />
      {loading ? "Creando..." : "Crear"}
    </button>
  )
}

// READ/VIEW Button
export function ViewButton({ onClick, disabled, loading, className = "", tooltip = "Ver detalles" }: CRUDButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      title={tooltip}
      className={`flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Eye size={18} />
    </button>
  )
}

// UPDATE Button
export function EditButton({ onClick, disabled, loading, className = "", tooltip = "Editar registro" }: CRUDButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      title={tooltip}
      className={`flex items-center justify-center p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Edit2 size={18} />
    </button>
  )
}

// DELETE Button
export function DeleteButton({ onClick, disabled, loading, className = "", tooltip = "Eliminar registro" }: CRUDButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      title={tooltip}
      className={`flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Trash2 size={18} />
    </button>
  )
}

// DUPLICATE Button
export function DuplicateButton({ onClick, disabled, loading, className = "", tooltip = "Duplicar registro" }: CRUDButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      title={tooltip}
      className={`flex items-center justify-center p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Copy size={18} />
    </button>
  )
}

// DOWNLOAD/EXPORT Button
export function ExportButton({ onClick, disabled, loading, className = "", tooltip = "Descargar/Exportar" }: CRUDButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      title={tooltip}
      className={`flex items-center justify-center p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Download size={18} />
    </button>
  )
}

// IMPORT/UPLOAD Button
export function ImportButton({ onClick, disabled, loading, className = "", tooltip = "Importar/Cargar" }: CRUDButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      title={tooltip}
      className={`flex items-center justify-center p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Upload size={18} />
    </button>
  )
}

// MORE OPTIONS Button (Dropdown trigger)
export function MoreOptionsButton({ onClick, disabled, className = "", tooltip = "Más opciones" }: CRUDButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      className={`flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <MoreVertical size={18} />
    </button>
  )
}

// SAVE Button (for forms)
export function SaveButton({ onClick, disabled, loading, className = "", tooltip = "Guardar cambios" }: CRUDButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      title={tooltip}
      className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium ${className}`}
    >
      <Save size={18} />
      {loading ? "Guardando..." : "Guardar"}
    </button>
  )
}

// CANCEL Button
export function CancelButton({ onClick, disabled, className = "", tooltip = "Cancelar" }: CRUDButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      className={`flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium ${className}`}
    >
      <X size={18} />
      Cancelar
    </button>
  )
}

// CONFIRM/ACCEPT Button
export function ConfirmButton({ onClick, disabled, loading, className = "", tooltip = "Confirmar" }: CRUDButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      title={tooltip}
      className={`flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium ${className}`}
    >
      <Check size={18} />
      Confirmar
    </button>
  )
}

// ALERT/WARNING Button
export function WarningButton({ onClick, disabled, loading, className = "", tooltip = "Alerta" }: CRUDButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      title={tooltip}
      className={`flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium ${className}`}
    >
      <AlertCircle size={18} />
      Advertencia
    </button>
  )
}

// Action Button Group (for table rows)
export interface ActionButtonConfig {
  type: "view" | "edit" | "delete" | "duplicate" | "export" | "import" | "more"
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  tooltip?: string
}

interface ActionButtonsProps {
  actions: ActionButtonConfig[]
  disabled?: boolean
}

export function ActionButtons({ actions, disabled = false }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-1">
      {actions.map((action) => {
        const props = {
          onClick: action.onClick,
          disabled: disabled || action.disabled,
          loading: action.loading,
          tooltip: action.tooltip,
          className: "h-8 w-8"
        }

        switch (action.type) {
          case "view":
            return <ViewButton key="view" {...props} />
          case "edit":
            return <EditButton key="edit" {...props} />
          case "delete":
            return <DeleteButton key="delete" {...props} />
          case "duplicate":
            return <DuplicateButton key="duplicate" {...props} />
          case "export":
            return <ExportButton key="export" {...props} />
          case "import":
            return <ImportButton key="import" {...props} />
          case "more":
            return <MoreOptionsButton key="more" {...props} />
          default:
            return null
        }
      })}
    </div>
  )
}
