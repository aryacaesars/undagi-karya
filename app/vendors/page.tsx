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
import { Search, Plus, MoreHorizontal, Eye, Edit, Star, Truck, Building2, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

const vendorsData = [
  {
    id: 1,
    name: "Steel & Materials Co.",
    category: "Materials",
    email: "orders@steelmaterials.com",
    phone: "+1 (555) 111-2222",
    address: "123 Industrial Ave, New York, NY",
    rating: 4.8,
    totalOrders: 45,
    totalValue: 850000,
    paymentTerms: "Net 30",
    status: "Active",
    joinDate: "2022-03-15",
    lastOrder: "2023-08-10",
    specialties: ["Steel Beams", "Concrete", "Rebar"],
  },
  {
    id: 2,
    name: "BuildPro Supplies",
    category: "Equipment",
    email: "sales@buildprosupplies.com",
    phone: "+1 (555) 222-3333",
    address: "456 Construction Blvd, Los Angeles, CA",
    rating: 4.5,
    totalOrders: 32,
    totalValue: 620000,
    paymentTerms: "Net 15",
    status: "Active",
    joinDate: "2022-07-20",
    lastOrder: "2023-08-12",
    specialties: ["Power Tools", "Safety Equipment", "Electrical"],
  },
  {
    id: 3,
    name: "Heavy Equipment Rentals",
    category: "Equipment",
    email: "rentals@heavyequipment.com",
    phone: "+1 (555) 333-4444",
    address: "789 Equipment Way, Chicago, IL",
    rating: 4.2,
    totalOrders: 28,
    totalValue: 780000,
    paymentTerms: "Net 30",
    status: "Active",
    joinDate: "2021-11-08",
    lastOrder: "2023-08-08",
    specialties: ["Excavators", "Cranes", "Bulldozers"],
  },
  {
    id: 4,
    name: "Green Materials Inc.",
    category: "Materials",
    email: "info@greenmaterials.com",
    phone: "+1 (555) 444-5555",
    address: "321 Eco Street, Seattle, WA",
    rating: 4.6,
    totalOrders: 18,
    totalValue: 320000,
    paymentTerms: "Net 45",
    status: "Active",
    joinDate: "2023-01-12",
    lastOrder: "2023-08-05",
    specialties: ["Solar Panels", "Insulation", "Eco-Friendly Materials"],
  },
  {
    id: 5,
    name: "Home Depot Pro",
    category: "General",
    email: "pro@homedepot.com",
    phone: "+1 (555) 555-6666",
    address: "654 Retail Plaza, Miami, FL",
    rating: 4.0,
    totalOrders: 52,
    totalValue: 280000,
    paymentTerms: "Net 15",
    status: "Active",
    joinDate: "2022-05-30",
    lastOrder: "2023-08-07",
    specialties: ["General Supplies", "Hardware", "Appliances"],
  },
  {
    id: 6,
    name: "Commercial Supplies Ltd.",
    category: "HVAC",
    email: "orders@commercialsupplies.com",
    phone: "+1 (555) 666-7777",
    address: "987 Business Park, Dallas, TX",
    rating: 3.8,
    totalOrders: 24,
    totalValue: 520000,
    paymentTerms: "Net 30",
    status: "Inactive",
    joinDate: "2022-09-15",
    lastOrder: "2023-06-20",
    specialties: ["HVAC Systems", "Electrical Panels", "Commercial Equipment"],
  },
]

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredVendors = vendorsData.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || vendor.category.toLowerCase() === categoryFilter
    const matchesStatus = statusFilter === "all" || vendor.status.toLowerCase() === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    )
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      Materials: "bg-blue-100 text-blue-800",
      Equipment: "bg-purple-100 text-purple-800",
      General: "bg-orange-100 text-orange-800",
      HVAC: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
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
                <BreadcrumbPage>Vendors</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vendor Management</h1>
            <p className="text-muted-foreground">Manage suppliers, vendors, and track their performance</p>
          </div>
          <Button asChild>
            <Link href="/vendors/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Vendor
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vendorsData.length}</div>
              <p className="text-xs text-muted-foreground">All vendors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vendorsData.filter((v) => v.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">Currently working</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {vendorsData.reduce((sum, vendor) => sum + vendor.totalOrders, 0)}
              </div>
              <p className="text-xs text-muted-foreground">All time orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(vendorsData.reduce((sum, vendor) => sum + vendor.totalValue, 0) / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">Combined orders</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Vendors</CardTitle>
            <CardDescription>Manage your vendor relationships and track performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="materials">Materials</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="hvac">HVAC</SelectItem>
                </SelectContent>
              </Select>
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
                    <TableHead>Vendor</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Payment Terms</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{vendor.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {vendor.specialties.slice(0, 2).join(", ")}
                            {vendor.specialties.length > 2 && "..."}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryBadge(vendor.category)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{vendor.email}</div>
                          <div className="text-sm text-muted-foreground">{vendor.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {renderStars(vendor.rating)}
                          <span className="ml-1 text-sm">{vendor.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{vendor.totalOrders} orders</Badge>
                      </TableCell>
                      <TableCell>${vendor.totalValue.toLocaleString()}</TableCell>
                      <TableCell>{vendor.paymentTerms}</TableCell>
                      <TableCell>{getStatusBadge(vendor.status)}</TableCell>
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
                              <Link href={`/vendors/${vendor.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Vendor
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Create Order</DropdownMenuItem>
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
