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
import { Search, Plus, MoreHorizontal, Eye, Edit, Package, Truck, Upload } from "lucide-react"
import Link from "next/link"

const formsData = [
  {
    id: "FORM-2025-001",
    title: "Project Budget Approval",
    submitter: "John Doe",
    dateSubmitted: "2025-07-28",
    status: "Pending",
    priority: "High",
    type: "Budget"
  },
  {
    id: "FORM-2025-002",
    title: "Site Inspection Request",
    submitter: "Jane Smith",
    dateSubmitted: "2025-07-29",
    status: "Approved",
    priority: "Medium",
    type: "Inspection"
  },
  {
    id: "FORM-2025-003",
    title: "Material Quality Issue Report",
    submitter: "Robert Johnson",
    dateSubmitted: "2025-07-30",
    status: "Under Review",
    priority: "High",
    type: "Issue Report"
  },
  {
    id: "FORM-2025-004",
    title: "Contractor Payment Request",
    submitter: "Sarah Williams",
    dateSubmitted: "2025-07-31",
    status: "Pending",
    priority: "Medium",
    type: "Payment"
  },
  {
    id: "FORM-2025-005",
    title: "Change Order Request",
    submitter: "Michael Brown",
    dateSubmitted: "2025-08-01",
    status: "Approved",
    priority: "Low",
    type: "Change Request"
  },
  {
    id: "FORM-2025-006",
    title: "Safety Incident Report",
    submitter: "Emily Davis",
    dateSubmitted: "2025-08-02",
    status: "Urgent Review",
    priority: "Critical",
    type: "Incident Report"
  },
]

export default function FormsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredForms = formsData.filter((form) => {
    const matchesSearch =
      form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.submitter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || form.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || form.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

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
                <BreadcrumbPage>Forms</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Forms Management</h1>
            <p className="text-muted-foreground">Track and manage incoming forms and requests</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Export Forms
            </Button>
            <Button asChild>
              <Link href="/forms/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Form
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formsData.length}</div>
              <p className="text-xs text-muted-foreground">Submitted forms</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formsData.filter(f => f.status === "Pending").length}</div>
              <p className="text-xs text-muted-foreground">Awaiting action</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formsData.filter(f => f.priority === "High" || f.priority === "Critical").length}</div>
              <p className="text-xs text-muted-foreground">Need urgent attention</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formsData.filter(f => f.status === "Approved").length}</div>
              <p className="text-xs text-muted-foreground">Processed forms</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Incoming Forms</CardTitle>
            <CardDescription>Review and process submitted forms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search forms..."
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
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="under review">Under Review</SelectItem>
                  <SelectItem value="urgent review">Urgent Review</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="issue report">Issue Report</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="change request">Change Request</SelectItem>
                  <SelectItem value="incident report">Incident Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Form ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Submitter</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell className="font-mono text-sm">
                        {form.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{form.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {form.type}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{form.submitter}</TableCell>
                      <TableCell>{new Date(form.dateSubmitted).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            form.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : form.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : form.status === "Urgent Review"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {form.status}
                        </Badge>
                      </TableCell>
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
                              <Link href={`/form/${form.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Process Form
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
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
