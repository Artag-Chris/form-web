/**
 * Esquemas de validación usando Zod
 */

import { z } from "zod"

export const ChecklistItemSchema = z.object({
  id: z.string(),
  question: z.string().min(1),
  yes: z.boolean().nullable(),
  no: z.boolean().nullable(),
})

export const SectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  items: z.array(ChecklistItemSchema),
})

export const FormMetadataSchema = z.object({
  inspectorName: z.string().min(1, "Inspector name is required"),
  projectName: z.string().min(1, "Project name is required"),
  dateOfInspection: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  additionalComments: z.string().optional(),
  inspectorSignature: z.string().optional(),
  signatureDate: z.string().optional(),
})

export const FormStateSchema = FormMetadataSchema.extend({
  leftSections: z.array(SectionSchema),
  rightSections: z.array(SectionSchema),
})

export type FormMetadata = z.infer<typeof FormMetadataSchema>
export type FormState = z.infer<typeof FormStateSchema>

/**
 * Valida los datos del formulario
 */
export function validateFormData(data: unknown) {
  try {
    return FormStateSchema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      }
    }
    return { success: false, errors: [] }
  }
}

/**
 * Valida solo los metadatos del formulario
 */
export function validateFormMetadata(data: unknown) {
  try {
    FormMetadataSchema.parse(data)
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      }
    }
    return { success: false, errors: [] }
  }
}
