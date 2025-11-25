/**
 * Exportador a formato Word (.doc)
 */

import type { FormState } from "@/types"
import { BaseExporter } from "./base-exporter"

export class WordExporter extends BaseExporter {
  getFileExtension(): string {
    return "doc"
  }

  getMimeType(): string {
    return "application/msword"
  }

  generateContent(): string {
    const { leftSections, rightSections } = this.formState
    const metadata = this.getMetadataRows()
    const leftContent = this.generateSectionsContent(leftSections)
    const rightContent = this.generateSectionsContent(rightSections)

    return `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
      <head>
        <meta charset="utf-8">
        <title>${this.formTitle}</title>
        <style>
          ${this.getStyles()}
        </style>
      </head>
      <body>
        <h1>${this.formTitle}</h1>
        
        <!-- Header Information -->
        <table class="header-table">
          ${metadata}
        </table>
        
        <!-- Two Column Checklist Layout -->
        <table class="main-table">
          <tr>
            <td style="width: 50%; vertical-align: top;">
              ${leftContent}
            </td>
            <td style="width: 50%; vertical-align: top;">
              ${rightContent}
            </td>
          </tr>
        </table>
        
        <!-- Additional Comments -->
        <div class="comments-box">
          <strong>Additional Comments:</strong> ${this.formState.additionalComments || "[No comments]"}
        </div>
        
        <!-- Signature Section -->
        <table style="width: 100%; margin-top: 20px;">
          <tr>
            <td style="border: none; width: 50%;">
              <strong>Inspector's Signature:</strong> <span class="signature-line">${this.formState.inspectorSignature || ""}</span>
            </td>
            <td style="border: none; width: 50%;">
              <strong>Date:</strong> <span class="signature-line">${this.formState.signatureDate || ""}</span>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  }

  private getMetadataRows(): string {
    return `
      <tr>
        <td class="label">Inspector's Name:</td>
        <td>${this.formState.inspectorName || "[Inspector's Name]"}</td>
        <td class="label">Date of Inspection:</td>
        <td>${this.formState.dateOfInspection || "[Date]"}</td>
      </tr>
      <tr>
        <td class="label">Project Name:</td>
        <td>${this.formState.projectName || "[Project Name]"}</td>
        <td class="label">Location:</td>
        <td>${this.formState.location || "[Location]"}</td>
      </tr>
    `
  }

  private generateSectionsContent(sections: any[]): string {
    return sections
      .map(
        (section) => `
      <div class="section-title">${section.title}</div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
        ${section.items
          .map(
            (item: any) => `
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="border: none; padding: 2px 0; font-size: 9pt;">${item.question}</td>
            <td style="border: none; width: 25px; text-align: center;">${item.yes ? "☑" : "☐"}</td>
            <td style="border: none; width: 25px; text-align: center;">${item.no ? "☑" : "☐"}</td>
          </tr>
        `,
          )
          .join("")}
      </table>
    `,
      )
      .join("")
  }

  private getStyles(): string {
    return `
      body { font-family: Arial, sans-serif; font-size: 11pt; margin: 40px; }
      h1 { text-align: center; font-size: 14pt; margin-bottom: 20px; }
      .header-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
      .header-table td { border: 1px solid black; padding: 5px 8px; font-size: 10pt; }
      .header-table .label { font-weight: bold; width: 25%; }
      .main-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
      .main-table td, .main-table th { border: 1px solid black; padding: 3px 5px; font-size: 9pt; vertical-align: top; }
      .section-title { font-weight: bold; font-size: 9pt; border-bottom: 1px solid black; padding-bottom: 3px; margin-bottom: 5px; }
      .comments-box { border: 1px solid black; padding: 8px; margin-bottom: 15px; font-size: 10pt; }
      .signature-line { border-bottom: 1px solid black; display: inline-block; width: 200px; }
    `
  }
}
