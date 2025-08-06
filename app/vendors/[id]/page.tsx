"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Edit,
  Plus,
  Truck,
  Package,
  Loader2,
  ShoppingBag,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useVendorDetail } from "@/hooks/use-vendor-detail"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VendorDetailPage() {
  const params = useParams()
  const vendorId = params.id as string
  const { vendor, loading, error } = useVendorDetail(vendorId)

  if (loading) {
    return (
      <SidebarInset>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Memuat data vendor...</span>
          </div>
        </div>
      </SidebarInset>
    )
  }

  if (error) {
    return (
      <SidebarInset>
        <div className="flex flex-1 items-center justify-center p-4">
          <Alert className="max-w-md">
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        </div>
      </SidebarInset>
    )
  }

  if (!vendor) {
    return (
      <SidebarInset>
        <div className="flex flex-1 items-center justify-center p-4">
          <Alert className="max-w-md">
            <AlertDescription>
              Vendor tidak ditemukan
            </AlertDescription>
          </Alert>
        </div>
      </SidebarInset>
    )
  }


  
  // Rating stars function removed
  
  // Category badge function removed

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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/vendors">Vendor</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{vendor.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{vendor.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/vendors/${vendor.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Vendor
              </Link>
            </Button>
            <Button asChild>
              <Link href="/supply-requests/new">
                <Plus className="mr-2 h-4 w-4" />
                Pesanan Baru
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tanggal Bergabung</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date(vendor.createdAt).toLocaleDateString('id-ID')}
              </div>
              <p className="text-xs text-muted-foreground">Tanggal registrasi</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Syarat Pembayaran</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vendor.paymentTerms || 'Belum diatur'}</div>
              <p className="text-xs text-muted-foreground">Syarat standar</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Informasi Vendor</CardTitle>
              <CardDescription>Informasi detail tentang vendor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Telepon</p>
                      <p className="text-sm text-muted-foreground">{vendor.phone || 'Tidak ada'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Alamat</p>
                      <p className="text-sm text-muted-foreground">{vendor.address || 'Tidak ada'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Kontak Person</p>
                      <p className="text-sm text-muted-foreground">{vendor.contactPerson || 'Tidak ada'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Tanggal Bergabung</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(vendor.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Terakhir Diperbarui</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(vendor.updatedAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />

              <div>
                <p className="text-sm font-medium mb-2">Deskripsi</p>
                <p className="text-sm text-muted-foreground">{vendor.description || 'Tidak ada deskripsi'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
              <CardDescription>Aksi umum untuk vendor ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/supply-requests/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Buat Pesanan Baru
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="mr-2 h-4 w-4" />
                Kirim Pertanyaan
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href={`/vendors/${vendor.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Info Vendor
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Lihat Semua Pesanan
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Pesanan</CardTitle>
            <CardDescription>Pesanan pembelian dari vendor ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Fitur Segera Hadir</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Riwayat pesanan dan integrasi dengan sistem supply request sedang dalam pengembangan.
              </p>
              <Button asChild>
                <Link href="/supply-requests/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Buat Pesanan Baru
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
