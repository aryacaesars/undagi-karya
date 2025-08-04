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

const supplyItemsData = [
  {
    id: 1,
    name: "Steel I-Beam 20ft",
    category: "Structural Steel",
    unit: "piece",
    description: "Heavy-duty steel I-beam for structural support",
    specifications: "20ft length, Grade A36 steel",
    preferredVendor: "Steel & Materials Co.",
    lastOrderDate: "2023-08-15",
    totalOrdered: 45,
    status: "Active",
  },
  {
    id: 2,
    name: "Concrete Mix (High Strength)",
    category: "Concrete",
    unit: "cubic yard",
    description: "High-strength concrete mix for foundations",
    specifications: "4000 PSI, Portland cement",
    preferredVendor: "ConcreteMax Supplies",
    lastOrderDate: "2023-08-12",
    totalOrdered: 150,
    status: "Active",
  },
  {
    id: 3,
    name: "Electrical Wire 12 AWG",
    category: "Electrical",
    unit: "foot",
    description: "12 AWG copper electrical wire",
    specifications: "THHN/THWN-2, 600V rated",
    preferredVendor: "ElectricPro Supplies",
    lastOrderDate: "2023-08-10",
    totalOrdered: 2500,
    status: "Active",
  },
  {
    id: 4,
    name: "Plywood Sheet 4x8",
    category: "Lumber",
    unit: "sheet",
    description: "3/4 inch plywood sheet for construction",
    specifications: "4x8 feet, Grade A/B, exterior grade",
    preferredVendor: "Lumber Depot",
    lastOrderDate: "2023-08-08",
    totalOrdered: 200,
    status: "Active",
  },
  {
    id: 5,
    name: "PVC Pipe 4 inch",
    category: "Plumbing",
    unit: "foot",
    description: "4-inch PVC pipe for drainage",
    specifications: "Schedule 40, white PVC",
    preferredVendor: "PlumbingPro Supply",
    lastOrderDate: "2023-08-05",
    totalOrdered: 800,
    status: "Active",
  },
  {
    id: 6,
    name: "Insulation Batts R-19",
    category: "Insulation",
    unit: "square foot",
    description: "Fiberglass insulation batts",
    specifications: "R-19, 6.25 inch thick, kraft faced",
    preferredVendor: "Insulation Warehouse",
    lastOrderDate: "2023-07-28",
    totalOrdered: 5000,
    status: "Discontinued",
  },
]

export default function SupplyItemsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredItems = supplyItemsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specifications.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge variant="secondary">Discontinued</Badge>
    )
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      "Structural Steel": "bg-blue-100 text-blue-800",
      Concrete: "bg-gray-100 text-gray-800",
      Electrical: "bg-yellow-100 text-yellow-800",
      Lumber: "bg-green-100 text-green-800",
      Plumbing: "bg-purple-100 text-purple-800",
      Insulation: "bg-orange-100 text-orange-800",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
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
                <BreadcrumbPage>Supply Items</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Supply Items Management</h1>
            <p className="text-muted-foreground">Manage your catalog of construction materials and equipment</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/supply-items/import">
                <Upload className="mr-2 h-4 w-4" />
                Import Items
              </Link>
            </Button>
            <Button asChild>
              <Link href="/supply-items/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplyItemsData.length}</div>
              <p className="text-xs text-muted-foreground">In catalog</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplyItemsData.filter((i) => i.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">Available for order</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(supplyItemsData.map((item) => item.category)).size}</div>
              <p className="text-xs text-muted-foreground">Item categories</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ordered</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {supplyItemsData.reduce((sum, item) => sum + item.totalOrdered, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Items ordered</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Supply Items Catalog</CardTitle>
            <CardDescription>Manage your construction materials and equipment catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
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
                  <SelectItem value="structural steel">Structural Steel</SelectItem>
                  <SelectItem value="concrete">Concrete</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="lumber">Lumber</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="insulation">Insulation</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Preferred Vendor</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Total Ordered</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {item.specifications}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryBadge(item.category)}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.preferredVendor}</TableCell>
                      <TableCell>{new Date(item.lastOrderDate).toLocaleDateString()}</TableCell>
                      <TableCell>{item.totalOrdered.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
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
                              <Link href={`/supply-items/${item.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Item
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Create Request</DropdownMenuItem>
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
