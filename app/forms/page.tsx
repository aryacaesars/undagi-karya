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
import { Search, Plus, MoreHorizontal, Eye, Edit, Package, Truck, Upload } from "lucide-react"
import Link from "next/link"

// API-connected forms data
export interface ApiForm {
  id: string;
  formNumber: string;
  title: string | null;
  type: string;
  submissionDate: string;
  description: string | null;
  notes: string | null;
  project?: { name: string } | null;
  officer?: { name: string } | null;
  createdAt?: string;
}


export default function FormsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [forms, setForms] = useState<ApiForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/forms");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Gagal mengambil data forms");
        setForms(data.data || []);
      } catch (err: any) {
        setError(err.message || "Gagal mengambil data forms");
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  const filteredForms = forms.filter((form) => {
    const matchesSearch =
      (form.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (form.officer?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (form.formNumber?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || (form.type?.toLowerCase() || "") === typeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });

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
                <BreadcrumbPage>Formulir</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manajemen Formulir</h1>
            <p className="text-muted-foreground">Lacak dan kelola formulir serta permintaan yang masuk</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Ekspor Formulir
            </Button>
            <Button asChild>
              <Link href="/forms/new">
                <Plus className="mr-2 h-4 w-4" />
                Buat Formulir
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Formulir</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '-' : forms.length}</div>
              <p className="text-xs text-muted-foreground">Formulir yang dikirim</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formulir Masuk</CardTitle>
            <CardDescription>Tinjau dan proses formulir yang dikirim</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari formulir..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter berdasarkan tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="anggaran">Anggaran</SelectItem>
                  <SelectItem value="inspeksi">Inspeksi</SelectItem>
                  <SelectItem value="laporan masalah">Laporan Masalah</SelectItem>
                  <SelectItem value="pembayaran">Pembayaran</SelectItem>
                  <SelectItem value="permintaan perubahan">Permintaan Perubahan</SelectItem>
                  <SelectItem value="laporan insiden">Laporan Insiden</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              {error && (
                <div className="p-4 text-red-600">{error}</div>
              )}
              {loading ? (
                <div className="p-4 text-muted-foreground">Memuat data formulir...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Formulir</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Pengaju</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredForms.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">Tidak ada data</TableCell>
                      </TableRow>
                    ) : (
                      filteredForms.map((form) => (
                        <TableRow key={form.id}>
                          <TableCell className="font-mono text-sm">
                            {form.formNumber || form.id}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{form.title || '-'}</div>
                              <div className="text-sm text-muted-foreground">
                                {form.type}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{form.officer?.name || '-'}</TableCell>
                          <TableCell>{form.submissionDate ? new Date(form.submissionDate).toLocaleDateString() : '-'}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                  <Link href={`/forms/${form.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Lihat Detail
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Proses Formulir
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Unduh PDF</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
