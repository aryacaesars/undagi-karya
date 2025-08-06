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
import { Search, Plus, MoreHorizontal, Eye, Edit, Truck, Building2, Calendar, DollarSign, Loader2 } from "lucide-react"
import Link from "next/link"
import { useVendors } from "@/hooks/use-vendors"
import { useDebounce } from "@/hooks/use-debounce"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearch = useDebounce(searchTerm, 300)
  
  const { vendors, pagination, loading, error } = useVendors(
    debouncedSearch || undefined, 
    currentPage, 
    10
  )

  if (error) {
    return (
      <SidebarInset>
        <div className="flex flex-1 items-center justify-center p-4">
          <Alert className="max-w-md">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </SidebarInset>
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
                <BreadcrumbLink href="/">Dasbor</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Vendor</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manajemen Vendor</h1>
            <p className="text-muted-foreground">Kelola pemasok, vendor, dan pantau kinerja mereka</p>
          </div>
          <Button asChild>
            <Link href="/vendors/new">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Vendor
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vendor</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  pagination.totalItems
                )}
              </div>
              <p className="text-xs text-muted-foreground">Semua vendor</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Halaman</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  `${pagination.currentPage} dari ${pagination.totalPages}`
                )}
              </div>
              <p className="text-xs text-muted-foreground">Halaman saat ini</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Semua Vendor</CardTitle>
            <CardDescription>Kelola hubungan vendor Anda dan pantau metrik kinerja</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari vendor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Memuat vendors...</span>
                </div>
              </div>
            ) : vendors.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Truck className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Tidak ada vendor</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {debouncedSearch ? "Tidak ada vendor yang sesuai dengan pencarian." : "Belum ada vendor yang ditambahkan."}
                </p>
                <Button asChild>
                  <Link href="/vendors/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Vendor Pertama
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Kontak</TableHead>
                        <TableHead>Alamat</TableHead>
                        <TableHead>Syarat Pembayaran</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendors.map((vendor) => (
                        <TableRow key={vendor.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{vendor.name}</div>
                              {vendor.contactPerson && (
                                <div className="text-sm text-muted-foreground">
                                  {vendor.contactPerson}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm text-muted-foreground">
                                {vendor.phone || 'Tidak ada'}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground max-w-xs truncate">
                              {vendor.address || 'Tidak ada'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {vendor.paymentTerms || 'Belum diatur'}
                            </Badge>
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
                                  <Link href={`/vendors/${vendor.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Lihat Detail
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/vendors/${vendor.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Vendor
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link href="/supply-requests/new">
                                    Buat Pesanan
                                  </Link>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between px-2 py-4">
                    <div className="text-sm text-muted-foreground">
                      Menampilkan {vendors.length} dari {pagination.totalItems} vendor
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage <= 1}
                      >
                        Sebelumnya
                      </Button>
                      <div className="text-sm">
                        Halaman {pagination.currentPage} dari {pagination.totalPages}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage >= pagination.totalPages}
                      >
                        Selanjutnya
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
