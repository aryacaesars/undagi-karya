"use client"

import { useState } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Calendar,
  DollarSign,
  User,
  Edit,
  Plus,
  CheckCircle,
  Clock,
  PlayCircle,
  AlertCircle,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data
const projectData = {
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
  description: "Expansion of the existing mall with new retail spaces, food court, and parking facilities.",
  priority: "High",
  location: "Downtown Business District, New York",
  category: "Commercial",
}

const projectStages = [
  {
    id: 1,
    name: "Foundation & Site Preparation",
    progress: 100,
    status: "Completed",
    startDate: "2023-03-15",
    endDate: "2023-05-30",
    budget: 150000,
    spent: 148000,
  },
  {
    id: 2,
    name: "Structural Framework",
    progress: 100,
    status: "Completed",
    startDate: "2023-06-01",
    endDate: "2023-08-15",
    budget: 300000,
    spent: 295000,
  },
  {
    id: 3,
    name: "Interior Construction",
    progress: 60,
    status: "Running",
    startDate: "2023-08-16",
    endDate: "2023-11-30",
    budget: 250000,
    spent: 150000,
  },
  {
    id: 4,
    name: "Electrical & Plumbing",
    progress: 30,
    status: "Running",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    budget: 100000,
    spent: 30000,
  },
  {
    id: 5,
    name: "Final Finishing",
    progress: 0,
    status: "Planning",
    startDate: "2023-12-01",
    endDate: "2024-01-30",
    budget: 50000,
    spent: 0,
  },
]

const supplyRequests = [
  {
    id: "SR-001",
    description: "Steel beams and concrete",
    status: "Approved",
    requestDate: "2023-08-15",
    estimatedCost: 45000,
    vendor: "Steel & Materials Co.",
  },
  {
    id: "SR-002",
    description: "Electrical components",
    status: "Pending",
    requestDate: "2023-08-20",
    estimatedCost: 25000,
    vendor: "ElectricPro Supplies",
  },
  {
    id: "SR-003",
    description: "Interior fixtures",
    status: "Draft",
    requestDate: "2023-08-22",
    estimatedCost: 35000,
    vendor: "Interior Solutions",
  },
]

const projectDocuments = [
  { id: 1, name: "Project Blueprint.pdf", type: "Blueprint", uploadDate: "2023-03-10", size: "2.4 MB" },
  { id: 2, name: "Building Permit.pdf", type: "Permit", uploadDate: "2023-03-12", size: "1.1 MB" },
  { id: 3, name: "Safety Report.pdf", type: "Report", uploadDate: "2023-08-15", size: "3.2 MB" },
  { id: 4, name: "Progress Photos.zip", type: "Photos", uploadDate: "2023-08-20", size: "15.7 MB" },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Running: { color: "bg-blue-100 text-blue-800", icon: PlayCircle },
      Completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      Planning: { color: "bg-purple-100 text-purple-800", icon: Clock },
      Paused: { color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{projectData.name}</BreadcrumbPage>
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
              <h1 className="text-2xl font-bold tracking-tight">{projectData.name}</h1>
              <div className="flex items-center gap-2">
                {getStatusBadge(projectData.status)}
                {getPriorityBadge(projectData.priority)}
                <Badge variant="outline">{projectData.category}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
            <Button asChild>
              <Link href="/supply-requests/new">
                <Plus className="mr-2 h-4 w-4" />
                Supply Request
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projectData.progress}%</div>
              <Progress value={projectData.progress} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(projectData.budget / 1000).toFixed(0)}K</div>
              <p className="text-xs text-muted-foreground">
                ${(projectData.spent / 1000).toFixed(0)}K spent (
                {Math.round((projectData.spent / projectData.budget) * 100)}%)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Timeline</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.ceil((new Date(projectData.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <p className="text-xs text-muted-foreground">days remaining</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Officer</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projectData.officer.split(" ")[0]}</div>
              <p className="text-xs text-muted-foreground">{projectData.officer}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stages">Project Stages</TabsTrigger>
            <TabsTrigger value="supplies">Supply Requests</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                  <CardDescription>Basic details about the project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Client</p>
                        <p className="text-sm text-muted-foreground">{projectData.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Project Officer</p>
                        <p className="text-sm text-muted-foreground">{projectData.officer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Timeline</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(projectData.startDate).toLocaleDateString()} -{" "}
                          {new Date(projectData.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{projectData.location}</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-2">Description</p>
                    <p className="text-sm text-muted-foreground">{projectData.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Breakdown</CardTitle>
                  <CardDescription>Financial overview of the project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Budget</span>
                      <span className="text-sm font-medium">${projectData.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Amount Spent</span>
                      <span className="text-sm font-medium">${projectData.spent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Remaining</span>
                      <span className="text-sm font-medium">
                        ${(projectData.budget - projectData.spent).toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Budget Utilization</span>
                      <span className="text-sm font-medium">
                        {Math.round((projectData.spent / projectData.budget) * 100)}%
                      </span>
                    </div>
                    <Progress value={(projectData.spent / projectData.budget) * 100} className="mt-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Stages</CardTitle>
                <CardDescription>Track progress across different project phases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectStages.map((stage) => (
                    <div key={stage.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{stage.name}</h4>
                        {getStatusBadge(stage.status)}
                      </div>
                      <div className="grid gap-2 md:grid-cols-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <span className="font-medium">Timeline:</span>{" "}
                          {new Date(stage.startDate).toLocaleDateString()} -{" "}
                          {new Date(stage.endDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Budget:</span> ${stage.budget.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Spent:</span> ${stage.spent.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Progress:</span> {stage.progress}%
                        </div>
                      </div>
                      <Progress value={stage.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supplies" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Supply Requests</CardTitle>
                  <CardDescription>Material and equipment requests for this project</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/supply-requests/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Request
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supplyRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>{request.description}</TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell>{request.vendor}</TableCell>
                          <TableCell>${request.estimatedCost.toLocaleString()}</TableCell>
                          <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Project Documents</CardTitle>
                  <CardDescription>Files and documents related to this project</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {projectDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.size} • {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}
