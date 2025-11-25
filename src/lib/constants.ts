/**
 * Constantes y configuraciones de formularios
 */

import type { FormConfig } from "@/types"

export const SAFETY_INSPECTION_CONFIG: FormConfig = {
  id: "safety-inspection",
  title: "Construction Safety Inspection Form",
  description: "US Letter - 11 x 8.5 Inch - Google Docs (Word Document)",
  leftSections: [
    {
      id: "general-site",
      title: "General Site Conditions",
      items: [
        {
          id: "ppe-1",
          question: "Are all workers wearing appropriate PPE?",
          yes: null,
          no: null,
        },
        {
          id: "access-1",
          question: "Are access routes clear and well-marked?",
          yes: null,
          no: null,
        },
        {
          id: "fire-1",
          question: "Are fire extinguishers accessible and fully charged?",
          yes: null,
          no: null,
        },
        {
          id: "debris-1",
          question: "Is the site free from excessive debris?",
          yes: null,
          no: null,
        },
        {
          id: "personnel-1",
          question: "Any signs of unauthorized personnel?",
          yes: null,
          no: null,
        },
      ],
    },
    {
      id: "working-heights",
      title: "Working at Heights",
      items: [
        {
          id: "guardrails-1",
          question: "Are guardrails in place and secure?",
          yes: null,
          no: null,
        },
        {
          id: "fall-protection-1",
          question: "Are workers using fall protection equipment?",
          yes: null,
          no: null,
        },
        {
          id: "scaffolding-1",
          question: "Is scaffolding properly erected and inspected?",
          yes: null,
          no: null,
        },
        {
          id: "ladders-1",
          question: "Are ladders in good condition and used correctly?",
          yes: null,
          no: null,
        },
      ],
    },
    {
      id: "electrical-safety",
      title: "Electrical Safety",
      items: [
        {
          id: "cords-1",
          question: "Are electrical cords in good condition?",
          yes: null,
          no: null,
        },
        {
          id: "outlets-1",
          question: "Are outlets and panels properly covered?",
          yes: null,
          no: null,
        },
        {
          id: "gfci-1",
          question: "Is there GFCI protection where required?",
          yes: null,
          no: null,
        },
        {
          id: "lockout-1",
          question: "Are lockout/tagout procedures followed?",
          yes: null,
          no: null,
        },
      ],
    },
  ],
  rightSections: [
    {
      id: "machinery",
      title: "Machinery and Equipment",
      items: [
        {
          id: "tools-1",
          question: "Are tools and equipment properly maintained?",
          yes: null,
          no: null,
        },
        {
          id: "operators-1",
          question: "Are operators trained and authorized?",
          yes: null,
          no: null,
        },
        {
          id: "secured-1",
          question: "Is heavy equipment secured against unauthorized use?",
          yes: null,
          no: null,
        },
        {
          id: "guards-1",
          question: "Are safety guards in place and functional?",
          yes: null,
          no: null,
        },
      ],
    },
    {
      id: "hazardous-materials",
      title: "Hazardous Materials",
      items: [
        {
          id: "labeled-1",
          question: "Are hazardous materials properly labeled and stored?",
          yes: null,
          no: null,
        },
        {
          id: "spill-1",
          question: "Is there a spill containment plan?",
          yes: null,
          no: null,
        },
        {
          id: "trained-1",
          question: "Are workers trained in hazardous material handling?",
          yes: null,
          no: null,
        },
        {
          id: "ppe-2",
          question: "Is PPE provided and used correctly?",
          yes: null,
          no: null,
        },
      ],
    },
    {
      id: "emergency-prep",
      title: "Emergency Preparedness",
      items: [
        {
          id: "exits-1",
          question: "Are emergency exits clearly marked and unobstructed?",
          yes: null,
          no: null,
        },
        {
          id: "evacuation-1",
          question: "Is there an evacuation plan in place?",
          yes: null,
          no: null,
        },
        {
          id: "alarms-1",
          question: "Are fire alarms and extinguishers tested regularly?",
          yes: null,
          no: null,
        },
        {
          id: "contacts-1",
          question: "Is there an emergency contact list available?",
          yes: null,
          no: null,
        },
      ],
    },
  ],
}

export const STORAGE_KEYS = {
  SAFETY_INSPECTION: "form_safety_inspection",
  FORM_DRAFT: "form_draft_",
} as const

export const EQUIPMENT_INSPECTION_CONFIG: FormConfig = {
  id: "equipment-inspection",
  title: "Equipment Inspection Form",
  description: "Complete equipment maintenance and safety inspection",
  leftSections: [
    {
      id: "equipment-condition",
      title: "Equipment Condition",
      items: [
        {
          id: "eq-cond-1",
          question: "Is equipment clean and free of debris?",
          yes: null,
          no: null,
        },
        {
          id: "eq-cond-2",
          question: "Are all parts functioning properly?",
          yes: null,
          no: null,
        },
        {
          id: "eq-cond-3",
          question: "Is maintenance log up to date?",
          yes: null,
          no: null,
        },
        {
          id: "eq-cond-4",
          question: "Are there any visible signs of wear or damage?",
          yes: null,
          no: null,
        },
      ],
    },
    {
      id: "safety-features",
      title: "Safety Features",
      items: [
        {
          id: "sf-1",
          question: "Are emergency stops accessible and functional?",
          yes: null,
          no: null,
        },
        {
          id: "sf-2",
          question: "Are warning labels visible and legible?",
          yes: null,
          no: null,
        },
        {
          id: "sf-3",
          question: "Are safety guards in place?",
          yes: null,
          no: null,
        },
        {
          id: "sf-4",
          question: "Is protective equipment available?",
          yes: null,
          no: null,
        },
      ],
    },
  ],
  rightSections: [
    {
      id: "operational-status",
      title: "Operational Status",
      items: [
        {
          id: "os-1",
          question: "Equipment starts without issues?",
          yes: null,
          no: null,
        },
        {
          id: "os-2",
          question: "All gauges reading normally?",
          yes: null,
          no: null,
        },
        {
          id: "os-3",
          question: "No unusual noises or vibrations?",
          yes: null,
          no: null,
        },
        {
          id: "os-4",
          question: "Performance meets specifications?",
          yes: null,
          no: null,
        },
      ],
    },
    {
      id: "documentation",
      title: "Documentation",
      items: [
        {
          id: "doc-1",
          question: "Certification current and valid?",
          yes: null,
          no: null,
        },
        {
          id: "doc-2",
          question: "Inspection records available?",
          yes: null,
          no: null,
        },
        {
          id: "doc-3",
          question: "Maintenance schedule followed?",
          yes: null,
          no: null,
        },
        {
          id: "doc-4",
          question: "All required permits in place?",
          yes: null,
          no: null,
        },
      ],
    },
  ],
}

export const PARTS_REQUEST_CONFIG: FormConfig = {
  id: "parts-request",
  title: "Parts List Request Form",
  description: "Request and track equipment parts and components",
  leftSections: [
    {
      id: "part-details",
      title: "Part Details",
      items: [
        {
          id: "pd-1",
          question: "Part number clearly identified?",
          yes: null,
          no: null,
        },
        {
          id: "pd-2",
          question: "Part description accurate and complete?",
          yes: null,
          no: null,
        },
        {
          id: "pd-3",
          question: "Quantity specified correctly?",
          yes: null,
          no: null,
        },
        {
          id: "pd-4",
          question: "Unit price provided?",
          yes: null,
          no: null,
        },
      ],
    },
    {
      id: "supplier-info",
      title: "Supplier Information",
      items: [
        {
          id: "si-1",
          question: "Supplier name and contact provided?",
          yes: null,
          no: null,
        },
        {
          id: "si-2",
          question: "Lead time specified?",
          yes: null,
          no: null,
        },
        {
          id: "si-3",
          question: "Availability confirmed?",
          yes: null,
          no: null,
        },
        {
          id: "si-4",
          question: "Warranty information included?",
          yes: null,
          no: null,
        },
      ],
    },
  ],
  rightSections: [
    {
      id: "approval-status",
      title: "Approval Status",
      items: [
        {
          id: "as-1",
          question: "Budget approved?",
          yes: null,
          no: null,
        },
        {
          id: "as-2",
          question: "Manager approval obtained?",
          yes: null,
          no: null,
        },
        {
          id: "as-3",
          question: "Compliance verified?",
          yes: null,
          no: null,
        },
        {
          id: "as-4",
          question: "Ready for procurement?",
          yes: null,
          no: null,
        },
      ],
    },
    {
      id: "delivery-tracking",
      title: "Delivery & Tracking",
      items: [
        {
          id: "dt-1",
          question: "Delivery address confirmed?",
          yes: null,
          no: null,
        },
        {
          id: "dt-2",
          question: "Tracking number assigned?",
          yes: null,
          no: null,
        },
        {
          id: "dt-3",
          question: "Expected delivery date set?",
          yes: null,
          no: null,
        },
        {
          id: "dt-4",
          question: "Inspection plan in place?",
          yes: null,
          no: null,
        },
      ],
    },
  ],
}

export const MONTH_NAMES = [
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
] as const
