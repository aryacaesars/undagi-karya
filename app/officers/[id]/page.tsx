"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Edit,
  Phone,
  Calendar,
  FolderOpen,
  CheckCircle,
  Clock,
  Plus,
  Trash2,
} from "lucide-react"
import Link from "next/link"

// Ambil data officer dari API
import { useEffect } from "react"




export default function OfficerDetailPage() {
  const params = useParams()
  const officerId = params.id
  const [officer, setOfficer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!officerId) return
    setLoading(true)
    setError(null)
    fetch(`/api/officers?id=${officerId}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Gagal mengambil data officer')
        }
        return res.json()
      })
      .then((data) => {
        setOfficer(data.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [officerId])

  if (loading) {
    return (
      <SidebarInset>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Memuat data petugas...</h2>
          </div>
        </div>
      </SidebarInset>
    )
  }

  if (error || !officer) {
    return (
      <SidebarInset>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Petugas Tidak Ditemukan</h2>
            <p className="text-muted-foreground mt-2">{error || 'Petugas yang Anda cari tidak ada.'}</p>
            <Button asChild className="mt-4">
              <Link href="/officers">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Petugas
              </Link>
            </Button>
          </div>
        </div>
      </SidebarInset>
    )
  }


  // Helper badge
  const getProjectStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-blue-100 text-blue-800">Aktif</Badge>
    ) : (
      <Badge className="bg-green-100 text-green-800">Selesai</Badge>
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
              <BreadcrumbItem>
                <BreadcrumbLink href="/officers">Petugas</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{officer.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/officers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Petugas
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Petugas
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Tugaskan Proyek
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tugaskan Proyek ke {officer.name}</DialogTitle>
                  <DialogDescription>
                    Pilih proyek untuk ditugaskan ke petugas ini.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">Fitur penugasan proyek akan diimplementasikan di sini.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Officer Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={officer.avatar || "/placeholder.svg"} alt={officer.name} />
                  <AvatarFallback className="text-2xl">
                    {officer.name.split(" ").map((n: string) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-3xl">{officer.name}</CardTitle>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Telepon</span>
                </div>
                <p>{officer.phone}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Tanggal Bergabung</span>
                </div>
                <p>{officer.createdAt ? new Date(officer.createdAt).toLocaleDateString() : '-'}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Jumlah Formulir</span>
                </div>
                <p className="text-2xl font-bold">{officer.forms?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Formulir yang Ditangani</CardTitle>
                <CardDescription>Formulir yang saat ini ditangani oleh {officer.name}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {officer.forms && officer.forms.length > 0 ? (
                officer.forms.map((form: any) => (
                  <Card key={form.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{form.project?.name || 'Tanpa Proyek'}</h3>
                            {/* Status badge bisa dikembangkan dari status form/project */}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Jumlah Item:</span> {form.items?.length || 0}
                            </div>
                            <div>
                              <span className="font-medium">Tanggal Dibuat:</span> {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : '-'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">Belum ada formulir yang ditangani.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
