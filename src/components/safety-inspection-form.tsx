"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Share2, FileText, FileSpreadsheet, Calendar, ChevronLeft, ChevronRight } from "lucide-react"

interface ChecklistItem {
  question: string
  yes: boolean | null
  no: boolean | null
}

interface Section {
  title: string
  items: ChecklistItem[]
}

export function SafetyInspectionForm() {
  const [inspectorName, setInspectorName] = useState("")
  const [projectName, setProjectName] = useState("")
  const [dateOfInspection, setDateOfInspection] = useState("")
  const [location, setLocation] = useState("")
  const [additionalComments, setAdditionalComments] = useState("")
  const [inspectorSignature, setInspectorSignature] = useState("")
  const [signatureDate, setSignatureDate] = useState("")

  const [showDownloadMenu, setShowDownloadMenu] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())
  const calendarRef = useRef<HTMLDivElement>(null)

  const [leftSections, setLeftSections] = useState<Section[]>([
    {
      title: "General Site Conditions",
      items: [
        { question: "Are all workers wearing appropriate PPE?", yes: null, no: null },
        { question: "Are access routes clear and well-marked?", yes: null, no: null },
        { question: "Are fire extinguishers accessible and fully charged?", yes: null, no: null },
        { question: "Is the site free from excessive debris?", yes: null, no: null },
        { question: "Any signs of unauthorized personnel?", yes: null, no: null },
      ],
    },
    {
      title: "Working at Heights",
      items: [
        { question: "Are guardrails in place and secure?", yes: null, no: null },
        { question: "Are workers using fall protection equipment?", yes: null, no: null },
        { question: "Is scaffolding properly erected and inspected?", yes: null, no: null },
        { question: "Are ladders in good condition and used correctly?", yes: null, no: null },
      ],
    },
    {
      title: "Electrical Safety",
      items: [
        { question: "Are electrical cords in good condition?", yes: null, no: null },
        { question: "Are outlets and panels properly covered?", yes: null, no: null },
        { question: "Is there GFCI protection where required?", yes: null, no: null },
        { question: "Are lockout/tagout procedures followed?", yes: null, no: null },
      ],
    },
  ])

  const [rightSections, setRightSections] = useState<Section[]>([
    {
      title: "Machinery and Equipment",
      items: [
        { question: "Are tools and equipment properly maintained?", yes: null, no: null },
        { question: "Are operators trained and authorized?", yes: null, no: null },
        { question: "Is heavy equipment secured against unauthorized use?", yes: null, no: null },
        { question: "Are safety guards in place and functional?", yes: null, no: null },
      ],
    },
    {
      title: "Hazardous Materials",
      items: [
        { question: "Are hazardous materials properly labeled and stored?", yes: null, no: null },
        { question: "Is there a spill containment plan?", yes: null, no: null },
        { question: "Are workers trained in hazardous material handling?", yes: null, no: null },
        { question: "Is PPE provided and used correctly?", yes: null, no: null },
      ],
    },
    {
      title: "Emergency Preparedness",
      items: [
        { question: "Are emergency exits clearly marked and unobstructed?", yes: null, no: null },
        { question: "Is there an evacuation plan in place?", yes: null, no: null },
        { question: "Are fire alarms and extinguishers tested regularly?", yes: null, no: null },
        { question: "Is there an emergency contact list available?", yes: null, no: null },
      ],
    },
  ])

  const handleCheckboxChange = (
    side: "left" | "right",
    sectionIndex: number,
    itemIndex: number,
    field: "yes" | "no",
  ) => {
    const updateSection = (sections: Section[]) => {
      const newSections = [...sections]
      const item = newSections[sectionIndex].items[itemIndex]
      if (field === "yes") {
        item.yes = !item.yes
        if (item.yes) item.no = false
      } else {
        item.no = !item.no
        if (item.no) item.yes = false
      }
      return newSections
    }

    if (side === "left") {
      setLeftSections(updateSection(leftSections))
    } else {
      setRightSections(updateSection(rightSections))
    }
  }

  const downloadAsWord = () => {
    const formData = generateFormContent()
    const blob = new Blob([formData], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `construction_safety_inspection_${new Date().toISOString().split("T")[0]}.doc`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setShowDownloadMenu(false)
  }

  const downloadAsExcel = () => {
    const csvContent = generateCSVContent()
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `construction_safety_inspection_${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setShowDownloadMenu(false)
  }

  const generateFormContent = () => {
    let content = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
      <head>
        <meta charset="utf-8">
        <title>Construction Safety Inspection Form</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 11pt; margin: 40px; }
          h1 { text-align: center; font-size: 14pt; margin-bottom: 20px; }
          .header-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          .header-table td { border: 1px solid black; padding: 5px 8px; font-size: 10pt; }
          .header-table .label { font-weight: bold; width: 25%; }
          .main-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          .main-table td, .main-table th { border: 1px solid black; padding: 3px 5px; font-size: 9pt; vertical-align: top; }
          .section-title { font-weight: bold; font-size: 9pt; border-bottom: 1px solid black; padding-bottom: 3px; margin-bottom: 5px; }
          .question-row { display: flex; justify-content: space-between; padding: 2px 0; border-bottom: 1px solid #ccc; font-size: 9pt; }
          .checkbox-col { width: 30px; text-align: center; }
          .yes-no-header { text-align: center; font-weight: bold; font-size: 8pt; }
          .comments-box { border: 1px solid black; padding: 8px; margin-bottom: 15px; font-size: 10pt; }
          .signature-section { margin-top: 20px; font-size: 10pt; }
          .signature-line { border-bottom: 1px solid black; display: inline-block; width: 200px; }
        </style>
      </head>
      <body>
        <h1>Construction Safety Inspection Form</h1>
        
        <!-- Header Information -->
        <table class="header-table">
          <tr>
            <td class="label">Inspector's Name:</td>
            <td>${inspectorName || "[Inspector's Name]"}</td>
            <td class="label">Date of Inspection:</td>
            <td>${dateOfInspection || "[Date]"}</td>
          </tr>
          <tr>
            <td class="label">Project Name:</td>
            <td>${projectName || "[Project Name]"}</td>
            <td class="label">Location:</td>
            <td>${location || "[Specific location or area of inspection]"}</td>
          </tr>
        </table>
        
        <!-- Two Column Checklist Layout -->
        <table class="main-table">
          <tr>
            <td style="width: 50%; vertical-align: top;">
              <!-- Left Column -->
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: none; padding: 0;">
                    <table style="width: 100%; border: none;">
                      <tr>
                        <td style="border: none; text-align: right; padding-right: 5px;">
                          <span style="font-size: 8pt; font-weight: bold;">YES</span>
                          <span style="font-size: 8pt; font-weight: bold; margin-left: 10px;">NO</span>
                        </td>
                      </tr>
                    </table>
    `

    // Left sections
    leftSections.forEach((section) => {
      content += `
                    <div class="section-title">${section.title}</div>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
      `
      section.items.forEach((item) => {
        content += `
                      <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: none; padding: 2px 0; font-size: 9pt;">${item.question}</td>
                        <td style="border: none; width: 25px; text-align: center;">${item.yes ? "☑" : "☐"}</td>
                        <td style="border: none; width: 25px; text-align: center;">${item.no ? "☑" : "☐"}</td>
                      </tr>
        `
      })
      content += `</table>`
    })

    content += `
                  </td>
                </tr>
              </table>
            </td>
            <td style="width: 50%; vertical-align: top;">
              <!-- Right Column -->
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: none; padding: 0;">
                    <table style="width: 100%; border: none;">
                      <tr>
                        <td style="border: none; text-align: right; padding-right: 5px;">
                          <span style="font-size: 8pt; font-weight: bold;">YES</span>
                          <span style="font-size: 8pt; font-weight: bold; margin-left: 10px;">NO</span>
                        </td>
                      </tr>
                    </table>
    `

    // Right sections
    rightSections.forEach((section) => {
      content += `
                    <div class="section-title">${section.title}</div>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
      `
      section.items.forEach((item) => {
        content += `
                      <tr style="border-bottom: 1px solid #ddd;">
                        <td style="border: none; padding: 2px 0; font-size: 9pt;">${item.question}</td>
                        <td style="border: none; width: 25px; text-align: center;">${item.yes ? "☑" : "☐"}</td>
                        <td style="border: none; width: 25px; text-align: center;">${item.no ? "☑" : "☐"}</td>
                      </tr>
        `
      })
      content += `</table>`
    })

    content += `
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <!-- Additional Comments -->
        <div class="comments-box">
          <strong>Additional Comments:</strong> ${additionalComments || "[Inspector's additional comments or observations]"}
        </div>
        
        <!-- Signature Section -->
        <table style="width: 100%; margin-top: 20px;">
          <tr>
            <td style="border: none; width: 50%;">
              <strong>Inspector's Signature:</strong> <span class="signature-line">${inspectorSignature || ""}</span>
            </td>
            <td style="border: none; width: 50%;">
              <strong>Date:</strong> <span class="signature-line">${signatureDate || ""}</span>
            </td>
          </tr>
        </table>
        
        <p style="text-align: center; margin-top: 30px; font-weight: bold; font-size: 10pt;">
          Editable, Printable, Digital File, Digital Download
        </p>
      </body>
      </html>
    `

    return content
  }

  const generateCSVContent = () => {
    let csv = "Construction Safety Inspection Form\n\n"
    csv += `Inspector's Name,${inspectorName || "[Inspector's Name]"}\n`
    csv += `Project Name,${projectName || "[Project Name]"}\n`
    csv += `Date of Inspection,${dateOfInspection || "[Date]"}\n`
    csv += `Location,${location || "[Specific location or area of inspection]"}\n\n`
    csv += "Section,Question,YES,NO\n"
    ;[...leftSections, ...rightSections].forEach((section) => {
      section.items.forEach((item) => {
        csv += `"${section.title}","${item.question}",${item.yes ? "X" : ""},${item.no ? "X" : ""}\n`
      })
    })

    csv += `\nAdditional Comments,"${additionalComments || "[No comments]"}"\n`
    csv += `Inspector's Signature,"${inspectorSignature || ""}"\n`
    csv += `Signature Date,"${signatureDate || ""}"\n`

    return csv
  }

  const handleShare = async () => {
    const shareData = {
      title: "Construction Safety Inspection Form",
      text: `Safety Inspection Form - Project: ${projectName || "N/A"} - Inspector: ${inspectorName || "N/A"}`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Link copied to clipboard")
  }

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
    setDateOfInspection(formatDateForInput(selectedDate))
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

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

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

  const renderSection = (section: Section, sectionIndex: number, side: "left" | "right") => (
    <div key={section.title} className="mb-1">
      <div className="font-bold text-[10px] border-b border-black pb-0.5 mb-0.5">{section.title}</div>
      {section.items.map((item, itemIndex) => (
        <div key={itemIndex} className="flex items-start text-[9px] py-0.5 border-b border-neutral-300">
          <span className="flex-1 pr-1">{item.question}</span>
          <div className="flex gap-1 shrink-0">
            <label className="flex items-center gap-0.5 cursor-pointer">
              <input
                type="checkbox"
                checked={item.yes === true}
                onChange={() => handleCheckboxChange(side, sectionIndex, itemIndex, "yes")}
                className="w-3 h-3 accent-blue-600"
              />
            </label>
            <label className="flex items-center gap-0.5 cursor-pointer">
              <input
                type="checkbox"
                checked={item.no === true}
                onChange={() => handleCheckboxChange(side, sectionIndex, itemIndex, "no")}
                className="w-3 h-3 accent-blue-600"
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="bg-white shadow-lg border border-neutral-400 aspect-[11/8.5] flex flex-col max-w-4xl mx-auto">
      {/* Action Bar */}
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
                onClick={downloadAsWord}
                className="flex items-center gap-2 w-full px-4 py-2 text-xs hover:bg-neutral-100 text-left"
              >
                <FileText size={14} className="text-blue-600" />
                Word (.doc)
              </button>
              <button
                onClick={downloadAsExcel}
                className="flex items-center gap-2 w-full px-4 py-2 text-xs hover:bg-neutral-100 text-left border-t border-neutral-200"
              >
                <FileSpreadsheet size={14} className="text-green-600" />
                Excel (.csv)
              </button>
            </div>
          )}
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-600 text-white text-xs font-medium rounded hover:bg-neutral-700 transition-colors"
        >
          <Share2 size={14} />
          Share
        </button>
      </div>

      {/* Form Content */}
      <div className="flex-1 p-3 overflow-auto">
        {/* Header */}
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
                onChange={(e) => setInspectorName(e.target.value)}
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
                  onChange={(e) => setDateOfInspection(e.target.value)}
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
                        {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
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
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="[Project Name]"
                className="text-[10px] border-b border-neutral-400 outline-none w-32 bg-transparent"
              />
            </div>
            <div className="p-1">
              <span className="font-bold text-[10px]">Location: </span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="[Specific location or area of inspection]"
                className="text-[10px] border-b border-neutral-400 outline-none w-44 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Checklist Sections */}
        <div className="border border-black mb-2">
          <div className="grid grid-cols-2">
            {/* Left Column */}
            <div className="border-r border-black p-1">
              <div className="flex justify-end gap-2 text-[8px] font-bold mb-1">
                <span>YES</span>
                <span>NO</span>
              </div>
              {leftSections.map((section, index) => renderSection(section, index, "left"))}
            </div>

            {/* Right Column */}
            <div className="p-1">
              <div className="flex justify-end gap-2 text-[8px] font-bold mb-1">
                <span>YES</span>
                <span>NO</span>
              </div>
              {rightSections.map((section, index) => renderSection(section, index, "right"))}
            </div>
          </div>
        </div>

        {/* Additional Comments */}
        <div className="border border-black mb-2 p-1">
          <span className="font-bold text-[10px]">Additional Comments: </span>
          <input
            type="text"
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
            placeholder="[Inspector's additional comments or observations]"
            className="text-[10px] w-full border-b border-neutral-400 outline-none bg-transparent"
          />
        </div>

        {/* Signature Section */}
        <div className="flex justify-between items-end mt-2">
          <div className="flex-1">
            <span className="font-bold text-[10px]">Inspector&apos;s Signature: </span>
            <input
              type="text"
              value={inspectorSignature}
              onChange={(e) => setInspectorSignature(e.target.value)}
              className="text-[10px] border-b border-black outline-none w-40 bg-transparent"
            />
          </div>
          <div>
            <span className="font-bold text-[10px]">Date: </span>
            <input
              type="text"
              value={signatureDate}
              onChange={(e) => setSignatureDate(e.target.value)}
              className="text-[10px] border-b border-black outline-none w-24 bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
