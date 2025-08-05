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

// Mock data - same as in the main page
const officersData = [
  {
    id: 1,
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    joinDate: "2022-01-15",
    activeProjects: 3,
    completedProjects: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    joinDate: "2022-06-20",
    activeProjects: 2,
    completedProjects: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mike Wilson",
    phone: "+1 (555) 345-6789",
    joinDate: "2021-09-10",
    activeProjects: 4,
    completedProjects: 18,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    phone: "+1 (555) 456-7890",
    joinDate: "2023-02-14",
    activeProjects: 1,
    completedProjects: 4,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Tom Brown",
    phone: "+1 (555) 567-8901",
    joinDate: "2023-04-01",
    activeProjects: 2,
    completedProjects: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    phone: "+1 (555) 678-9012",
    joinDate: "2022-11-30",
    activeProjects: 0,
    completedProjects: 6,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock projects data
const mockProjects = [
  {
    id: 1,
    name: "Downtown Office Complex",
    status: "Active",
    progress: 75,
    deadline: "2024-12-15",
  },
  {
    id: 2,
    name: "Residential Tower Phase 2",
    status: "Active",
    progress: 45,
    deadline: "2025-03-20",
  },
  {
    id: 3,
    name: "Shopping Mall Renovation",
    status: "Completed",
    progress: 100,
    deadline: "2024-01-30",
  },
]

export default function OfficerDetailPage() {
  const params = useParams()
  const officerId = Number(params.id)
  
  const officer = officersData.find(o => o.id === officerId)
  
  if (!officer) {
    return (
      <SidebarInset>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Petugas Tidak Ditemukan</h2>
            <p className="text-muted-foreground mt-2">Petugas yang Anda cari tidak ada.</p>
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
                    {officer.name.split(" ").map((n) => n[0]).join("")}
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
                <p>{new Date(officer.joinDate).toLocaleDateString()}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Proyek Aktif</span>
                </div>
                <p className="text-2xl font-bold">{officer.activeProjects}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Proyek Selesai</span>
                </div>
                <p className="text-2xl font-bold">{officer.completedProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Proyek yang Ditugaskan</CardTitle>
                <CardDescription>Proyek yang saat ini ditugaskan ke {officer.name}</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Tugaskan Proyek Baru
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProjects.map((project) => (
                <Card key={project.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{project.name}</h3>
                          {getProjectStatusBadge(project.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Progres:</span> {project.progress}%
                          </div>
                          <div>
                            <span className="font-medium">Tenggat:</span> {new Date(project.deadline).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
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
