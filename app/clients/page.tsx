"use client"

import { useState, useEffect } from "react"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Building2, Calendar, Loader2 } from "lucide-react"
import Link from "next/link"
import { useClients } from "@/hooks/use-clients"
import { toast } from "sonner"

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<string | null>(null)
  
  const {
    clients,
    loading,
    error,
    pagination,
    fetchClients,
    deleteClient,
    clearError
  } = useClients()

  // Fetch clients on component mount and when search/page changes
  useEffect(() => {
    fetchClients({
      search: searchTerm || undefined,
      page: currentPage,
      limit: 10
    })
  }, [fetchClients, searchTerm, currentPage])

  // Handle search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1) // Reset to first page when searching
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Handle delete client
  const handleDeleteClient = async () => {
    if (!clientToDelete) return

    try {
      const result = await deleteClient(clientToDelete)
      if (result.success) {
        toast.success("Client berhasil dihapus")
        setDeleteDialogOpen(false)
        setClientToDelete(null)
      } else {
        toast.error(result.error || "Gagal menghapus client")
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus client")
    }
  }

  // Show error toast when error occurs
  useEffect(() => {
    if (error) {
      toast.error(error)
      clearError()
    }
  }, [error, clearError])

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
                <BreadcrumbPage>Klien</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manajemen Klien</h1>
            <p className="text-muted-foreground">Kelola klien Anda dan lacak riwayat proyek mereka</p>
          </div>
          <Button asChild>
            <Link href="/clients/new">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Klien
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Klien</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  pagination.totalItems
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Klien terdaftar
              </p>
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
                  `${pagination.currentPage} / ${pagination.totalPages}`
                )}
              </div>
              <p className="text-xs text-muted-foreground">Halaman saat ini</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Semua Klien</CardTitle>
            <CardDescription>Daftar semua klien dengan informasi proyek dan status mereka</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari klien..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              {loading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memuat...
                </div>
              )}
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Klien</TableHead>
                    <TableHead>Kontak</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal Bergabung</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-6 w-6 animate-spin" />
                          <span>Memuat data klien...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : clients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <p className="text-muted-foreground">
                          {searchTerm 
                            ? "Tidak ada klien yang ditemukan sesuai kriteria pencarian." 
                            : "Belum ada klien yang terdaftar."
                          }
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ID: {client.id.slice(0, 8)}...
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm font-medium">
                              {client.phone || "Tidak ada"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {client.address || "Alamat tidak tersedia"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Aktif</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(client.createdAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
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
                                <Link href={`/clients/${client.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Lihat Detail
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/clients/${client.id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Klien
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => {
                                  setClientToDelete(client.id)
                                  setDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Hapus Klien
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

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Menampilkan {clients.length} dari {pagination.totalItems} klien
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || loading}
                  >
                    Sebelumnya
                  </Button>
                  <span className="text-sm">
                    Halaman {pagination.currentPage} dari {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                    disabled={currentPage === pagination.totalPages || loading}
                  >
                    Selanjutnya
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus klien ini? Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setClientToDelete(null)}>
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteClient}
                className="bg-red-600 hover:bg-red-700"
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </SidebarInset>
  )
}
