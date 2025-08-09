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
import {
  Users,
  FolderOpen,
  FileText,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
  Building2,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  UserCheck,
  Truck,
} from "lucide-react"
import Link from "next/link"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useEffect, useState } from "react"

const statsData = [
  {
    title: "Total Klien",
    value: "0",
    change: "+0%",
    trend: "up",
    icon: Users,
    description: "Klien terdaftar",
  },
  {
    title: "Proyek Aktif",
    value: "0",
    change: "+0%",
    trend: "up",
    icon: FolderOpen,
    description: "Sedang berjalan",
  },
  {
    title: "Total Formulir",
    value: "0",
    change: "+0%",
    trend: "up",
    icon: FileText,
    description: "Formulir permintaan",
  },
  {
    title: "Item Persediaan",
    value: "0",
    change: "+0%",
    trend: "up",
    icon: Package,
    description: "Item terdaftar",
  },
]

const revenueData = [
  { month: "Jan", forms: 0, projects: 0 },
  { month: "Feb", forms: 0, projects: 0 },
  { month: "Mar", forms: 0, projects: 0 },
  { month: "Apr", forms: 0, projects: 0 },
  { month: "May", forms: 0, projects: 0 },
  { month: "Jun", forms: 0, projects: 0 },
  { month: "Jul", forms: 0, projects: 0 },
  { month: "Aug", forms: 0, projects: 0 },
  { month: "Sep", forms: 0, projects: 0 },
  { month: "Oct", forms: 0, projects: 0 },
  { month: "Nov", forms: 0, projects: 0 },
  { month: "Dec", forms: 0, projects: 0 },
]

const initialProjectStatusData = [
  { name: "Perencanaan", value: 0, color: "#8b5cf6" },
  { name: "Berjalan", value: 0, color: "#3b82f6" },
  { name: "Selesai", value: 0, color: "#10b981" },
  { name: "Ditunda", value: 0, color: "#f59e0b" },
]

const formTypeData = [
  { name: "Permintaan Material", value: 0, color: "#3b82f6" },
  { name: "Permintaan Alat", value: 0, color: "#10b981" },
  { name: "Permintaan SDM", value: 0, color: "#f59e0b" },
  { name: "Lainnya", value: 0, color: "#8b5cf6" },
]

// Helper functions to process data
const processMonthlyData = (forms: any[], projects: any[]) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  
  const monthlyStats = months.map(month => ({ month, forms: 0, projects: 0 }))
  
  // Process forms data
  forms.forEach(form => {
    if (form.createdAt) {
      const date = new Date(form.createdAt)
      const monthIndex = date.getMonth()
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyStats[monthIndex].forms++
      }
    }
  })
  
  // Process projects data
  projects.forEach(project => {
    if (project.createdAt) {
      const date = new Date(project.createdAt)
      const monthIndex = date.getMonth()
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyStats[monthIndex].projects++
      }
    }
  })
  
  return monthlyStats
}

const processFormTypeData = (forms: any[]) => {
  const formTypes = {
    "Permintaan Material": 0,
    "Permintaan Alat": 0,
    "Permintaan SDM": 0,
    "Lainnya": 0,
  }
  
  forms.forEach(form => {
    if (form.type) {
      const type = form.type.toLowerCase()
      if (type.includes('material') || type.includes('bahan')) {
        formTypes["Permintaan Material"]++
      } else if (type.includes('alat') || type.includes('equipment')) {
        formTypes["Permintaan Alat"]++
      } else if (type.includes('sdm') || type.includes('manpower') || type.includes('tenaga')) {
        formTypes["Permintaan SDM"]++
      } else {
        formTypes["Lainnya"]++
      }
    } else {
      formTypes["Lainnya"]++
    }
  })
  
  return [
    { name: "Permintaan Material", value: formTypes["Permintaan Material"], color: "#3b82f6" },
    { name: "Permintaan Alat", value: formTypes["Permintaan Alat"], color: "#10b981" },
    { name: "Permintaan SDM", value: formTypes["Permintaan SDM"], color: "#f59e0b" },
    { name: "Lainnya", value: formTypes["Lainnya"], color: "#8b5cf6" },
  ]
}

const processProjectStatusData = (projects: any[]) => {
  const statusCounts = {
    "Perencanaan": 0,
    "Berjalan": 0,
    "Selesai": 0,
    "Ditunda": 0,
  }
  
  projects.forEach(project => {
    if (project.status) {
      const status = project.status.toLowerCase()
      if (status.includes('planning') || status.includes('perencanaan')) {
        statusCounts["Perencanaan"]++
      } else if (status.includes('progress') || status.includes('berjalan') || status.includes('ongoing')) {
        statusCounts["Berjalan"]++
      } else if (status.includes('completed') || status.includes('selesai') || status.includes('done')) {
        statusCounts["Selesai"]++
      } else if (status.includes('paused') || status.includes('ditunda') || status.includes('hold')) {
        statusCounts["Ditunda"]++
      } else {
        statusCounts["Perencanaan"]++
      }
    } else {
      statusCounts["Perencanaan"]++
    }
  })
  
  return [
    { name: "Perencanaan", value: statusCounts["Perencanaan"], color: "#8b5cf6" },
    { name: "Berjalan", value: statusCounts["Berjalan"], color: "#3b82f6" },
    { name: "Selesai", value: statusCounts["Selesai"], color: "#10b981" },
    { name: "Ditunda", value: statusCounts["Ditunda"], color: "#f59e0b" },
  ]
}


export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    clients: 0,
    projects: 0,
    forms: 0,
    supplyItems: 0,
    officers: 0,
    vendors: 0,
  })
  const [monthlyData, setMonthlyData] = useState(revenueData)
  const [formTypesData, setFormTypesData] = useState(formTypeData)
  const [projectStatusData, setProjectStatusData] = useState(initialProjectStatusData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Fetch all data in parallel
        const [clientsRes, projectsRes, formsRes, supplyItemsRes, officersRes, vendorsRes] = await Promise.all([
          fetch('/api/clients'),
          fetch('/api/projects'),
          fetch('/api/forms'),
          fetch('/api/supply-items'),
          fetch('/api/officers'),
          fetch('/api/vendors'),
        ])

        const [clients, projects, forms, supplyItems, officers, vendors] = await Promise.all([
          clientsRes.json(),
          projectsRes.json(),
          formsRes.json(),
          supplyItemsRes.json(),
          officersRes.json(),
          vendorsRes.json(),
        ])

        setDashboardData({
          clients: clients.pagination?.totalItems || clients.data?.length || 0,
          projects: projects.pagination?.totalItems || projects.data?.length || 0,
          forms: forms.pagination?.totalItems || forms.data?.length || 0,
          supplyItems: supplyItems.pagination?.totalItems || supplyItems.data?.length || 0,
          officers: officers.pagination?.totalItems || officers.data?.length || 0,
          vendors: vendors.pagination?.totalItems || vendors.data?.length || 0,
        })

        // Process monthly data for charts
        if (forms.data && Array.isArray(forms.data)) {
          const monthlyStats = processMonthlyData(forms.data, projects.data || [])
          setMonthlyData(monthlyStats)
        }

        // Process form types data
        if (forms.data && Array.isArray(forms.data)) {
          const formTypes = processFormTypeData(forms.data)
          setFormTypesData(formTypes)
        }

        // Process project status data
        if (projects.data && Array.isArray(projects.data)) {
          const projectStatuses = processProjectStatusData(projects.data)
          setProjectStatusData(projectStatuses)
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Update stats data with real values
  const currentStatsData = [
    {
      title: "Total Klien",
      value: dashboardData.clients.toString(),
      change: "+0%",
      trend: "up" as const,
      icon: Users,
      description: "Klien terdaftar",
    },
    {
      title: "Proyek Aktif",
      value: dashboardData.projects.toString(),
      change: "+0%",
      trend: "up" as const,
      icon: FolderOpen,
      description: "Proyek terdaftar",
    },
    {
      title: "Total Formulir",
      value: dashboardData.forms.toString(),
      change: "+0%",
      trend: "up" as const,
      icon: FileText,
      description: "Formulir permintaan",
    },
    {
      title: "Item Persediaan",
      value: dashboardData.supplyItems.toString(),
      change: "+0%",
      trend: "up" as const,
      icon: Package,
      description: "Item terdaftar",
    },
  ]
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
                <BreadcrumbPage>Ringkasan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          {currentStatsData.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Statistik Bulanan</CardTitle>
              <CardDescription>Jumlah formulir dan proyek per bulan</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      value,
                      name === "forms" ? "Formulir" : "Proyek",
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="forms" fill="#3b82f6" name="Formulir" />
                  <Bar dataKey="projects" fill="#10b981" name="Proyek" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
           <Card className="w-full">
            <CardHeader>
              <CardTitle>Distribusi Tipe Formulir</CardTitle>
              <CardDescription>Jenis formulir permintaan</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={formTypesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => (value && value > 0) ? `${name} ${value}` : name}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {formTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Ringkasan Sistem</CardTitle>
                <CardDescription>Data yang tersedia di sistem</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/clients">
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Semua
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Klien</p>
                      <p className="text-xs text-gray-500">Total klien terdaftar</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{loading ? "..." : dashboardData.clients}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <UserCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Petugas</p>
                      <p className="text-xs text-gray-500">Petugas proyek</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{loading ? "..." : dashboardData.officers}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                      <Truck className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Vendor</p>
                      <p className="text-xs text-gray-500">Supplier terdaftar</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{loading ? "..." : dashboardData.vendors}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Proyek Baru
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/clients/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Klien
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/forms/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Formulir Permintaan
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/supply-items">
                  <Package className="h-4 w-4 mr-2" />
                  Kelola Persediaan
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Progres Sistem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Setup Klien</span>
                  <span>{dashboardData.clients > 0 ? "100%" : "0%"}</span>
                </div>
                <Progress value={dashboardData.clients > 0 ? 100 : 0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Setup Proyek</span>
                  <span>{dashboardData.projects > 0 ? "100%" : "0%"}</span>
                </div>
                <Progress value={dashboardData.projects > 0 ? 100 : 0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Data Persediaan</span>
                  <span>{dashboardData.supplyItems > 0 ? "100%" : "0%"}</span>
                </div>
                <Progress value={dashboardData.supplyItems > 0 ? 100 : 0} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Status Sistem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Formulir</span>
                <Badge variant="default" className="bg-blue-100 text-blue-800">
                  <FileText className="h-3 w-3 mr-1" />
                  {dashboardData.forms} Formulir
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Petugas Aktif</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <UserCheck className="h-3 w-3 mr-1" />
                  {dashboardData.officers} Petugas
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Vendor Terdaftar</span>
                <Badge variant="outline" className="bg-purple-100 text-purple-800">
                  <Truck className="h-3 w-3 mr-1" />
                  {dashboardData.vendors} Vendor
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
