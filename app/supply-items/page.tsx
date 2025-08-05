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
    name: "Balok Baja I-Beam 20ft",
    description: "Balok baja I-beam tugas berat untuk dukungan struktural",
    specifications: "Panjang 20ft, Baja Grade A36",
  },
  {
    id: 2,
    name: "Campuran Beton (Kekuatan Tinggi)",
    description: "Campuran beton kekuatan tinggi untuk pondasi",
    specifications: "4000 PSI, Semen Portland",
  },
  {
    id: 3,
    name: "Kabel Listrik 12 AWG",
    description: "Kabel listrik tembaga 12 AWG",
    specifications: "THHN/THWN-2, rated 600V",
  },
  {
    id: 4,
    name: "Lembaran Plywood 4x8",
    description: "Lembaran plywood 3/4 inci untuk konstruksi",
    specifications: "4x8 kaki, Grade A/B, kualitas eksterior",
  },
  {
    id: 5,
    name: "Pipa PVC 4 inci",
    description: "Pipa PVC 4 inci untuk drainase",
    specifications: "Schedule 40, PVC putih",
  },
  {
    id: 6,
    name: "Batt Insulasi R-19",
    description: "Batt insulasi fiberglass",
    specifications: "R-19, tebal 6.25 inci, kraft faced",
  },
]

export default function SupplyItemsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = supplyItemsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specifications.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
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
                <BreadcrumbLink href="/">Dasbor</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Item Persediaan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manajemen Item Persediaan</h1>
            <p className="text-muted-foreground">Kelola katalog material konstruksi dan peralatan Anda</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/supply-items/import">
                <Upload className="mr-2 h-4 w-4" />
                Import Item
              </Link>
            </Button>
            <Button asChild>
              <Link href="/supply-items/new">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Item
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Item</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplyItemsData.length}</div>
              <p className="text-xs text-muted-foreground">Dalam katalog</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Katalog Item Persediaan</CardTitle>
            <CardDescription>Kelola katalog material konstruksi dan peralatan Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari item..."
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
                    <TableHead>Nama Item</TableHead>
                    <TableHead>Spesifikasi</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {item.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm truncate max-w-[300px]">{item.specifications}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Buka menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/supply-items/${item.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Lihat Detail
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Item
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Buat Permintaan</DropdownMenuItem>
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
