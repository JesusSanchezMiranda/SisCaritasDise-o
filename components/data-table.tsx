"use client"

import { ActionButtons, ActionButtonConfig } from "./crud-buttons"
import { ChevronDown, ChevronUp, Search, Filter } from "lucide-react"
import { useState } from "react"

export interface Column<T> {
  key: keyof T
  label: string
  render?: (value: any, item: T) => React.ReactNode
  sortable?: boolean
  width?: string
  align?: "left" | "center" | "right"
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  actions?: (item: T) => ActionButtonConfig[]
  onSearch?: (query: string) => void
  searchPlaceholder?: string
  title?: string
  subtitle?: string
  loading?: boolean
  emptyMessage?: string
  searchFields?: (keyof T)[]
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  actions,
  onSearch,
  searchPlaceholder = "Buscar...",
  title,
  subtitle,
  loading = false,
  emptyMessage = "No hay datos disponibles",
  searchFields = [],
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T
    direction: "asc" | "desc"
  } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Handle sorting
  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        }
      }
      return { key, direction: "asc" }
    })
  }

  // Filter and sort data
  let filteredData = [...data]

  if (searchQuery && searchFields.length > 0) {
    filteredData = filteredData.filter((item) =>
      searchFields.some((field) =>
        String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }

  if (sortConfig) {
    filteredData.sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      {(title || searchPlaceholder) && (
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-4">
          <div>
            {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {searchPlaceholder && (
              <div className="relative">
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${
                    column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                  } ${column.width ? column.width : ""}`}
                  style={{ textAlign: column.align }}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortConfig?.key === column.key && (
                      <>
                        {sortConfig.direction === "asc" ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center">
                  <p className="text-gray-500">Cargando...</p>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center">
                  <p className="text-gray-500">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id || Math.random()} className="hover:bg-gray-50 transition-colors">
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-6 py-4 text-sm text-gray-900"
                      style={{ textAlign: column.align }}
                    >
                      {column.render ? column.render(item[column.key], item) : String(item[column.key])}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 text-right">
                      <ActionButtons actions={actions(item)} />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer - Row count */}
      {filteredData.length > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-600">
          Mostrando {filteredData.length} de {data.length} registros
        </div>
      )}
    </div>
  )
}
