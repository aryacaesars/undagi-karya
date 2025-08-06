"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Building2, Save, ArrowLeft, CalendarIcon, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
// Utility to conditionally join classNames
function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
import { useCreateProject } from "../../../hooks/use-create-project"
import { useClients } from "../../../hooks/use-clients"
import { useOfficers } from "../../../hooks/use-officers"
import { toast } from "sonner"

export default function NewProjectPage() {
  const router = useRouter()
  const { createProject, loading, error } = useCreateProject()
  const { clients, loading: clientsLoading, fetchClients } = useClients()
  const { officers, loading: officersLoading, fetchOfficers } = useOfficers()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    officer: "",
    type: "",
    location: "",
    description: "",
  })
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch clients and officers on component mount
  useEffect(() => {
    fetchClients({ limit: 100 }) // Get more items for dropdown
    fetchOfficers({ limit: 100 })
  }, [fetchClients, fetchOfficers])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (submitError) setSubmitError(null) // Clear error when user starts typing
  }

  const handleClientChange = (clientId: string) => {
    const selectedClient = clients.find(client => client.id === clientId)
    setFormData((prev) => ({ 
      ...prev, 
      client: clientId,
      // Only auto-fill location if client has an address and current location is empty
      location: selectedClient?.address && !prev.location.trim() 
        ? selectedClient.address 
        : prev.location
    }))
    if (submitError) setSubmitError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      // Validasi form
      if (!formData.name.trim()) {
        throw new Error('Nama proyek harus diisi')
      }

      if (!startDate || !endDate) {
        throw new Error('Tanggal mulai dan selesai harus diisi')
      }

      if (endDate <= startDate) {
        throw new Error('Tanggal selesai harus setelah tanggal mulai')
      }

      const projectData = {
        name: formData.name.trim(),
        client: formData.client ? clients.find(c => c.id === formData.client)?.name : undefined,
        officer: formData.officer ? officers.find(o => o.id === formData.officer)?.name : undefined,
        type: formData.type || undefined,
        location: formData.location || undefined,
        description: formData.description || undefined,
        startDate,
        endDate,
      }

      const newProject = await createProject(projectData)
      
      toast.success('Proyek berhasil dibuat!', {
        description: `Proyek "${newProject.name}" telah dibuat dengan ID: ${newProject.id}`,
      })

      // Redirect ke halaman detail project yang baru dibuat
      router.push(`/projects/${newProject.id}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan saat membuat proyek'
      setSubmitError(errorMessage)
      toast.error('Gagal membuat proyek', {
        description: errorMessage,
      })
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
                <BreadcrumbLink href="/projects">Proyek</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Proyek Baru</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Buat Proyek Baru</h1>
              <p className="text-muted-foreground">Siapkan proyek konstruksi baru dengan semua detail yang diperlukan</p>
            </div>
          </div>
          <Button variant="outline" asChild disabled={isSubmitting}>
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Proyek
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Proyek</CardTitle>
              <CardDescription>Masukkan detail dasar untuk proyek baru</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Proyek *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Masukkan nama proyek"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Klien</Label>
                  <Select
                    value={formData.client}
                    onValueChange={handleClientChange}
                    disabled={isSubmitting || clientsLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={clientsLoading ? "Memuat klien..." : "Pilih klien"} />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="officer">Petugas Proyek</Label>
                  <Select
                    value={formData.officer}
                    onValueChange={(value) => handleInputChange("officer", value)}
                    disabled={isSubmitting || officersLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={officersLoading ? "Memuat petugas..." : "Pilih petugas proyek"} />
                    </SelectTrigger>
                    <SelectContent>
                      {officers.map((officer) => (
                        <SelectItem key={officer.id} value={officer.id}>
                          {officer.name} {officer.role && `- ${officer.role}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe proyek" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="renovasi">Renovasi</SelectItem>
                      <SelectItem value="instalasi">Instalasi</SelectItem>
                      <SelectItem value="peralatan">Peralatan</SelectItem>
                      <SelectItem value="perlengkapan">Perlengkapan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder={formData.client ? "Lokasi proyek (dapat terisi otomatis dari alamat klien)" : "Lokasi proyek"}
                  disabled={isSubmitting}
                />
                {formData.client && formData.location && 
                 clients.find(c => c.id === formData.client)?.address === formData.location && (
                  <p className="text-sm text-muted-foreground">
                    💡 Lokasi otomatis terisi dari alamat klien yang dipilih
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Deskripsi singkat proyek"
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jadwal</CardTitle>
              <CardDescription>Tetapkan tanggal mulai dan selesai proyek</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tanggal Mulai *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                        disabled={isSubmitting}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Selesai *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                        disabled={isSubmitting}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <Button type="submit" className="flex-1 max-w-xs" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Membuat...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Buat Proyek
                </>
              )}
            </Button>
            <Button type="button" variant="outline" asChild disabled={isSubmitting}>
              <Link href="/projects">Batal</Link>
            </Button>
          </div>
        </form>
      </div>
    </SidebarInset>
  )
}
