/**
 * Barra de acciones para descargar y compartir
 */

import { Download, Share2, FileText, FileSpreadsheet } from "lucide-react"
import { useState } from "react"
import type { ExportFormat } from "@/types"

interface ActionBarProps {
  onDownload: (format: ExportFormat) => void
  onShare: () => void
  onReset: () => void
  isDirty: boolean
}

export function ActionBar({ onDownload, onShare, onReset, isDirty }: ActionBarProps) {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)

  const handleReset = () => {
    if (isDirty && !confirm("Are you sure you want to discard all changes?")) {
      return
    }
    onReset()
  }

  return (
    <div className="bg-neutral-100 border-b border-neutral-300 p-2 flex justify-end gap-2 print:hidden">
      <div className="relative">
        <button
          onClick={() => setShowDownloadMenu(!showDownloadMenu)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
        >
          <Download size={14} />
          Download
        </button>
        {showDownloadMenu && (
          <div className="absolute right-0 mt-1 bg-white border border-neutral-300 rounded shadow-lg z-10">
            <button
              onClick={() => {
                onDownload("word")
                setShowDownloadMenu(false)
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-xs hover:bg-neutral-100 text-left"
            >
              <FileText size={14} className="text-blue-600" />
              Word (.doc)
            </button>
            <button
              onClick={() => {
                onDownload("excel")
                setShowDownloadMenu(false)
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-xs hover:bg-neutral-100 text-left border-t border-neutral-200"
            >
              <FileSpreadsheet size={14} className="text-green-600" />
              Excel (.csv)
            </button>
          </div>
        )}
      </div>
      <button
        onClick={onShare}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-600 text-white text-xs font-medium rounded hover:bg-neutral-700 transition-colors"
      >
        <Share2 size={14} />
        Share
      </button>
      <button
        onClick={handleReset}
        disabled={!isDirty}
        className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Reset
      </button>
    </div>
  )
}
