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
    csv += `Inspector's Name,${this.formState.inspectorName || "[Inspector's Name]"}\n`
    csv += `Project Name,${this.formState.projectName || "[Project Name]"}\n`
    csv += `Date of Inspection,${this.formState.dateOfInspection || "[Date]"}\n`
    csv += `Location,${this.formState.location || "[Location]"}\n\n`

    // Checklist
    csv += "Section,Question,YES,NO\n"
    const allSections = [...this.formState.leftSections, ...this.formState.rightSections]

    allSections.forEach((section) => {
      section.items.forEach((item) => {
        csv += `"${section.title}","${item.question}",${item.yes ? "X" : ""},${item.no ? "X" : ""}\n`
      })
    })

    // Additional info
    csv += `\nAdditional Comments,"${this.formState.additionalComments || "[No comments]"}"\n`
    csv += `Inspector's Signature,"${this.formState.inspectorSignature || ""}"\n`
    csv += `Signature Date,"${this.formState.signatureDate || ""}"\n`

    return csv
  }
}
