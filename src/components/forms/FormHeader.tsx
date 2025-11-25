/**
 * Componente de encabezado del formulario
 */

import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { MONTH_NAMES } from "@/lib/constants"

interface FormHeaderProps {
  inspectorName: string
  projectName: string
  dateOfInspection: string
  location: string
  onInspectorNameChange: (value: string) => void
  onProjectNameChange: (value: string) => void
  onDateChange: (value: string) => void
  onLocationChange: (value: string) => void
}

export function FormHeader({
  inspectorName,
  projectName,
  dateOfInspection,
  location,
  onInspectorNameChange,
  onProjectNameChange,
  onDateChange,
  onLocationChange,
}: FormHeaderProps) {
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const formatDateForInput = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day)
    onDateChange(formatDateForInput(selectedDate))
    setShowCalendar(false)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCalendarDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendar = () => {
    const year = calendarDate.getFullYear()
    const month = calendarDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-7 h-7" />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(day)}
          className="w-7 h-7 text-xs hover:bg-blue-100 rounded flex items-center justify-center transition-colors"
        >
          {day}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="border border-black mb-2">
      <div className="text-center font-bold text-sm py-1 border-b border-black">
        Construction Safety Inspection Form
      </div>
      <div className="grid grid-cols-2">
        <div className="border-r border-b border-black p-1">
          <span className="font-bold text-[10px]">Inspector&apos;s Name: </span>
          <input
            type="text"
            value={inspectorName}
            onChange={(e) => onInspectorNameChange(e.target.value)}
            placeholder="[Inspector's Name]"
            className="text-[10px] border-b border-neutral-400 outline-none w-32 bg-transparent"
          />
        </div>
        <div className="border-b border-black p-1">
          <span className="font-bold text-[10px]">Date of Inspection: </span>
          <div className="inline-flex items-center relative" ref={calendarRef}>
            <input
              type="text"
              value={dateOfInspection}
              onChange={(e) => onDateChange(e.target.value)}
              placeholder="[Date]"
              className="text-[10px] border-b border-neutral-400 outline-none w-20 bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              className="ml-1 text-blue-600 hover:text-blue-800"
            >
              <Calendar size={12} />
            </button>
            {showCalendar && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-300 rounded shadow-lg z-20 p-2 w-48">
                <div className="flex items-center justify-between mb-2">
                  <button
                    type="button"
                    onClick={() => navigateMonth("prev")}
                    className="p-1 hover:bg-neutral-100 rounded"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <span className="text-xs font-medium">
                    {MONTH_NAMES[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                  </span>
                  <button
                    type="button"
                    onClick={() => navigateMonth("next")}
                    className="p-1 hover:bg-neutral-100 rounded"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={i} className="text-[9px] font-medium text-neutral-500 w-7">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-0.5">{renderCalendar()}</div>
              </div>
            )}
          </div>
        </div>
        <div className="border-r border-black p-1">
          <span className="font-bold text-[10px]">Project Name: </span>
          <input
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            placeholder="[Project Name]"
            className="text-[10px] border-b border-neutral-400 outline-none w-32 bg-transparent"
          />
        </div>
        <div className="p-1">
          <span className="font-bold text-[10px]">Location: </span>
          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="[Specific location or area of inspection]"
            className="text-[10px] border-b border-neutral-400 outline-none w-44 bg-transparent"
          />
        </div>
      </div>
    </div>
  )
}
