/**
 * Hook personalizado para gestionar el estado del formulario de inspección
 */

import { useState, useCallback, useEffect } from "react"
import type { FormState,
  //Section,
  //ChecklistItem
 } from "@/types"
import { saveFormState, loadFormState, clearFormState } from "@/lib/storage"

interface UseInspectionFormProps {
  formId: string
  initialState: FormState
}

export function useInspectionForm({ formId, initialState }: UseInspectionFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState)
  const [isDirty, setIsDirty] = useState(false)
  const [hasDraft, setHasDraft] = useState(false)

  // Cargar borrador al montar
  useEffect(() => {
    const savedState = loadFormState(formId)
    if (savedState) {
      setFormState(savedState)
      setHasDraft(true)
    }
  }, [formId])

  // Auto-guardar cambios
  useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        saveFormState(formId, formState)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [formState, isDirty, formId])

  const updateMetadata = useCallback(
    (key: keyof Omit<FormState, "leftSections" | "rightSections">, value: string) => {
      setFormState((prev) => ({
        ...prev,
        [key]: value,
      }))
      setIsDirty(true)
    },
    [],
  )

  const handleCheckboxChange = useCallback(
    (side: "left" | "right", sectionIndex: number, itemIndex: number, field: "yes" | "no") => {
      setFormState((prev) => {
        const sections = side === "left" ? [...prev.leftSections] : [...prev.rightSections]
        const section = { ...sections[sectionIndex] }
        const item = { ...section.items[itemIndex] }

        if (field === "yes") {
          item.yes = !item.yes
          if (item.yes) item.no = false
        } else {
          item.no = !item.no
          if (item.no) item.yes = false
        }

        section.items = [...section.items]
        section.items[itemIndex] = item
        sections[sectionIndex] = section

        return {
          ...prev,
          [side === "left" ? "leftSections" : "rightSections"]: sections,
        }
      })
      setIsDirty(true)
    },
    [],
  )

  const resetForm = useCallback(() => {
    setFormState(initialState)
    clearFormState(formId)
    setIsDirty(false)
    setHasDraft(false)
  }, [formId, initialState])

  const discardDraft = useCallback(() => {
    clearFormState(formId)
    setHasDraft(false)
  }, [formId])

  return {
    formState,
    isDirty,
    hasDraft,
    updateMetadata,
    handleCheckboxChange,
    resetForm,
    discardDraft,
  }
}
