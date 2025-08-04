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
import { Search, Plus, MoreHorizontal, Eye, Edit, Truck, Building2, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

const vendorsData = [
  {
    id: 1,
    name: "Steel & Materials Co.",
    phone: "+1 (555) 111-2222",
    address: "123 Industrial Ave, New York, NY",
    totalOrders: 45,
    paymentTerms: "Net 30",
    joinDate: "2022-03-15",
    lastOrder: "2023-08-10",
  },
  {
    id: 2,
    name: "BuildPro Supplies",
    phone: "+1 (555) 222-3333",
    address: "456 Construction Blvd, Los Angeles, CA",
    totalOrders: 32,
    paymentTerms: "Net 15",
    joinDate: "2022-07-20",
    lastOrder: "2023-08-12",
  },
  {
    id: 3,
    name: "Heavy Equipment Rentals",
    phone: "+1 (555) 333-4444",
    address: "789 Equipment Way, Chicago, IL",
    totalOrders: 28,
    paymentTerms: "Net 30",
    joinDate: "2021-11-08",
    lastOrder: "2023-08-08",
  },
  {
    id: 4,
    name: "Green Materials Inc.",
    phone: "+1 (555) 444-5555",
    address: "321 Eco Street, Seattle, WA",
    totalOrders: 18,
    paymentTerms: "Net 45",
    joinDate: "2023-01-12",
    lastOrder: "2023-08-05",
  },
  {
    id: 5,
    name: "Home Depot Pro",
    phone: "+1 (555) 555-6666",
    address: "654 Retail Plaza, Miami, FL",
    totalOrders: 52,
    paymentTerms: "Net 15",
    joinDate: "2022-05-30",
    lastOrder: "2023-08-07",
  },
  {
    id: 6,
    name: "Commercial Supplies Ltd.",
    phone: "+1 (555) 666-7777",
    address: "987 Business Park, Dallas, TX",
    totalOrders: 24,
    paymentTerms: "Net 30",
    joinDate: "2022-09-15",
    lastOrder: "2023-06-20",
  },
]

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredVendors = vendorsData.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone.toLowerCase().includes(searchTerm.toLowerCase())
    // No category filter needed anymore
    const matchesCategory = categoryFilter === "all" 

    return matchesSearch && matchesCategory
  })



  // Category badge function removed

  // Rating stars function removed

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

        <div className="grid gap-4 md:grid-cols-2">
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
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Payment Terms</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{vendor.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm text-muted-foreground">{vendor.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{vendor.totalOrders} orders</Badge>
                      </TableCell>
                      <TableCell>{vendor.paymentTerms}</TableCell>
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
