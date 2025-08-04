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
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Building2, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

const clientsData = [
  {
    id: 1,
    name: "MegaBuild Corporation",
    phone: "+1 (555) 123-4567",
    joinDate: "2023-01-15",
    projectsCount: 12,
    totalValue: 850000,
    status: "Active",
    lastProject: "Downtown Mall Phase 2",
  },
  {
    id: 2,
    name: "Urban Developers CV",
    phone: "+1 (555) 234-5678",
    joinDate: "2023-03-22",
    projectsCount: 8,
    totalValue: 620000,
    status: "Active",
    lastProject: "Residential Complex A",
  },
  {
    id: 3,
    name: "City Infrastructure Ltd",
    phone: "+1 (555) 345-6789",
    joinDate: "2022-11-08",
    projectsCount: 15,
    totalValue: 1200000,
    status: "Active",
    lastProject: "Highway Bridge Renovation",
  },
  {
    id: 4,
    name: "Green Construction",
    phone: "+1 (555) 456-7890",
    joinDate: "2023-05-10",
    projectsCount: 6,
    totalValue: 480000,
    status: "Active",
    lastProject: "Eco-Friendly Office Building",
  },
  {
    id: 5,
    name: "John Smith",
    phone: "+1 (555) 567-8901",
    joinDate: "2023-07-18",
    projectsCount: 2,
    totalValue: 125000,
    status: "Active",
    lastProject: "Home Renovation",
  },
  {
    id: 6,
    name: "Premier Builders Inc",
    phone: "+1 (555) 678-9012",
    joinDate: "2023-02-28",
    projectsCount: 9,
    totalValue: 750000,
    status: "Inactive",
    lastProject: "Shopping Center Expansion",
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredClients = clientsData.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status.toLowerCase() === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
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
                <BreadcrumbPage>Clients</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Client Management</h1>
            <p className="text-muted-foreground">Manage your clients and track their project history</p>
          </div>
          <Button asChild>
            <Link href="/clients/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientsData.length}</div>
              <p className="text-xs text-muted-foreground">
                {clientsData.filter((c) => c.status === "Active").length} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {clientsData.reduce((sum, client) => sum + client.projectsCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">All client projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(clientsData.reduce((sum, client) => sum + client.totalValue, 0) / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">Combined project value</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Project</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${Math.round(clientsData.reduce((sum, client) => sum + client.totalValue, 0) / clientsData.reduce((sum, client) => sum + client.projectsCount, 0) / 1000)}K
              </div>
              <p className="text-xs text-muted-foreground">Per project value</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Clients</CardTitle>
            <CardDescription>A list of all clients with their project information and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No clients found matching your criteria.</p>
                    </div>
                  ) : (
                    filteredClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-muted-foreground">Last: {client.lastProject}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm font-medium">{client.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{client.projectsCount} projects</Badge>
                        </TableCell>
                        <TableCell>${client.totalValue.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(client.status)}</TableCell>
                        <TableCell>{new Date(client.joinDate).toLocaleDateString()}</TableCell>
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
                                <Link href={`/clients/${client.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Client
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Client
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
