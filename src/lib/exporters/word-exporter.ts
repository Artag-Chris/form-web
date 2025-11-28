/**
 * Exportador a formato Word (.doc)
 */

//import type { FormState } from "@/types"
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
        <table class="main-table" border="1" cellpadding="4" cellspacing="0">
          <tr>
            <td style="width: 50%; vertical-align: top; border-right: 1px solid black;">
              ${leftContent}
            </td>
            <td style="width: 50%; vertical-align: top;">
              ${rightContent}
            </td>
          </tr>
        </table>
        
        <!-- Additional Comments -->
        <table class="comments-table" border="1" cellpadding="6" cellspacing="0">
          <tr>
            <td>
              <strong>Additional Comments:</strong> ${this.formState.additionalComments || "[Inspector's additional comments or observations]"}
            </td>
          </tr>
        </table>
        
        <!-- Signature Section -->
        <table style="width: 100%; margin-top: 20px; border: none;">
          <tr>
            <td style="border: none; width: 50%; padding-top: 20px;">
              <strong>Inspector's Signature:</strong> <span class="signature-line">${this.formState.inspectorSignature || ""}</span>
            </td>
            <td style="border: none; width: 50%; padding-top: 20px;">
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
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 0;">
        <tr>
          <td style="border: 1px solid black; padding: 4px 6px; font-weight: bold; font-size: 9pt; background-color: #f0f0f0;">
            ${section.title}
          </td>
          <td style="border: none; padding: 2px 4px; font-size: 8pt; font-weight: bold; text-align: center; width: 30px;">YES</td>
          <td style="border: none; padding: 2px 4px; font-size: 8pt; font-weight: bold; text-align: center; width: 30px;">NO</td>
        </tr>
        ${section.items
          .map(
            (item: any) => `
          <tr>
            <td style="border: 1px solid black; padding: 3px 4px; font-size: 9pt;">
              ${item.question}
            </td>
            <td style="border: 1px solid black; padding: 3px 2px; text-align: center; font-size: 10pt;">
              ${item.yes ? "X" : ""}
            </td>
            <td style="border: 1px solid black; padding: 3px 2px; text-align: center; font-size: 10pt;">
              ${item.no ? "X" : ""}
            </td>
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
      @page { size: 8.5in 11in; margin: 0.5in; }
      body { 
        font-family: Arial, sans-serif; 
        font-size: 10pt; 
        margin: 0.5in;
        width: 7.5in;
      }
      h1 { 
        text-align: center; 
        font-size: 13pt; 
        margin: 0 0 12pt 0; 
        font-weight: bold;
        text-transform: uppercase;
      }
      .header-table { 
        width: 100%; 
        border-collapse: collapse; 
        margin-bottom: 8pt;
        border: 1px solid black;
      }
      .header-table td { 
        border: 1px solid black; 
        padding: 4px 6px; 
        font-size: 9pt;
      }
      .header-table .label { 
        font-weight: bold; 
        width: 25%; 
        background-color: #e8e8e8;
      }
      .main-table { 
        width: 100%; 
        border-collapse: collapse; 
        margin-bottom: 8pt;
        border: 1px solid black;
      }
      .main-table td { 
        border: 1px solid black;
        padding: 0;
        font-size: 9pt; 
        vertical-align: top;
      }
      .comments-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 8pt;
        border: 1px solid black;
      }
      .comments-table td {
        border: 1px solid black;
        padding: 6px;
        font-size: 9pt;
      }
      .signature-line { 
        border-bottom: 1px solid black; 
        display: inline-block; 
        width: 150px;
        margin: 0 10px;
      }
    `
  }
}
