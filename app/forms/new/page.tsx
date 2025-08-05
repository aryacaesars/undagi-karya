"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ClipboardList, Save, ArrowLeft, Plus, Trash2, FileDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { PDFDownloader, PDFPreviewerWrapper } from "@/components/pdf-renderer"
import { DownloadPDFButton } from "@/components/download-pdf-button"
import ErrorBoundary from "@/components/error-boundary"

const projectOfficersData = [
  { id: 1, name: "John Smith", role: "Senior Project Manager" },
  { id: 2, name: "Maria Rodriguez", role: "Construction Supervisor" },
  { id: 3, name: "David Chen", role: "Site Engineer" },
  { id: 4, name: "Sarah Johnson", role: "Project Coordinator" },
  { id: 5, name: "Michael Lee", role: "Technical Lead" },
]

const supplyItemsData = [
  {
    id: 1,
    name: "Steel I-Beam 20ft",
    category: "Structural Steel",
    unit: "piece",
    specifications: "20ft length, Grade A36 steel",
  },
  {
    id: 2,
    name: "Concrete Mix (High Strength)",
    category: "Concrete",
    unit: "cubic yard",
    specifications: "4000 PSI, Portland cement",
  },
  {
    id: 3,
    name: "Electrical Wire 12 AWG",
    category: "Electrical",
    unit: "foot",
    specifications: "THHN/THWN-2, 600V rated",
  },
  {
    id: 4,
    name: "Plywood Sheet 4x8",
    category: "Lumber",
    unit: "sheet",
    specifications: "4x8 feet, Grade A/B, exterior grade",
  },
  {
    id: 5,
    name: "PVC Pipe 4 inch",
    category: "Plumbing",
    unit: "foot",
    specifications: "Schedule 40, white PVC",
  },
]

export interface RequestItem {
  id: string
  itemName: string
  quantity: number
  unit: string
  specifications: string
  notes: string
}

export default function NewFormPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    project: "",
    type: "",
    projectOfficer: "",
    submissionDate: "",
    description: "",
    notes: "",
  })

  const [items, setItems] = useState<RequestItem[]>([
    {
      id: "1",
      itemName: "",
      quantity: 0,
      unit: "",
      specifications: "",
      notes: "",
    },
  ])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleItemChange = (id: string, field: keyof RequestItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (field === "itemName") {
            // Find the selected supply item
            const selectedItem = supplyItemsData.find((si) => si.name === value)
            if (selectedItem) {
              return {
                ...item,
                itemName: selectedItem.name,
                unit: selectedItem.unit,
                specifications: selectedItem.specifications,
              }
            }
          }
          return {
            ...item,
            [field]: field === "quantity" ? Number(value) : value,
          }
        }
        return item
      }),
    )
  }

  const addItem = () => {
    const newItem: RequestItem = {
      id: Date.now().toString(),
      itemName: "",
      quantity: 0,
      unit: "",
      specifications: "",
      notes: "",
    }
    setItems((prev) => [...prev, newItem])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPdfPreview, setShowPdfPreview] = useState(false)
  const [useFallbackPdf, setUseFallbackPdf] = useState(false)
  const formSubmittedData = useRef({
    formData: { ...formData },
    items: [...items]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      console.log("Creating form:", { ...formData, items })
      
      // Save the current form data for PDF generation
      formSubmittedData.current = {
        formData: { ...formData },
        items: [...items]
      }
      
      try {
        // Show PDF preview/download
        setShowPdfPreview(true)
        
        // If there's any error with the PDF components, we'll use the fallback
        window.addEventListener('error', (e) => {
          if (e.message?.includes('react-pdf') || e.message?.includes('@react-pdf')) {
            console.error('PDF error detected, using fallback method:', e)
            setUseFallbackPdf(true)
          }
        }, { once: true })
      } catch (pdfError) {
        console.error("Error with PDF preview:", pdfError)
        setUseFallbackPdf(true)
      }
      
      // Optional: You could send the data to your backend here
      // const response = await fetch('/api/forms', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, items })
      // })
      
      // No automatic redirect - user must manually close the PDF preview
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dasbor</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/forms">Formulir</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Formulir Baru</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Buat Formulir</h1>
              <p className="text-muted-foreground">Ajukan formulir baru untuk kebutuhan proyek Anda</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/forms">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Formulir
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Formulir</CardTitle>
              <CardDescription>Masukkan detail dasar untuk formulir Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project">Proyek *</Label>
                  <Select
                    value={formData.project}
                    onValueChange={(value) => handleInputChange("project", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih proyek" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="downtown-mall">Mall Downtown Fase 2</SelectItem>
                      <SelectItem value="residential-complex">Kompleks Perumahan A</SelectItem>
                      <SelectItem value="highway-bridge">Renovasi Jembatan Jalan Raya</SelectItem>
                      <SelectItem value="office-building">Gedung Kantor Ramah Lingkungan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="renovasi">Renovasi</SelectItem>
                      <SelectItem value="instalasi">Instalasi</SelectItem>
                      <SelectItem value="perlengkapan">Perlengkapan</SelectItem>
                      <SelectItem value="peralatan">Peralatan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectOfficer">Petugas Proyek *</Label>
                <Select
                  value={formData.projectOfficer}
                  onValueChange={(value) => handleInputChange("projectOfficer", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih petugas proyek" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectOfficersData.map((officer) => (
                      <SelectItem key={officer.id} value={officer.name}>
                        <div className="flex flex-col">
                          <span>{officer.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {officer.role}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="submissionDate">Tanggal Pengajuan *</Label>
                <Input
                  id="submissionDate"
                  type="date"
                  value={formData.submissionDate}
                  onChange={(e) => handleInputChange("submissionDate", e.target.value)}
                  required
                />
              </div>
              
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Item Formulir</CardTitle>
                <CardDescription>Tambahkan item ke formulir Anda</CardDescription>
              </div>
              <Button type="button" onClick={addItem} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Barang</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Satuan</TableHead>
                      <TableHead>Spesifikasi</TableHead>
                      <TableHead>Catatan</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Select
                            value={item.itemName}
                            onValueChange={(value) => handleItemChange(item.id, "itemName", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih item" />
                            </SelectTrigger>
                            <SelectContent>
                              {supplyItemsData.map((supplyItem) => (
                                <SelectItem key={supplyItem.id} value={supplyItem.name}>
                                  <div className="flex flex-col">
                                    <span>{supplyItem.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {supplyItem.category} - {supplyItem.unit}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantity || ""}
                            onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                            placeholder="0"
                            min="0"
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.unit}
                            onChange={(e) => handleItemChange(item.id, "unit", e.target.value)}
                            placeholder="Satuan"
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.specifications}
                            onChange={(e) => handleItemChange(item.id, "specifications", e.target.value)}
                            placeholder="Spesifikasi"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.notes}
                            onChange={(e) => handleItemChange(item.id, "notes", e.target.value)}
                            placeholder="Catatan tambahan"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          {items.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Item</p>
                  <p className="text-2xl font-bold">{items.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <Button type="submit" className="flex-1 max-w-xs" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Mengirim...' : 'Kirim Formulir'}
            </Button>
            <Button type="button" variant="outline" asChild disabled={isSubmitting}>
              <Link href="/forms">Batal</Link>
            </Button>
            
            {/* Fallback PDF download button (shown if there are issues with the PDF viewer) */}
            {useFallbackPdf && (
              <DownloadPDFButton
                formData={formSubmittedData.current.formData}
                items={formSubmittedData.current.items}
              />
            )}
          </div>
        </form>

        {/* PDF Preview Dialog */}
        {showPdfPreview && !useFallbackPdf && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-bold">Pratinjau PDF Formulir</h3>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <PDFDownloader
                      formData={formSubmittedData.current.formData}
                      items={formSubmittedData.current.items}
                    />
                    <Button variant="ghost" onClick={() => {
                      setShowPdfPreview(false);
                      // If the user closes the preview, show the fallback button
                      setUseFallbackPdf(true);
                    }}>
                      Tutup
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        router.push("/forms");
                      }}
                    >
                      Kembali ke Formulir
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <ErrorBoundary fallback={
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-red-500 mb-4">Terjadi kesalahan saat menampilkan pratinjau PDF.</p>
                    <DownloadPDFButton
                      formData={formSubmittedData.current.formData}
                      items={formSubmittedData.current.items}
                    />
                  </div>
                }>
                  <PDFPreviewerWrapper
                    formData={formSubmittedData.current.formData}
                    items={formSubmittedData.current.items}
                  />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        )}
        
        {/* Simple success message when using fallback */}
        {useFallbackPdf && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex flex-col gap-3">
              <p className="text-green-700">Formulir berhasil dikirim! Klik tombol "Unduh PDF" untuk menyimpan formulir Anda.</p>
              <div className="flex gap-3">
                <DownloadPDFButton
                  formData={formSubmittedData.current.formData}
                  items={formSubmittedData.current.items}
                />
                <Button 
                  variant="outline" 
                  onClick={() => {
                    router.push("/forms");
                  }}
                >
                  Kembali ke Formulir
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarInset>
  )
}
