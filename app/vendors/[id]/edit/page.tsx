"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
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
import { Building2, Save, ArrowLeft, AlertCircle, Loader2, Trash2 } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UpdateVendorData, Vendor } from "@/types/vendor"
import { useVendorDetail } from "@/hooks/use-vendor-detail"

export default function EditVendorPage() {
  const router = useRouter()
  const params = useParams()
  const vendorId = params.id as string
  
  const { vendor, loading: vendorLoading, error: vendorError } = useVendorDetail(vendorId)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<UpdateVendorData>({
    id: vendorId,
    name: "",
    phone: "",
    address: "",
    contactPerson: "",
    paymentTerms: "",
    description: "",
  })

  // Update form data when vendor is loaded
  useEffect(() => {
    if (vendor) {
      setFormData({
        id: vendor.id,
        name: vendor.name,
        phone: vendor.phone || "",
        address: vendor.address || "",
        contactPerson: vendor.contactPerson || "",
        paymentTerms: vendor.paymentTerms || "",
        description: vendor.description || "",
      })
    }
  }, [vendor])

  const handleInputChange = (field: keyof UpdateVendorData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      setError("Nama vendor harus diisi")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/vendors", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Gagal memperbarui vendor")
      }

      if (result.success) {
        router.push(`/vendors/${vendorId}`)
      } else {
        throw new Error(result.error || "Gagal memperbarui vendor")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus vendor ini?")) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/vendors?id=${vendorId}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Gagal menghapus vendor")
      }

      if (result.success) {
        router.push("/vendors")
      } else {
        throw new Error(result.error || "Gagal menghapus vendor")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  if (vendorLoading) {
    return (
      <SidebarInset>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Memuat data vendor...</span>
          </div>
        </div>
      </SidebarInset>
    )
  }

  if (vendorError || !vendor) {
    return (
      <SidebarInset>
        <div className="flex flex-1 items-center justify-center p-4">
          <Alert className="max-w-md">
            <AlertDescription>
              {vendorError || "Vendor tidak ditemukan"}
            </AlertDescription>
          </Alert>
        </div>
      </SidebarInset>
    )
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
                <BreadcrumbLink href="/vendors">Vendor</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={`/vendors/${vendorId}`}>{vendor.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Edit Vendor</h1>
              <p className="text-muted-foreground">Perbarui informasi vendor {vendor.name}</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href={`/vendors/${vendorId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Detail
            </Link>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
              <CardDescription>Perbarui detail dasar vendor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Vendor *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Masukkan nama vendor"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+62 812-3456-7890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Masukkan alamat lengkap"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detail Vendor</CardTitle>
              <CardDescription>Informasi tambahan tentang vendor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Kontak Person</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Syarat Pembayaran</Label>
                <Input
                  id="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={(e) => handleInputChange("paymentTerms", e.target.value)}
                  placeholder="Net 30, Net 15, dll."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Deskripsi singkat tentang vendor dan produk/layanan mereka"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href={`/vendors/${vendorId}`}>Batal</Link>
              </Button>
            </div>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete}
              disabled={loading}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus Vendor
            </Button>
          </div>
        </form>
      </div>
    </SidebarInset>
  )
}
