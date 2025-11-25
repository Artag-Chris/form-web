import { SafetyInspectionForm } from "@/components/safety-inspection-form"

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-800 tracking-wide mb-1">
          CONSTRUCTION SAFETY INSPECTION FORM
        </h1>
        <p className="text-center text-blue-600 text-sm mb-6">
          📄 US Letter - 11 x 8.5 Inch - Google Docs (Word Document) 📄
        </p>

        <SafetyInspectionForm />

        <p className="text-center font-bold text-neutral-800 mt-4">
          Editable, Printable, Digital File, Digital Download
        </p>
      </div>
    </main>
  )
}
