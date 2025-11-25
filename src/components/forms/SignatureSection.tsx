/**
 * Componente de sección de firma
 */

interface SignatureSectionProps {
  inspectorSignature: string
  signatureDate: string
  onSignatureChange: (value: string) => void
  onSignatureDateChange: (value: string) => void
}

export function SignatureSection({
  inspectorSignature,
  signatureDate,
  onSignatureChange,
  onSignatureDateChange,
}: SignatureSectionProps) {
  return (
    <div className="flex justify-between items-end mt-2">
      <div className="flex-1">
        <span className="font-bold text-[10px]">Inspector&apos;s Signature: </span>
        <input
          type="text"
          value={inspectorSignature}
          onChange={(e) => onSignatureChange(e.target.value)}
          className="text-[10px] border-b border-black outline-none w-40 bg-transparent"
        />
      </div>
      <div>
        <span className="font-bold text-[10px]">Date: </span>
        <input
          type="text"
          value={signatureDate}
          onChange={(e) => onSignatureDateChange(e.target.value)}
          className="text-[10px] border-b border-black outline-none w-24 bg-transparent"
        />
      </div>
    </div>
  )
}
