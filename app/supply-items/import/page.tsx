"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle, ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ImportItem {
  id: string
  name: string
  unit: string
  specifications: string
  status: "valid" | "error" | "warning"
  errors: string[]
}

export default function ImportSupplyItemsPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [previewData, setPreviewData] = useState<ImportItem[]>([])
  const [importComplete, setImportComplete] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Simulate file parsing and preview
      setTimeout(() => {
        const mockPreviewData: ImportItem[] = [
          {
            id: "1",
            name: "Balok Baja I-Beam 25ft",
            unit: "buah",
            specifications: "Panjang 25ft, Baja Grade A36",
            status: "valid",
            errors: [],
          },
          {
            id: "2",
            name: "Campuran Beton Premium",
            unit: "meter kubik",
            specifications: "5000 PSI, Semen Portland",
            status: "valid",
            errors: [],
          },
          {
            id: "3",
            name: "Kabel Listrik",
            unit: "",
            specifications: "Spesifikasi tidak ada",
            status: "error",
            errors: ["Spesifikasi wajib diisi"],
          },
          {
            id: "4",
            name: "Lembaran Plywood 4x8 Premium",
            unit: "lembar",
            specifications: "4x8 kaki, Grade A/A, kualitas marine",
            status: "valid",
            errors: [],
          },
        ]
        setPreviewData(mockPreviewData)
      }, 1000)
    }
  }

  const handleImport = async () => {
    setImporting(true)
    setImportProgress(0)

    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setImporting(false)
          setImportComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const removeItem = (id: string) => {
    setPreviewData((prev) => prev.filter((item) => item.id !== id))
  }

  const downloadTemplate = () => {
    // Create CSV template
    const csvContent = `Name,Unit,Specifications
Balok Baja I-Beam 20ft,buah,"Panjang 20ft, Baja Grade A36"
Campuran Beton,meter kubik,"4000 PSI, Semen Portland"
Kabel Listrik 12 AWG,kaki,"THHN/THWN-2, rated 600V"`

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "supply_items_template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusBadge = (status: string) => {
    const config = {
      valid: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      error: { color: "bg-red-100 text-red-800", icon: AlertCircle },
      warning: { color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
    }

    const { color, icon: Icon } = config[status as keyof typeof config]

    const statusMap = {
      valid: "Valid",
      error: "Error", 
      warning: "Peringatan"
    }

    return (
      <Badge className={color}>
        <Icon className="w-3 h-3 mr-1" />
        {statusMap[status as keyof typeof statusMap]}
      </Badge>
    )
  }

  const validItems = previewData.filter((item) => item.status === "valid").length
  const errorItems = previewData.filter((item) => item.status === "error").length
  const warningItems = previewData.filter((item) => item.status === "warning").length

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
                <BreadcrumbLink href="/supply-items">Item Persediaan</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Import Item</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <FileSpreadsheet className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Import Item Persediaan</h1>
              <p className="text-muted-foreground">Import item persediaan dari file Excel atau CSV</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/supply-items">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Item Persediaan
            </Link>
          </Button>
        </div>

        {!importComplete && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload File</CardTitle>
                <CardDescription>
                  Upload file Excel (.xlsx) atau CSV (.csv) yang berisi data item persediaan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Pilih File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileSelect}
                    ref={fileInputRef}
                  />
                </div>

                {file && (
                  <Alert>
                    <FileSpreadsheet className="h-4 w-4" />
                    <AlertDescription>
                      File terpilih: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex-1">
                    <Upload className="mr-2 h-4 w-4" />
                    Pilih File
                  </Button>
                  <Button onClick={downloadTemplate} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Persyaratan Format File</CardTitle>
                <CardDescription>File Anda harus berisi kolom-kolom berikut</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Kolom Wajib:</div>
                    <div></div>
                    <div>• Nama</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Kolom Opsional:</div>
                    <div></div>
                    <div>• Satuan</div>
                    <div>• Spesifikasi</div>
                  </div>
                </div>

                <Alert className="mt-4">
                  <AlertDescription>
                    <strong>Tips:</strong> Download file template untuk melihat format yang tepat.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        )}

        {previewData.length > 0 && !importComplete && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pratinjau Import</CardTitle>
                <CardDescription>Tinjau data sebelum mengimport. Perbaiki error yang ditampilkan di bawah.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">{validItems} Valid</Badge>
                {warningItems > 0 && <Badge className="bg-yellow-100 text-yellow-800">{warningItems} Peringatan</Badge>}
                {errorItems > 0 && <Badge className="bg-red-100 text-red-800">{errorItems} Error</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              {importing && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Mengimport item...</span>
                    <span className="text-sm text-muted-foreground">{importProgress}%</span>
                  </div>
                  <Progress value={importProgress} className="h-2" />
                </div>
              )}

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Satuan</TableHead>
                      <TableHead>Spesifikasi</TableHead>
                      <TableHead>Masalah</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.unit || "-"}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{item.specifications || "-"}</TableCell>
                        <TableCell>
                          {item.errors.length > 0 && (
                            <div className="space-y-1">
                              {item.errors.map((error, index) => (
                                <div key={index} className="text-xs text-red-600">
                                  • {error}
                                </div>
                              ))}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  {previewData.length} item siap untuk diimport
                  {errorItems > 0 && (
                    <span className="text-red-600 ml-2">({errorItems} item memiliki error dan akan dilewati)</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setPreviewData([])}>
                    Batal
                  </Button>
                  <Button onClick={handleImport} disabled={importing || validItems === 0}>
                    {importing ? "Mengimport..." : `Import ${validItems} Item`}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {importComplete && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Import Berhasil Diselesaikan
              </CardTitle>
              <CardDescription>Item persediaan Anda berhasil diimport</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{validItems}</div>
                    <div className="text-sm text-muted-foreground">Item Diimport</div>
                  </div>
                  {warningItems > 0 && (
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{warningItems}</div>
                      <div className="text-sm text-muted-foreground">Dengan Peringatan</div>
                    </div>
                  )}
                  {errorItems > 0 && (
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{errorItems}</div>
                      <div className="text-sm text-muted-foreground">Dilewati (Error)</div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button asChild>
                    <Link href="/supply-items">Lihat Item Persediaan</Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setImportComplete(false)
                      setPreviewData([])
                      setFile(null)
                      setImportProgress(0)
                    }}
                  >
                    Import Item Lainnya
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SidebarInset>
  )
}
