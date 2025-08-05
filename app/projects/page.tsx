"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
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
} from "lucide-react"
import Link from "next/link"

const projectsData = [
  {
    id: 1,
    name: "Mall Downtown Fase 2",
    client: "MegaBuild Corporation",
    officer: "John Smith",
    progress: 75,
    startDate: "2023-03-15",
    endDate: "2024-01-30",
    description: "Perluasan mall yang sudah ada dengan ruang ritel baru",
    type: "renovasi",
  },
  {
    id: 2,
    name: "Kompleks Perumahan A",
    client: "Urban Developers CV",
    officer: "Sarah Johnson",
    progress: 15,
    startDate: "2023-08-01",
    endDate: "2024-06-15",
    description: "Kompleks perumahan modern dengan 50 unit",
    type: "instalasi",
  },
  {
    id: 3,
    name: "Renovasi Jembatan Jalan Raya",
    client: "City Infrastructure Ltd",
    officer: "Mike Wilson",
    progress: 45,
    startDate: "2023-05-20",
    endDate: "2023-12-10",
    description: "Renovasi lengkap jembatan jalan raya utama",
    type: "renovasi",
  },
  {
    id: 4,
    name: "Gedung Kantor Ramah Lingkungan",
    client: "Green Construction",
    officer: "Emily Davis",
    progress: 100,
    startDate: "2022-11-01",
    endDate: "2023-07-15",
    description: "Gedung kantor bersertifikat LEED dengan panel surya",
    type: "instalasi",
  },
  {
    id: 5,
    name: "Renovasi Rumah",
    client: "John Smith",
    officer: "Tom Brown",
    progress: 60,
    startDate: "2023-06-10",
    endDate: "2023-10-30",
    description: "Renovasi rumah lengkap termasuk dapur dan kamar mandi",
    type: "peralatan",
  },
  {
    id: 6,
    name: "Perluasan Pusat Perbelanjaan",
    client: "Premier Builders Inc",
    officer: "Lisa Anderson",
    progress: 30,
    startDate: "2023-04-01",
    endDate: "2024-02-28",
    description: "Menambah sayap baru ke pusat perbelanjaan yang ada",
    type: "perlengkapan",
  },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || project.type.toLowerCase() === typeFilter

    return matchesSearch && matchesType
  })

  const getTypeBadge = (type: string) => {
    const colors = {
      renovasi: "bg-blue-100 text-blue-800",
      instalasi: "bg-green-100 text-green-800", 
      peralatan: "bg-yellow-100 text-yellow-800",
      perlengkapan: "bg-purple-100 text-purple-800",
    }
    return <Badge className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{type}</Badge>
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-blue-500"
    if (progress >= 25) return "bg-yellow-500"
    return "bg-red-500"
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
                <BreadcrumbPage>Proyek</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
              <div className="text-2xl font-bold">{projectsData.length}</div>
              <p className="text-xs text-muted-foreground">Semua proyek</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progres Rata-rata</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(projectsData.reduce((sum, project) => sum + project.progress, 0) / projectsData.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Penyelesaian keseluruhan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tipe</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{[...new Set(projectsData.map(p => p.type))].length}</div>
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
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription>{project.client}</CardDescription>
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
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Petugas</p>
                        <p className="font-medium">{project.officer}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tipe</p>
                        <p className="font-medium">{project.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tanggal Mulai</p>
                        <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tanggal Selesai</p>
                        <p className="font-medium">{new Date(project.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Deskripsi</p>
                      <p className="text-sm">{project.description}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Progres: </span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>Lihat Detail</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
