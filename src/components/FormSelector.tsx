/**
 * Componente selector de formularios
 */

"use client"

import { useState } from "react"
import { FileText, Wrench, Package } from "lucide-react"
import { SafetyInspectionForm } from "./forms/SafetyInspectionForm"
import { EquipmentInspectionForm } from "./forms/EquipmentInspectionForm"
import { PartsRequestForm } from "./forms/PartsRequestForm"

type FormType = "safety" | "equipment" | "parts" | null

interface FormOption {
  id: FormType
  title: string
  description: string
  icon: React.ReactNode
  component: React.ComponentType
}

const FORM_OPTIONS: FormOption[] = [
  {
    id: "safety",
    title: "Construction Safety Inspection",
    description: "Complete safety inspection for construction sites",
    icon: <FileText className="w-8 h-8" />,
    component: SafetyInspectionForm,
  },
  {
    id: "equipment",
    title: "Equipment Inspection",
    description: "Equipment maintenance and safety inspection",
    icon: <Wrench className="w-8 h-8" />,
    component: EquipmentInspectionForm,
  },
  {
    id: "parts",
    title: "Parts List Request",
    description: "Request and track equipment parts",
    icon: <Package className="w-8 h-8" />,
    component: PartsRequestForm,
  },
]

export function FormSelector() {
  const [selectedForm, setSelectedForm] = useState<FormType>(null)

  if (selectedForm) {
    const form = FORM_OPTIONS.find((f) => f.id === selectedForm)
    if (!form) return null

    const FormComponent = form.component

    return (
      <div className="min-h-screen bg-neutral-200 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedForm(null)}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            ← Back to Forms
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-800 tracking-wide mb-1">
            {form.title.toUpperCase()}
          </h1>
          <p className="text-center text-blue-600 text-sm mb-6">{form.description}</p>

          <FormComponent />

          <p className="text-center font-bold text-neutral-800 mt-4">
            Editable, Printable, Digital File, Digital Download
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-neutral-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Form Manager</h1>
          <p className="text-lg text-gray-600">Select a form to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FORM_OPTIONS.map((form) => (
            <button
              key={form.id}
              onClick={() => setSelectedForm(form.id)}
              className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-left hover:scale-105 transform"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-blue-600 group-hover:text-blue-700 transition-colors">{form.icon}</div>
                <div className="text-2xl text-gray-300 group-hover:text-blue-200 transition-colors">→</div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {form.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4">{form.description}</p>

              <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Open Form →
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Features</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span>
              Auto-save to browser storage
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span>
              Export to Word (.doc)
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span>
              Export to Excel (.csv)
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span>
              Share forms easily
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span>
              Interactive calendar
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span>
              Data validation
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
