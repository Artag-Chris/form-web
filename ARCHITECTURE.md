# Arquitectura del Proyecto - Formularios Escalables

## 📋 Descripción General

Este proyecto implementa un sistema escalable para crear, gestionar y exportar formularios dinámicos. La arquitectura está diseñada para soportar múltiples formularios con funcionalidades comunes como:

- Persistencia de datos (localStorage)
- Exportación a múltiples formatos (Word, Excel)
- Validación de datos
- Compartir formularios
- Auto-guardado

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout raíz con ThemeProvider
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
│
├── components/
│   ├── forms/              # Componentes de formularios
│   │   ├── SafetyInspectionForm.tsx    # Contenedor principal
│   │   ├── FormHeader.tsx              # Encabezado con metadatos
│   │   ├── ChecklistSection.tsx        # Sección de checklist
│   │   ├── ActionBar.tsx               # Barra de acciones
│   │   ├── CommentsSection.tsx         # Sección de comentarios
│   │   └── SignatureSection.tsx        # Sección de firma
│   └── theme-provider.tsx  # Proveedor de temas
│
├── hooks/
│   └── useInspectionForm.ts    # Hook para gestionar estado del formulario
│
├── lib/
│   ├── constants.ts            # Configuraciones y constantes
│   ├── validation.ts           # Esquemas de validación (Zod)
│   ├── storage.ts              # Utilidades de persistencia
│   └── exporters/
│       ├── base-exporter.ts    # Clase base para exportadores
│       ├── word-exporter.ts    # Exportador a Word
│       ├── csv-exporter.ts     # Exportador a CSV/Excel
│       └── index.ts            # Exportadores centralizados
│
└── types/
    └── index.ts            # Tipos TypeScript compartidos
```

## 🔑 Conceptos Clave

### 1. **Tipos Compartidos** (`src/types/index.ts`)

Define la estructura de datos para todos los formularios:

```typescript
interface ChecklistItem {
  id: string
  question: string
  yes: boolean | null
  no: boolean | null
}

interface Section {
  id: string
  title: string
  items: ChecklistItem[]
}

interface FormState {
  // Metadatos
  inspectorName: string
  projectName: string
  dateOfInspection: string
  location: string
  additionalComments: string
  inspectorSignature: string
  signatureDate: string
  // Secciones
  leftSections: Section[]
  rightSections: Section[]
}
```

### 2. **Configuración de Formularios** (`src/lib/constants.ts`)

Cada formulario tiene una configuración que define sus secciones y preguntas:

```typescript
export const SAFETY_INSPECTION_CONFIG: FormConfig = {
  id: "safety-inspection",
  title: "Construction Safety Inspection Form",
  leftSections: [...],
  rightSections: [...]
}
```

### 3. **Validación** (`src/lib/validation.ts`)

Usa Zod para validar datos:

```typescript
const FormStateSchema = z.object({
  inspectorName: z.string().min(1),
  projectName: z.string().min(1),
  // ...
})
```

### 4. **Persistencia** (`src/lib/storage.ts`)

Auto-guarda el estado en localStorage:

```typescript
saveFormState(formId, state)    // Guardar
loadFormState(formId)           // Cargar
clearFormState(formId)          // Limpiar
```

### 5. **Exportadores** (`src/lib/exporters/`)

Patrón Strategy para exportar a diferentes formatos:

```typescript
// Clase base
abstract class BaseExporter {
  abstract generateContent(): string
  abstract getFileExtension(): string
  abstract getMimeType(): string
}

// Implementaciones específicas
class WordExporter extends BaseExporter { ... }
class CSVExporter extends BaseExporter { ... }
```

### 6. **Hook Personalizado** (`src/hooks/useInspectionForm.ts`)

Gestiona todo el estado del formulario:

```typescript
const {
  formState,           // Estado actual
  isDirty,            // Si hay cambios sin guardar
  hasDraft,           // Si hay borrador guardado
  updateMetadata,     // Actualizar metadatos
  handleCheckboxChange, // Cambiar checkbox
  resetForm,          // Resetear formulario
  discardDraft        // Descartar borrador
} = useInspectionForm({ formId, initialState })
```

### 7. **Componentes Modulares** (`src/components/forms/`)

Cada componente tiene una responsabilidad única:

- **FormHeader**: Entrada de metadatos
- **ChecklistSection**: Renderiza una sección de checklist
- **ActionBar**: Botones de descarga, compartir, reset
- **CommentsSection**: Comentarios adicionales
- **SignatureSection**: Firma y fecha
- **SafetyInspectionForm**: Contenedor que orquesta todo

## 🚀 Cómo Agregar un Nuevo Formulario

### Paso 1: Crear la Configuración

```typescript
// src/lib/constants.ts
export const NEW_FORM_CONFIG: FormConfig = {
  id: "new-form",
  title: "New Form Title",
  leftSections: [
    {
      id: "section-1",
      title: "Section Title",
      items: [
        {
          id: "item-1",
          question: "Question?",
          yes: null,
          no: null
        }
      ]
    }
  ],
  rightSections: [...]
}
```

### Paso 2: Crear el Componente

```typescript
// src/components/forms/NewForm.tsx
"use client"

import { useInspectionForm } from "@/hooks/useInspectionForm"
import { NEW_FORM_CONFIG } from "@/lib/constants"
import { exportForm } from "@/lib/exporters"
// ... importar componentes

export function NewForm() {
  const { formState, isDirty, ... } = useInspectionForm({
    formId: NEW_FORM_CONFIG.id,
    initialState: { ... }
  })

  // Usar los mismos componentes modulares
  return (
    <div>
      <ActionBar ... />
      <FormHeader ... />
      {/* ... */}
    </div>
  )
}
```

### Paso 3: Agregar a la Página Principal

```typescript
// src/app/page.tsx
import { SafetyInspectionForm } from "@/components/forms/SafetyInspectionForm"
import { NewForm } from "@/components/forms/NewForm"

export default function Page() {
  return (
    <main>
      <SafetyInspectionForm />
      <NewForm />
      {/* Tercer formulario */}
    </main>
  )
}
```

## 📊 Flujo de Datos

```
Usuario interactúa con UI
        ↓
Componente dispara evento
        ↓
Hook actualiza estado (useInspectionForm)
        ↓
Auto-guardado en localStorage (1s debounce)
        ↓
Componente se re-renderiza
        ↓
Usuario descarga/comparte
        ↓
Exportador genera contenido
        ↓
Archivo se descarga
```

## 🔄 Ciclo de Vida del Formulario

1. **Montaje**: Carga borrador guardado si existe
2. **Edición**: Usuario completa el formulario
3. **Auto-guardado**: Cada cambio se guarda automáticamente
4. **Exportación**: Usuario descarga en Word/Excel
5. **Compartir**: Usuario comparte el enlace
6. **Reset**: Usuario limpia el formulario

## 🎯 Ventajas de esta Arquitectura

✅ **Escalable**: Agregar nuevos formularios es trivial
✅ **Mantenible**: Componentes pequeños y enfocados
✅ **Reutilizable**: Componentes y hooks compartidos
✅ **Testeable**: Lógica separada de UI
✅ **Persistente**: Auto-guardado automático
✅ **Flexible**: Fácil agregar nuevos formatos de exportación
✅ **Type-safe**: TypeScript en todo el proyecto
✅ **Validado**: Zod para validación de datos

## 🔧 Próximos Pasos

1. Agregar tests unitarios
2. Agregar tests de integración
3. Implementar más formatos de exportación (PDF, JSON)
4. Agregar autenticación y sincronización en la nube
5. Crear panel de administración para gestionar formularios
6. Agregar análisis de datos de formularios completados
