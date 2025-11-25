/**
 * Componente de sección de comentarios adicionales
 */

interface CommentsSectionProps {
  additionalComments: string
  onCommentsChange: (value: string) => void
}

export function CommentsSection({ additionalComments, onCommentsChange }: CommentsSectionProps) {
  return (
    <div className="border border-black mb-2 p-1">
      <span className="font-bold text-[10px]">Additional Comments: </span>
      <input
        type="text"
        value={additionalComments}
        onChange={(e) => onCommentsChange(e.target.value)}
        placeholder="[Inspector's additional comments or observations]"
        className="text-[10px] w-full border-b border-neutral-400 outline-none bg-transparent"
      />
    </div>
  )
}
