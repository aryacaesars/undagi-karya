"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
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
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { useProjects } from "../../hooks/use-projects"
import { useDebounce } from "../../hooks/use-debounce"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  
  // Debounce search term untuk mengurangi API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
  const { projects, loading, error, pagination, refetch, fetchProjects } = useProjects()

  // Fetch data ketika search term berubah
  useEffect(() => {
    fetchProjects(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  // Filter projects berdasarkan tipe (filter client-side karena API belum support filter by type)
  const filteredProjects = useMemo(() => {
    if (typeFilter === "all") return projects
    return projects.filter((project) => 
      project.type?.toLowerCase() === typeFilter.toLowerCase()
    )
  }, [projects, typeFilter])

  const getTypeBadge = (type: string | null | undefined) => {
    if (!type) return <Badge className="bg-gray-100 text-gray-800">Tidak ada</Badge>
    
    const colors = {
      renovasi: "bg-blue-100 text-blue-800",
      instalasi: "bg-green-100 text-green-800", 
      peralatan: "bg-yellow-100 text-yellow-800",
      perlengkapan: "bg-purple-100 text-purple-800",
    }
    return <Badge className={colors[type.toLowerCase() as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{type}</Badge>
  }

  const calculateProgress = (project: any) => {
    // Hitung progress berdasarkan jumlah forms atau logika lain
    if (!project.forms || project.forms.length === 0) return 0
    return Math.min(project.forms.length * 20, 100)
  }

  // Statistik untuk cards
  const stats = useMemo(() => {
    const totalProjects = projects.length
    const avgProgress = totalProjects > 0 
      ? Math.round(projects.reduce((sum, project) => sum + calculateProgress(project), 0) / totalProjects)
      : 0
    const uniqueTypes = new Set(projects.map(p => p.type).filter(Boolean)).size

    return {
      totalProjects,
      avgProgress,
      uniqueTypes
    }
  }, [projects])

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
                <BreadcrumbPage>Proyek</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <Button variant="outline" size="sm" onClick={refetch}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Coba Lagi
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manajemen Proyek</h1>
            <p className="text-muted-foreground">Lacak dan kelola semua proyek konstruksi Anda</p>
          </div>
          <Button asChild>
            <Link href="/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              Proyek Baru
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Proyek</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats.totalProjects}</div>
              )}
              <p className="text-xs text-muted-foreground">Semua proyek</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progres Rata-rata</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats.avgProgress}%</div>
              )}
              <p className="text-xs text-muted-foreground">Penyelesaian keseluruhan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tipe</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats.uniqueTypes}</div>
              )}
              <p className="text-xs text-muted-foreground">Tipe proyek</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Semua Proyek</CardTitle>
            <CardDescription>Kelola dan lacak progres semua proyek konstruksi Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari proyek..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter berdasarkan tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="renovasi">Renovasi</SelectItem>
                  <SelectItem value="instalasi">Instalasi</SelectItem>
                  <SelectItem value="peralatan">Peralatan</SelectItem>
                  <SelectItem value="perlengkapan">Perlengkapan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-8 w-8" />
                      </div>
                      <Skeleton className="h-6 w-20" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-10" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i}>
                            <Skeleton className="h-3 w-16 mb-1" />
                            <Skeleton className="h-4 w-20" />
                          </div>
                        ))}
                      </div>
                      <Skeleton className="h-4 w-full" />
                      <div className="flex justify-between items-center pt-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : filteredProjects.length === 0 ? (
                // Empty state
                <div className="col-span-full text-center py-12">
                  <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">
                    {searchTerm || typeFilter !== "all" ? "Tidak ada proyek yang cocok" : "Belum ada proyek"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || typeFilter !== "all" 
                      ? "Coba ubah kriteria pencarian atau filter Anda" 
                      : "Mulai dengan membuat proyek pertama Anda"
                    }
                  </p>
                  {!searchTerm && typeFilter === "all" && (
                    <Button asChild>
                      <Link href="/projects/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Buat Proyek Pertama
                      </Link>
                    </Button>
                  )}
                </div>
              ) : (
                // Project cards
                filteredProjects.map((project) => {
                  const progress = calculateProgress(project)
                  return (
                    <Card key={project.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{project.name}</CardTitle>
                            <CardDescription>{project.client || "Klien tidak ditentukan"}</CardDescription>
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
                                <Link href={`/projects/${project.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Lihat Detail
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Proyek
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Tugaskan Petugas</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTypeBadge(project.type)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progres</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Petugas</p>
                            <p className="font-medium">{project.officer || "Belum ditentukan"}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Tipe</p>
                            <p className="font-medium">{project.type || "Belum ditentukan"}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Tanggal Mulai</p>
                            <p className="font-medium">
                              {project.startDate ? new Date(project.startDate).toLocaleDateString() : "Belum ditentukan"}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Tanggal Selesai</p>
                            <p className="font-medium">
                              {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Belum ditentukan"}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Deskripsi</p>
                          <p className="text-sm">{project.description || "Tidak ada deskripsi"}</p>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Progres: </span>
                            <span className="font-medium">{progress}%</span>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/projects/${project.id}`}>Lihat Detail</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
