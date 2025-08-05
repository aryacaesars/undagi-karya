"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FolderOpen,
  Edit,
  Plus,
  Eye,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data - in real app this would come from API
const clientData = {
  id: 1,
  name: "MegaBuild Corporation",
  phone: "+1 (555) 123-4567",
  address: "123 Business District, New York, NY 10001",
  joinDate: "2023-01-15",
  description:
    "Leading construction company specializing in large-scale commercial projects and infrastructure development.",
  contactPerson: "Robert Johnson",
  totalProjects: 12,
  activeProjects: 3,
  completedProjects: 9,
}

const projectHistory = [
  {
    id: 1,
    name: "Downtown Mall Phase 2",
    progress: 75,
    startDate: "2023-03-15",
    endDate: "2024-01-30",
    officer: "John Smith",
  },
  {
    id: 2,
    name: "Corporate Office Building",
    progress: 100,
    startDate: "2022-08-01",
    endDate: "2023-02-28",
    officer: "Sarah Johnson",
  },
  {
    id: 3,
    name: "Warehouse Expansion",
    progress: 45,
    startDate: "2023-06-10",
    endDate: "2023-12-15",
    officer: "Mike Wilson",
  },
  {
    id: 4,
    name: "Parking Structure",
    progress: 100,
    startDate: "2022-03-01",
    endDate: "2022-09-30",
    officer: "Emily Davis",
  },
]

export default function ClientDetailPage() {
  const params = useParams()
  const clientId = params.id

  // Function removed

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
                <BreadcrumbLink href="/clients">Klien</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{clientData.name}</BreadcrumbPage>
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
              <h1 className="text-2xl font-bold tracking-tight">{clientData.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Klien
            </Button>
            <Button asChild>
              <Link href="/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                Proyek Baru
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Proyek</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientData.totalProjects}</div>
              <p className="text-xs text-muted-foreground">{clientData.activeProjects} aktif</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tingkat Keberhasilan</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((clientData.completedProjects / clientData.totalProjects) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">Tingkat penyelesaian</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Informasi Klien</CardTitle>
              <CardDescription>Informasi detail tentang klien</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Telepon</p>
                      <p className="text-sm text-muted-foreground">{clientData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Alamat</p>
                      <p className="text-sm text-muted-foreground">{clientData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Kontak Person</p>
                      <p className="text-sm text-muted-foreground">{clientData.contactPerson}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Tanggal Bergabung</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(clientData.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-2">Deskripsi</p>
                <p className="text-sm text-muted-foreground">{clientData.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
              <CardDescription>Aksi umum untuk klien ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/projects/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Buat Proyek Baru
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="mr-2 h-4 w-4" />
                Kirim Pesan
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Edit className="mr-2 h-4 w-4" />
                Edit Info Klien
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FolderOpen className="mr-2 h-4 w-4" />
                Lihat Semua Proyek
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Proyek</CardTitle>
            <CardDescription>Semua proyek yang terkait dengan klien ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Proyek</TableHead>
                    <TableHead>Progres</TableHead>
                    <TableHead>Petugas</TableHead>
                    <TableHead>Linimasa</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectHistory.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="w-16 h-2" />
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{project.officer}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(project.startDate).toLocaleDateString()}</div>
                          <div className="text-muted-foreground">
                            to {new Date(project.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/projects/${project.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
