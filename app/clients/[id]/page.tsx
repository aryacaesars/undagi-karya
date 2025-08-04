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
  DollarSign,
  FolderOpen,
  Edit,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  PlayCircle,
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
  status: "Active",
  description:
    "Leading construction company specializing in large-scale commercial projects and infrastructure development.",
  contactPerson: "Robert Johnson",
  totalProjects: 12,
  activeProjects: 3,
  completedProjects: 9,
  totalValue: 2850000,
  averageProjectValue: 237500,
}

const projectHistory = [
  {
    id: 1,
    name: "Downtown Mall Phase 2",
    status: "Running",
    progress: 75,
    startDate: "2023-03-15",
    endDate: "2024-01-30",
    budget: 850000,
    officer: "John Smith",
  },
  {
    id: 2,
    name: "Corporate Office Building",
    status: "Completed",
    progress: 100,
    startDate: "2022-08-01",
    endDate: "2023-02-28",
    budget: 1200000,
    officer: "Sarah Johnson",
  },
  {
    id: 3,
    name: "Warehouse Expansion",
    status: "Running",
    progress: 45,
    startDate: "2023-06-10",
    endDate: "2023-12-15",
    budget: 650000,
    officer: "Mike Wilson",
  },
  {
    id: 4,
    name: "Parking Structure",
    status: "Completed",
    progress: 100,
    startDate: "2022-03-01",
    endDate: "2022-09-30",
    budget: 450000,
    officer: "Emily Davis",
  },
]

export default function ClientDetailPage() {
  const params = useParams()
  const clientId = params.id

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Running: { color: "bg-blue-100 text-blue-800", icon: PlayCircle },
      Completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      Planning: { color: "bg-purple-100 text-purple-800", icon: Clock },
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
                <BreadcrumbLink href="/clients">Clients</BreadcrumbLink>
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
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">{clientData.status}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Client
            </Button>
            <Button asChild>
              <Link href="/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientData.totalProjects}</div>
              <p className="text-xs text-muted-foreground">{clientData.activeProjects} active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(clientData.totalValue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">All projects combined</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Project</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(clientData.averageProjectValue / 1000).toFixed(0)}K</div>
              <p className="text-xs text-muted-foreground">Per project value</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((clientData.completedProjects / clientData.totalProjects) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">Completion rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>Detailed information about the client</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{clientData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{clientData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Contact Person</p>
                      <p className="text-sm text-muted-foreground">{clientData.contactPerson}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Join Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(clientData.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-2">Description</p>
                <p className="text-sm text-muted-foreground">{clientData.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common actions for this client</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/projects/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Project
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Edit className="mr-2 h-4 w-4" />
                Edit Client Info
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FolderOpen className="mr-2 h-4 w-4" />
                View All Projects
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project History</CardTitle>
            <CardDescription>All projects associated with this client</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Officer</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectHistory.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{getStatusBadge(project.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="w-16 h-2" />
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{project.officer}</TableCell>
                      <TableCell>${project.budget.toLocaleString()}</TableCell>
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
