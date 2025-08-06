# Perbaikan Masalah ID Mentah di PDF

## Masalah
PDF menampilkan ID database mentah seperti `cmdzh7vin0002wbck1pj585ii` alih-alih nama yang sebenarnya.

## Penyebab
1. **Form New Page**: Data yang dikirim ke komponen PDF masih berupa ID, bukan nama asli
2. **Item Selection**: ID disimpan dalam state, tapi nama tidak di-resolve untuk PDF
3. **PDF Component**: Komponen `FormPDF` lama tidak mendapat data yang sudah di-resolve

## Solusi yang Diterapkan

### 1. **Perbaikan di Form New (`/app/forms/new/page.tsx`)**

#### A. Resolve Data untuk PDF
```tsx
// Sebelum:
formSubmittedData.current = {
  formData: { ...formData },
  items: [...items],
};

// Sesudah:
const pdfFormData = {
  project: selectedProject?.name || formData.project,
  type: formData.type,
  projectOfficer: selectedOfficer?.name || formData.projectOfficer,
  submissionDate: formData.submissionDate,
  description: formData.description,
  notes: formData.notes
};

const pdfItems = items.map((item) => {
  const supplyItem = supplyItemsData.find((si) => si.id === item.itemName);
  return {
    id: item.id,
    itemName: supplyItem?.name || item.itemName,
    quantity: item.quantity,
    unit: supplyItem?.unit || item.unit,
    specifications: supplyItem?.specifications || item.specifications,
    notes: item.notes,
  };
});

formSubmittedData.current = {
  formData: pdfFormData,
  items: pdfItems,
};
```

#### B. Perbaikan Item Selection
```tsx
// Sebelum: Cari berdasarkan nama
const selectedItem = supplyItemsData.find((si) => si.name === value)

// Sesudah: Cari berdasarkan ID (yang benar)
const selectedItem = supplyItemsData.find((si) => si.id === value)
```

### 2. **Perbaikan di Form PDF (`/components/form-pdf.tsx`)**

#### A. Format Tanggal Konsisten
```tsx
// Sebelum:
{createdDate.toLocaleDateString()}

// Sesudah:
{createdDate.toLocaleDateString('id-ID')}
```

### 3. **Komponen Baru: DatabaseFormPDF**
Untuk form yang sudah tersimpan di database, gunakan `DatabaseFormPDF` yang:
- Mengambil data langsung dari database
- Menampilkan informasi lengkap (nama, jabatan, email, dll)
- Sudah termasuk error handling

## Hasil Setelah Perbaikan

### Sebelum:
```
Proyek: cmdzh7vin0002wbck1pj585ii
Petugas: cmdzg0rkc0000wbckdtm5o3va
Item: cmdzl2n88000bwbck0zjlo1bk
```

### Sesudah:
```
Proyek: Mall Downtown Fase 2
Petugas: Rizal Habib
Item: Semen Portland 40kg
```

## Penggunaan

### 1. **Form Baru (belum tersimpan)**
Gunakan komponen PDF lama dengan data yang sudah di-resolve:
```tsx
<PDFPreviewerWrapper
  formData={formSubmittedData.current.formData} // Sudah berisi nama
  items={formSubmittedData.current.items}       // Sudah berisi nama
/>
```

### 2. **Form yang sudah tersimpan**
Gunakan komponen DatabaseFormPDF:
```tsx
<DatabaseFormPDFWrapper 
  formId="form-id-here"
  mode="download"
/>
```

## Testing
✅ Form baru menampilkan nama yang benar
✅ Form tersimpan menampilkan data lengkap
✅ Error handling untuk data kosong
✅ Format Indonesia untuk tanggal
