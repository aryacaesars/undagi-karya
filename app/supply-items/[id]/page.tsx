"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge-custom"
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
  Package,
  Boxes,
  BarChart,
  ClipboardCheck,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data - in real app this would come from API
const itemData: ItemData = {
  id: 1,
  name: "Steel Beams (I-Beam 8\")",
  sku: "STL-IB8-001",
  description: "Standard 8-inch I-Beam steel construction material for load-bearing applications. Meets ASTM A36 standards."
}

interface ItemData {
  id: number;
  name: string;
  sku: string;
  description: string;
}

export default function SupplyItemDetailPage() {
  const params = useParams()
  const itemId = params.id


  // No custom badge style variables needed now, using variant prop instead

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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/supply-items">Supply Items</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{itemData.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{itemData.name}</h1>
              <div className="text-sm text-muted-foreground">SKU: {itemData.sku}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Item
            </Button>
            <Button asChild>
              <Link href="/supply-requests/new">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Request Item
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Item Details</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{itemData.name}</div>
              <p className="text-xs text-muted-foreground">SKU: {itemData.sku}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Item Information</CardTitle>
              <CardDescription>Detailed information about the item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Description</p>
                <p className="text-sm text-muted-foreground">{itemData.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common actions for this item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/supply-requests/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Request
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Edit className="mr-2 h-4 w-4" />
                Update Stock
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <BarChart className="mr-2 h-4 w-4" />
                View Usage Reports
              </Button>
            </CardContent>
          </Card>
        </div>


      </div>
    </SidebarInset>
  )
}
