/**
 * Exportadores centralizados
 */

import type { FormState, ExportFormat } from "@/types"
import { WordExporter } from "./word-exporter"
import { CSVExporter } from "./csv-exporter"

export function createExporter(format: ExportFormat, formState: FormState, formTitle: string) {
  switch (format) {
    case "word":
      return new WordExporter(formState, formTitle)
    case "excel":
      return new CSVExporter(formState, formTitle)
    default:
      throw new Error(`Unknown export format: ${format}`)
  }
}

export function exportForm(format: ExportFormat, formState: FormState, formTitle: string, filename: string) {
  const exporter = createExporter(format, formState, formTitle)
  exporter.download(filename)
}

export { WordExporter, CSVExporter }
