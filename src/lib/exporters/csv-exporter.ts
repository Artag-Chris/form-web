/**
 * Exportador a formato CSV (Excel)
 */

//import type { FormState } from "@/types"
import { BaseExporter } from "./base-exporter"

export class CSVExporter extends BaseExporter {
  getFileExtension(): string {
    return "csv"
  }

  getMimeType(): string {
    return "text/csv;charset=utf-8;"
  }

  generateContent(): string {
    let csv = `${this.formTitle}\n\n`

    // Metadata
    csv += `Inspector's Name,${this.formState.inspectorName || "[Inspector's Name]"},,Date of Inspection,${this.formState.dateOfInspection || "[Date]"}\n`
    csv += `Project Name,${this.formState.projectName || "[Project Name]"},,Location,${this.formState.location || "[Location]"}\n\n`

    // Checklist - Left and Right sections side by side
    const leftSections = this.formState.leftSections
    const rightSections = this.formState.rightSections
    const maxSections = Math.max(leftSections.length, rightSections.length)

    for (let i = 0; i < maxSections; i++) {
      const leftSection = leftSections[i]
      const rightSection = rightSections[i]

      // Section headers
      if (leftSection || rightSection) {
        const leftTitle = leftSection?.title || ""
        const rightTitle = rightSection?.title || ""
        csv += `${leftTitle},,YES,NO,${rightTitle},,YES,NO\n`

        // Items
        const maxItems = Math.max(leftSection?.items.length || 0, rightSection?.items.length || 0)
        for (let j = 0; j < maxItems; j++) {
          const leftItem = leftSection?.items[j]
          const rightItem = rightSection?.items[j]

          const leftQuestion = leftItem?.question || ""
          const leftYes = leftItem?.yes ? "X" : ""
          const leftNo = leftItem?.no ? "X" : ""

          const rightQuestion = rightItem?.question || ""
          const rightYes = rightItem?.yes ? "X" : ""
          const rightNo = rightItem?.no ? "X" : ""

          csv += `"${leftQuestion}",${leftYes},${leftNo},,"${rightQuestion}",${rightYes},${rightNo}\n`
        }
        csv += "\n"
      }
    }

    // Additional info
    csv += `\nAdditional Comments,"${this.formState.additionalComments || "[Inspector's additional comments or observations]"}"\n`
    csv += `Inspector's Signature,"${this.formState.inspectorSignature || ""}"\n`
    csv += `Signature Date,"${this.formState.signatureDate || ""}"\n`

    return csv
  }
}
