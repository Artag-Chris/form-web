/**
 * Componente para renderizar una sección de checklist
 */

import type { Section } from "@/types"

interface ChecklistSectionProps {
  section: Section
  sectionIndex: number
  side: "left" | "right"
  onCheckboxChange: (sectionIndex: number, itemIndex: number, field: "yes" | "no") => void
}

export function ChecklistSection({
  section,
  sectionIndex,
  side,
  onCheckboxChange,
}: ChecklistSectionProps) {
  return (
    <div className="mb-1">
      <div className="font-bold text-[10px] border-b border-black pb-0.5 mb-0.5">{section.title}</div>
      {section.items.map((item, itemIndex) => (
        <div key={item.id} className="flex items-start text-[9px] py-0.5 border-b border-neutral-300">
          <span className="flex-1 pr-1">{item.question}</span>
          <div className="flex gap-1 shrink-0">
            <label className="flex items-center gap-0.5 cursor-pointer">
              <input
                type="checkbox"
                checked={item.yes === true}
                onChange={() => onCheckboxChange(sectionIndex, itemIndex, "yes")}
                className="w-3 h-3 accent-blue-600"
              />
            </label>
            <label className="flex items-center gap-0.5 cursor-pointer">
              <input
                type="checkbox"
                checked={item.no === true}
                onChange={() => onCheckboxChange(sectionIndex, itemIndex, "no")}
                className="w-3 h-3 accent-blue-600"
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  )
}
