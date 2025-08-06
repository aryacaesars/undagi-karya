"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Phone,
  Calendar,
  Users,
  FolderOpen,
  UserCheck,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Types
interface Officer {
  id: string
  name: string
  email: string | null
  phone: string
  role: string
  createdAt: string
  forms?: any[]
}

interface ApiResponse {
  success: boolean
  data: Officer[]
  pagination?: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

export default function OfficersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [officers, setOfficers] = useState<Officer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch officers from API
  useEffect(() => {
    fetchOfficers()
  }, [])

  const fetchOfficers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/officers')
      const result: ApiResponse = await response.json()
      
      if (result.success) {
        setOfficers(result.data)
      } else {
        setError('Gagal memuat data petugas')
      }
    } catch (err) {
      setError('Terjadi kesalahan saat memuat data')
      console.error('Error fetching officers:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredOfficers = officers.filter((officer) => {
    const matchesSearch =
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (officer.email && officer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      officer.role.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const getWorkloadBadge = (workload: string) => {
    const colors = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    }
    const translations = {
      High: "Tinggi",
      Medium: "Sedang", 
      Low: "Rendah",
    }
    return <Badge className={colors[workload as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{translations[workload as keyof typeof translations] || workload}</Badge>
  }

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-800">Aktif</Badge>
    ) : (
      <Badge variant="secondary">Cuti</Badge>
    )
  }

  if (loading) {
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
                  <BreadcrumbPage>Petugas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="text-center py-8">
            <p>Memuat data petugas...</p>
          </div>
        </div>
      </SidebarInset>
    )
  }

  if (error) {
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
                  <BreadcrumbPage>Petugas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="text-center py-8">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <p className="text-red-600">{error}</p>
            <Button onClick={fetchOfficers} className="mt-4">
              Coba Lagi
            </Button>
          </div>
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
              <BreadcrumbItem>
                <BreadcrumbPage>Petugas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manajemen Petugas</h1>
            <p className="text-muted-foreground">Kelola petugas proyek dan lacak beban kerja serta penugasan mereka</p>
          </div>
          <Button asChild>
            <Link href="/officers/new">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Petugas
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Petugas</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{officers.length}</div>
              <p className="text-xs text-muted-foreground">Semua petugas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {officers.reduce((sum, officer) => sum + (officer.forms?.length || 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">Forms dikelola</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Semua Petugas</CardTitle>
            <CardDescription>Kelola petugas proyek, tugas mereka, dan distribusi beban kerja</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari petugas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOfficers.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">
                    {searchTerm ? "Tidak ada petugas yang ditemukan" : "Belum ada petugas"}
                  </p>
                </div>
              ) : (
                filteredOfficers.map((officer) => (
                  <Card key={officer.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>
                              {officer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{officer.name}</CardTitle>
                            <CardDescription>{officer.role}</CardDescription>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/officers/${officer.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Lihat Profil
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Petugas
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Tugaskan Proyek</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Forms</p>
                          <p className="font-medium">{officer.forms?.length || 0}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{officer.phone}</span>
                        </div>
                        {officer.email && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">✉</span>
                            <span className="text-xs">{officer.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Bergabung {new Date(officer.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/officers/${officer.id}`}>Lihat Profil</Link>
                        </Button>
                        <Button size="sm">Tugaskan Proyek</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
