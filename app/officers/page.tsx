"use client"

import { useState } from "react"
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
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  FolderOpen,
  UserCheck,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

const officersData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Project Manager",
    department: "Construction",
    joinDate: "2022-01-15",
    activeProjects: 3,
    completedProjects: 12,
    workload: "High",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Commercial Construction",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 234-5678",
    position: "Project Manager",
    department: "Residential",
    joinDate: "2022-06-20",
    activeProjects: 2,
    completedProjects: 8,
    workload: "Medium",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Residential Development",
    status: "Active",
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@company.com",
    phone: "+1 (555) 345-6789",
    position: "Senior Project Manager",
    department: "Infrastructure",
    joinDate: "2021-09-10",
    activeProjects: 4,
    completedProjects: 18,
    workload: "High",
    location: "Chicago, IL",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Infrastructure & Roads",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+1 (555) 456-7890",
    position: "Project Manager",
    department: "Green Building",
    joinDate: "2023-02-14",
    activeProjects: 1,
    completedProjects: 4,
    workload: "Low",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Sustainable Construction",
    status: "Active",
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom.brown@company.com",
    phone: "+1 (555) 567-8901",
    position: "Assistant Project Manager",
    department: "Renovation",
    joinDate: "2023-04-01",
    activeProjects: 2,
    completedProjects: 3,
    workload: "Medium",
    location: "Miami, FL",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Home Renovation",
    status: "Active",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    phone: "+1 (555) 678-9012",
    position: "Project Manager",
    department: "Commercial",
    joinDate: "2022-11-30",
    activeProjects: 0,
    completedProjects: 6,
    workload: "Low",
    location: "Dallas, TX",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Commercial Spaces",
    status: "On Leave",
  },
]

export default function OfficersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const filteredOfficers = officersData.filter((officer) => {
    const matchesSearch =
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || officer.department.toLowerCase() === departmentFilter

    return matchesSearch && matchesDepartment
  })

  const getWorkloadBadge = (workload: string) => {
    const colors = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[workload as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{workload}</Badge>
  }

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge variant="secondary">On Leave</Badge>
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
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Officers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Officer Management</h1>
            <p className="text-muted-foreground">Manage project officers and track their workload and assignments</p>
          </div>
          <Button asChild>
            <Link href="/officers/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Officer
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Officers</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{officersData.length}</div>
              <p className="text-xs text-muted-foreground">All officers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Officers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{officersData.filter((o) => o.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">Currently working</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {officersData.reduce((sum, officer) => sum + officer.activeProjects, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Currently managed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Workload</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{officersData.filter((o) => o.workload === "High").length}</div>
              <p className="text-xs text-muted-foreground">Officers at capacity</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Officers</CardTitle>
            <CardDescription>Manage project officers, their assignments, and workload distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search officers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOfficers.map((officer) => (
                <Card key={officer.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={officer.avatar || "/placeholder.svg"} alt={officer.name} />
                          <AvatarFallback>
                            {officer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{officer.name}</CardTitle>
                          <CardDescription>{officer.position}</CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/officers/${officer.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Officer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Assign Project</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(officer.status)}
                      {getWorkloadBadge(officer.workload)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Department</p>
                        <p className="font-medium">{officer.department}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Specialization</p>
                        <p className="font-medium">{officer.specialization}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Active Projects</p>
                        <p className="font-medium">{officer.activeProjects}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Completed</p>
                        <p className="font-medium">{officer.completedProjects}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{officer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{officer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{officer.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined {new Date(officer.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/officers/${officer.id}`}>View Profile</Link>
                      </Button>
                      <Button size="sm">Assign Project</Button>
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
