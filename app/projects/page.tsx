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
  Clock,
  CheckCircle,
  AlertCircle,
  PauseCircle,
  PlayCircle,
} from "lucide-react"
import Link from "next/link"

const projectsData = [
  {
    id: 1,
    name: "Downtown Mall Phase 2",
    client: "MegaBuild Corporation",
    officer: "John Smith",
    status: "Running",
    progress: 75,
    startDate: "2023-03-15",
    endDate: "2024-01-30",
    budget: 850000,
    spent: 637500,
    description: "Expansion of the existing mall with new retail spaces",
    priority: "High",
  },
  {
    id: 2,
    name: "Residential Complex A",
    client: "Urban Developers CV",
    officer: "Sarah Johnson",
    status: "Planning",
    progress: 15,
    startDate: "2023-08-01",
    endDate: "2024-06-15",
    budget: 620000,
    spent: 93000,
    description: "Modern residential complex with 50 units",
    priority: "Medium",
  },
  {
    id: 3,
    name: "Highway Bridge Renovation",
    client: "City Infrastructure Ltd",
    officer: "Mike Wilson",
    status: "Running",
    progress: 45,
    startDate: "2023-05-20",
    endDate: "2023-12-10",
    budget: 1200000,
    spent: 540000,
    description: "Complete renovation of the main highway bridge",
    priority: "High",
  },
  {
    id: 4,
    name: "Eco-Friendly Office Building",
    client: "Green Construction",
    officer: "Emily Davis",
    status: "Completed",
    progress: 100,
    startDate: "2022-11-01",
    endDate: "2023-07-15",
    budget: 480000,
    spent: 465000,
    description: "LEED certified office building with solar panels",
    priority: "Medium",
  },
  {
    id: 5,
    name: "Home Renovation",
    client: "John Smith",
    officer: "Tom Brown",
    status: "Running",
    progress: 60,
    startDate: "2023-06-10",
    endDate: "2023-10-30",
    budget: 125000,
    spent: 75000,
    description: "Complete home renovation including kitchen and bathrooms",
    priority: "Low",
  },
  {
    id: 6,
    name: "Shopping Center Expansion",
    client: "Premier Builders Inc",
    officer: "Lisa Anderson",
    status: "Paused",
    progress: 30,
    startDate: "2023-04-01",
    endDate: "2024-02-28",
    budget: 750000,
    spent: 225000,
    description: "Adding new wing to existing shopping center",
    priority: "Medium",
  },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority.toLowerCase() === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Running: { color: "bg-blue-100 text-blue-800", icon: PlayCircle },
      Planning: { color: "bg-purple-100 text-purple-800", icon: Clock },
      Completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      Paused: { color: "bg-yellow-100 text-yellow-800", icon: PauseCircle },
      Cancelled: { color: "bg-red-100 text-red-800", icon: AlertCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config?.icon || Clock

    return (
      <Badge className={config?.color || "bg-gray-100 text-gray-800"}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{priority}</Badge>
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
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Project Management</h1>
            <p className="text-muted-foreground">Track and manage all your construction projects</p>
          </div>
          <Button asChild>
            <Link href="/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projectsData.length}</div>
              <p className="text-xs text-muted-foreground">All projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <PlayCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projectsData.filter((p) => p.status === "Running").length}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(projectsData.reduce((sum, project) => sum + project.budget, 0) / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">Combined budget</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(projectsData.reduce((sum, project) => sum + project.progress, 0) / projectsData.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Average progress</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Projects</CardTitle>
            <CardDescription>Manage and track the progress of all your construction projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
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
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/projects/${project.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Assign Officer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(project.status)}
                      {getPriorityBadge(project.priority)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Officer</p>
                        <p className="font-medium">{project.officer}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">${project.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Start Date</p>
                        <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">End Date</p>
                        <p className="font-medium">{new Date(project.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Description</p>
                      <p className="text-sm">{project.description}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Spent: </span>
                        <span className="font-medium">${project.spent.toLocaleString()}</span>
                        <span className="text-muted-foreground"> / ${project.budget.toLocaleString()}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>View Details</Link>
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
