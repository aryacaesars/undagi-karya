"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, UserPlus } from "lucide-react"
import Link from "next/link"

export default function NewOfficerPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/officers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Gagal menambah petugas")
        setIsLoading(false)
        return
      }
      router.push("/officers")
    } catch (err: any) {
      setError(err.message || "Gagal menambah petugas")
      setIsLoading(false)
    }
  }

  const isFormValid = formData.name && formData.phone 

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
              <BreadcrumbItem>
                <BreadcrumbLink href="/officers">Petugas</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Tambah Petugas Baru</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tambah Petugas Baru</h1>
            <p className="text-muted-foreground">Buat profil petugas baru dan tugaskan mereka ke proyek</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/officers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Petugas
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Informasi Dasar
                </CardTitle>
                <CardDescription>
                  Masukkan detail pribadi dan kontak petugas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Masukkan nomor telepon"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Work Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Pekerjaan</CardTitle>
                <CardDescription>
                  Atur status kerja dan kapasitas petugas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Tanggal Bergabung</Label>
                  <Input
                    id="joinDate"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan Tambahan</Label>
                  <Textarea
                    id="notes"
                    placeholder="Informasi tambahan tentang petugas..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm mt-4">{error}</div>
          )}

          {/* Action Buttons */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-end gap-4">
                <Button variant="outline" type="button" asChild>
                  <Link href="/officers">Batal</Link>
                </Button>
                <Button 
                  type="submit" 
                  disabled={!isFormValid || isLoading}
                  className="min-w-[120px]"
                >
                  {isLoading ? (
                    "Menyimpan..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Simpan Petugas
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </SidebarInset>
  )
}
