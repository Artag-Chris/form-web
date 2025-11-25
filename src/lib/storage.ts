/**
 * Utilidades para persistencia de datos
 */

import type { FormState } from "@/types"
import { STORAGE_KEYS } from "./constants"

/**
 * Guarda el estado del formulario en localStorage
 */
export function saveFormState(formId: string, state: FormState): void {
  try {
    const key = `${STORAGE_KEYS.FORM_DRAFT}${formId}`
    localStorage.setItem(key, JSON.stringify(state))
  } catch (error) {
    console.error("Error saving form state:", error)
  }
}

/**
 * Carga el estado del formulario desde localStorage
 */
export function loadFormState(formId: string): FormState | null {
  try {
    const key = `${STORAGE_KEYS.FORM_DRAFT}${formId}`
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error loading form state:", error)
    return null
  }
}

/**
 * Elimina el estado del formulario de localStorage
 */
export function clearFormState(formId: string): void {
  try {
    const key = `${STORAGE_KEYS.FORM_DRAFT}${formId}`
    localStorage.removeItem(key)
  } catch (error) {
    console.error("Error clearing form state:", error)
  }
}

/**
 * Verifica si hay un borrador guardado
 */
export function hasSavedDraft(formId: string): boolean {
  try {
    const key = `${STORAGE_KEYS.FORM_DRAFT}${formId}`
    return localStorage.getItem(key) !== null
  } catch {
    return false
  }
}
