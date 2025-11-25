/**
 * Clase base para exportadores de formularios
 * Proporciona funcionalidad común para exportar a diferentes formatos
 */

import type { FormState, 
//  ExportFormat
 } from "@/types"

export abstract class BaseExporter {
  protected formState: FormState
  protected formTitle: string

  constructor(formState: FormState, formTitle: string) {
    this.formState = formState
    this.formTitle = formTitle
  }

  /**
   * Genera el contenido del archivo
   */
  abstract generateContent(): string

  /**
   * Obtiene la extensión del archivo
   */
  abstract getFileExtension(): string

  /**
   * Obtiene el tipo MIME
   */
  abstract getMimeType(): string

  /**
   * Descarga el archivo
   */
  download(filename: string): void {
    const content = this.generateContent()
    const blob = new Blob([content], { type: this.getMimeType() })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${filename}.${this.getFileExtension()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  /**
   * Genera el nombre del archivo con timestamp
   */
  protected generateFilename(): string {
    const date = new Date().toISOString().split("T")[0]
    const projectName = this.formState.projectName
      .toLowerCase()
      .replace(/\s+/g, "_")
    return `${projectName}_${date}`
  }
}
