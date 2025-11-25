/**
 * Tipos compartidos para toda la aplicación
 */

export interface ChecklistItem {
  id: string
  question: string
  yes: boolean | null
  no: boolean | null
}

export interface Section {
  id: string
  title: string
  items: ChecklistItem[]
}

export interface FormMetadata {
  inspectorName: string
  projectName: string
  dateOfInspection: string
  location: string
  additionalComments: string
  inspectorSignature: string
  signatureDate: string
}

export interface FormState extends FormMetadata {
  leftSections: Section[]
  rightSections: Section[]
}

export type ExportFormat = "word" | "excel"

export interface FormConfig {
  id: string
  title: string
  description: string
  leftSections: Section[]
  rightSections: Section[]
}
