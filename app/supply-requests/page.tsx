"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Eye, Edit, Check, X, Clock, Package, CheckCircle, FileText } from "lucide-react"
import Link from "next/link"

const supplyRequestsData = [
  {
    id: "SR-001",
    project: "Downtown Mall Phase 2",
    requestedBy: "John Smith",
    requestDate: "2023-08-15",
    status: "Pending",
    priority: "High",
    totalItems: 5,
    estimatedCost: 45000,
    vendor: "Steel & Materials Co.",
    description: "Steel beams and concrete for foundation",
    approvedBy: null,
    approvedDate: null,
  },
  {
    id: "SR-002",
    project: "Residential Complex A",
    requestedBy: "Sarah Johnson",
    requestDate: "2023-08-12",
    status: "Approved",
    priority: "Medium",
    totalItems: 8,
    estimatedCost: 32000,
    vendor: "BuildPro Supplies",
    description: "Electrical components and wiring",
    approvedBy: "Mike Wilson",
    approvedDate: "2023-08-14",
  },
  {
    id: "SR-003",
    project: "Highway Bridge Renovation",
    requestedBy: "Mike Wilson",
    requestDate: "2023-08-10",
    status: "Draft",
    priority: "High",
    totalItems: 12,
    estimatedCost: 78000,
    vendor: "Heavy Equipment Rentals",
    description: "Heavy machinery and construction equipment",
    approvedBy: null,
    approvedDate: null,
  },
  {
    id: "SR-004",
    project: "Eco-Friendly Office Building",
    requestedBy: "Emily Davis",
    requestDate: "2023-08-08",
    status: "Rejected",
    priority: "Low",
    totalItems: 3,
    estimatedCost: 15000,
    vendor: "Green Materials Inc.",
    description: "Solar panels and eco-friendly insulation",
    approvedBy: "John Smith",
    approvedDate: "2023-08-09",
  },
  {
    id: "SR-005",
    project: "Home Renovation",
    requestedBy: "Tom Brown",
    requestDate: "2023-08-05",
    status: "Approved",
    priority: "Medium",
    totalItems: 6,
    estimatedCost: 8500,
    vendor: "Home Depot Pro",
    description: "Kitchen appliances and bathroom fixtures",
    approvedBy: "Sarah Johnson",
    approvedDate: "2023-08-07",
  },
  {
    id: "SR-006",
    project: "Shopping Center Expansion",
    requestedBy: "Lisa Anderson",
    requestDate: "2023-08-03",
    status: "Pending",
    priority: "Medium",
    totalItems: 9,
    estimatedCost: 52000,
    vendor: "Commercial Supplies Ltd.",
    description: "HVAC systems and electrical panels",
    approvedBy: null,
    approvedDate: null,
  },
]

export default function SupplyRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredRequests = supplyRequestsData.filter((request) => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status.toLowerCase() === statusFilter
    const matchesPriority = priorityFilter === "all" || request.priority.toLowerCase() === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Draft: { color: "bg-gray-100 text-gray-800", icon: FileText },
      Pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      Approved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      Rejected: { color: "bg-red-100 text-red-800", icon: X },
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
              <BreadcrumbItem>
                <BreadcrumbPage>Supply Requests</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Supply Request Management</h1>
            <p className="text-muted-foreground">Manage material and equipment requests for all projects</p>
          </div>
          <Button asChild>
            <Link href="/supply-requests/new">
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplyRequestsData.length}</div>
              <p className="text-xs text-muted-foreground">All requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {supplyRequestsData.filter((r) => r.status === "Pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(supplyRequestsData.reduce((sum, request) => sum + request.estimatedCost, 0) / 1000).toFixed(0)}K
              </div>
              <p className="text-xs text-muted-foreground">Estimated cost</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {supplyRequestsData.filter((r) => r.status === "Approved").length}
              </div>
              <p className="text-xs text-muted-foreground">Ready for procurement</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Supply Requests</CardTitle>
            <CardDescription>Track and manage material and equipment requests across all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Estimated Cost</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.project}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {request.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{request.requestedBy}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.totalItems} items</Badge>
                      </TableCell>
                      <TableCell>${request.estimatedCost.toLocaleString()}</TableCell>
                      <TableCell>{request.vendor}</TableCell>
                      <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/supply-requests/${request.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Request
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {request.status === "Pending" && (
                              <>
                                <DropdownMenuItem className="text-green-600">
                                  <Check className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <X className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
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
