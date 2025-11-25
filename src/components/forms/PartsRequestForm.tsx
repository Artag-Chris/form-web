/**
 * Componente del formulario de solicitud de piezas
 */

"use client"

import { useCallback } from "react"
import type { ExportFormat } from "@/types"
import { useInspectionForm } from "@/hooks/useInspectionForm"
import { PARTS_REQUEST_CONFIG } from "@/lib/constants"
import { exportForm } from "@/lib/exporters"
import { ActionBar } from "./ActionBar"
import { FormHeader } from "./FormHeader"
import { ChecklistSection } from "./ChecklistSection"
import { CommentsSection } from "./CommentsSection"
import { SignatureSection } from "./SignatureSection"

export function PartsRequestForm() {
  const initialState = {
    inspectorName: "",
    projectName: "",
    dateOfInspection: "",
    location: "",
    additionalComments: "",
    inspectorSignature: "",
    signatureDate: "",
    leftSections: PARTS_REQUEST_CONFIG.leftSections,
    rightSections: PARTS_REQUEST_CONFIG.rightSections,
  }

  const { formState, isDirty, handleCheckboxChange, updateMetadata, resetForm } = useInspectionForm({
    formId: PARTS_REQUEST_CONFIG.id,
    initialState,
  })

  const handleDownload = useCallback(
    (format: ExportFormat) => {
      exportForm(format, formState, PARTS_REQUEST_CONFIG.title, "parts_request")
    },
    [formState],
  )

  const handleShare = useCallback(async () => {
    const shareData = {
      title: PARTS_REQUEST_CONFIG.title,
      text: `Parts Request - Project: ${formState.projectName || "N/A"} - Requester: ${formState.inspectorName || "N/A"}`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }, [formState.projectName, formState.inspectorName])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Link copied to clipboard")
  }

  return (
    <div className="bg-white shadow-lg border border-neutral-400 aspect-[11/8.5] flex flex-col max-w-4xl mx-auto">
      <ActionBar onDownload={handleDownload} onShare={handleShare} onReset={resetForm} isDirty={isDirty} />

      <div className="flex-1 p-3 overflow-auto">
        <FormHeader
          inspectorName={formState.inspectorName}
          projectName={formState.projectName}
          dateOfInspection={formState.dateOfInspection}
          location={formState.location}
          onInspectorNameChange={(value) => updateMetadata("inspectorName", value)}
          onProjectNameChange={(value) => updateMetadata("projectName", value)}
          onDateChange={(value) => updateMetadata("dateOfInspection", value)}
          onLocationChange={(value) => updateMetadata("location", value)}
        />

        <div className="border border-black mb-2">
          <div className="grid grid-cols-2">
            <div className="border-r border-black p-1">
              <div className="flex justify-end gap-2 text-[8px] font-bold mb-1">
                <span>YES</span>
                <span>NO</span>
              </div>
              {formState.leftSections.map((section, index) => (
                <ChecklistSection
                  key={section.id}
                  section={section}
                  sectionIndex={index}
                  side="left"
                  onCheckboxChange={(sectionIndex, itemIndex, field) =>
                    handleCheckboxChange("left", sectionIndex, itemIndex, field)
                  }
                />
              ))}
            </div>

            <div className="p-1">
              <div className="flex justify-end gap-2 text-[8px] font-bold mb-1">
                <span>YES</span>
                <span>NO</span>
              </div>
              {formState.rightSections.map((section, index) => (
                <ChecklistSection
                  key={section.id}
                  section={section}
                  sectionIndex={index}
                  side="right"
                  onCheckboxChange={(sectionIndex, itemIndex, field) =>
                    handleCheckboxChange("right", sectionIndex, itemIndex, field)
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <CommentsSection
          additionalComments={formState.additionalComments}
          onCommentsChange={(value) => updateMetadata("additionalComments", value)}
        />

        <SignatureSection
          inspectorSignature={formState.inspectorSignature}
          signatureDate={formState.signatureDate}
          onSignatureChange={(value) => updateMetadata("inspectorSignature", value)}
          onSignatureDateChange={(value) => updateMetadata("signatureDate", value)}
        />
      </div>
    </div>
  )
}
