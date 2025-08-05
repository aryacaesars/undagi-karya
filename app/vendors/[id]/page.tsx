"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingBag,
  Edit,
  Plus,
  Eye,
  Clock,
  Truck,
  Package,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data - in real app this would come from API
const vendorData = {
  id: 1,
  name: "Steel & Materials Co.",
  phone: "+1 (555) 111-2222",
  address: "123 Industrial Ave, New York, NY",
  totalOrders: 45,
  paymentTerms: "Net 30",
  joinDate: "2022-03-15",
  lastOrder: "2023-08-10",
  contactPerson: "James Wilson",
  description: "Pemasok utama material konstruksi berkualitas tinggi untuk proyek komersial dan perumahan."
}

const orderHistory = [
  {
    id: 1,
    product: "Balok Baja (I-Beam 8\")",
    quantity: 24,
    orderDate: "2023-07-15",
    deliveryDate: "2023-07-25",
    project: "Mall Downtown Fase 2"
  },
  {
    id: 2,
    product: "Campuran Beton (Premium)",
    quantity: 150,
    orderDate: "2023-06-02",
    deliveryDate: "2023-06-10",
    project: "Gedung Kantor Korporat"
  },
  {
    id: 3,
    product: "Besi Beton (#5 panjang 60')",
    quantity: 80,
    orderDate: "2023-08-01",
    deliveryDate: "2023-08-12",
    project: "Ekspansi Gudang"
  },
  {
    id: 4,
    product: "Bekisting Beton",
    quantity: 35,
    orderDate: "2023-05-20",
    deliveryDate: "2023-06-01",
    project: "Struktur Parkir"
  },
]

export default function VendorDetailPage() {
  const params = useParams()
  const vendorId = params.id


  
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
                <BreadcrumbPage>{vendorData.name}</BreadcrumbPage>
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
              <h1 className="text-2xl font-bold tracking-tight">{vendorData.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Vendor
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
              <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vendorData.totalOrders}</div>
              <p className="text-xs text-muted-foreground">Semua pembelian</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Syarat Pembayaran</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vendorData.paymentTerms}</div>
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
                      <p className="text-sm text-muted-foreground">{vendorData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Alamat</p>
                      <p className="text-sm text-muted-foreground">{vendorData.address}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Kontak Person</p>
                      <p className="text-sm text-muted-foreground">{vendorData.contactPerson}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Tanggal Bergabung</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(vendorData.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Pesanan Terakhir</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(vendorData.lastOrder).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />

              <div>
                <p className="text-sm font-medium mb-2">Deskripsi</p>
                <p className="text-sm text-muted-foreground">{vendorData.description}</p>
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
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Edit className="mr-2 h-4 w-4" />
                Edit Info Vendor
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
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>Kuantitas</TableHead>
                    <TableHead>Proyek</TableHead>
                    <TableHead>Tanggal Pesanan</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderHistory.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.product}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.quantity} unit</Badge>
                      </TableCell>
                      <TableCell>{order.project}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(order.orderDate).toLocaleDateString()}</div>
                          {order.deliveryDate && (
                            <div className="text-muted-foreground">
                              Pengiriman: {new Date(order.deliveryDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/supply-requests/${order.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
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
