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
import { useEffect, useState, useMemo } from "react"
import { formatCurrency } from "@/lib/utils"

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
  const [projectsList, setProjectsList] = useState<any[]>([])

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

  // Simpan daftar projects untuk ringkasan keuangan
  setProjectsList(Array.isArray(projects.data) ? projects.data : [])

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

  // Financial summary calculations (memoized)
  const financialSummary = useMemo(() => {
    if (!projectsList || projectsList.length === 0) {
      return { totalContract: 0, totalPaid: 0, remaining: 0, withValues: 0 }
    }
    let totalContract = 0
    let totalPaid = 0
    let withValues = 0
    projectsList.forEach(p => {
      if (p.contractValue) {
        const cv = parseFloat(p.contractValue)
        if (!isNaN(cv)) {
          totalContract += cv
          withValues++
        }
      }
      if (p.totalPaid) {
        const tp = parseFloat(p.totalPaid)
        if (!isNaN(tp)) totalPaid += tp
      }
    })
    const remaining = Math.max(totalContract - totalPaid, 0)
    return { totalContract, totalPaid, remaining, withValues }
  }, [projectsList])

  const topProjects = useMemo(() => {
    // sort by contractValue desc fallback 0
    const list = [...projectsList]
    list.sort((a,b) => (parseFloat(b.contractValue||'0') - parseFloat(a.contractValue||'0')))
    return list
  }, [projectsList])
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
        <div className="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
              <ResponsiveContainer width="100%" height={300} className="md:h-[350px]">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    fontSize={12}
                    className="text-xs"
                  />
                  <YAxis 
                    fontSize={12}
                    className="text-xs"
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      value,
                      name === "forms" ? "Formulir" : "Proyek",
                    ]}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                  <Bar dataKey="forms" fill="#3b82f6" name="Formulir" />
                  <Bar dataKey="projects" fill="#10b981" name="Proyek" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          {/* Financial summary & project list */}
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Ringkasan Keuangan Proyek</CardTitle>
                <CardDescription>Total nilai & pembayaran proyek</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Nilai Kontrak</span>
                  <span className="font-semibold">{loading ? '...' : formatCurrency(financialSummary.totalContract)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Dibayar</span>
                  <span className="font-semibold text-green-600">{loading ? '...' : formatCurrency(financialSummary.totalPaid)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sisa</span>
                  <span className="font-semibold text-orange-600">{loading ? '...' : formatCurrency(financialSummary.remaining)}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t">
                  <span>Proyek dgn nilai</span>
                  <span className="font-medium">{financialSummary.withValues}/{dashboardData.projects}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Daftar Proyek (Keuangan)</CardTitle>
                  <CardDescription>Nilai kontrak, pembayaran & progres</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/projects">Lihat Semua</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-sm text-muted-foreground">Memuat...</p>
                ) : topProjects.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Belum ada proyek.</p>
                ) : (
                  <div className="space-y-4 max-h-[420px] overflow-auto pr-2">
                    {topProjects.map(p => {
                      const contract = parseFloat(p.contractValue || '0')
                      const paid = parseFloat(p.totalPaid || '0')
                      const progress = typeof p.progress === 'number' ? p.progress : 0
                      const remaining = Math.max(contract - paid, 0)
                      return (
                        <button key={p.id} onClick={()=>window.location.href=`/projects/${p.id}`} className="w-full text-left border rounded-md p-3 hover:bg-muted/40 transition group">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="font-medium truncate flex-1 min-w-[150px]">{p.name}</div>
                            <div className="flex items-center gap-2 text-xs">
                              {p.milestone && <span className="px-2 py-0.5 rounded bg-gray-100 uppercase tracking-wide text-[10px]">{p.milestone}</span>}
                              {p.status && <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${p.status==='FINISH'?'bg-green-600 text-white':p.status==='TERMINATED'?'bg-red-600 text-white':p.status==='STALL'?'bg-yellow-600 text-white':'bg-blue-600 text-white'}`}>{p.status}</span>}
                            </div>
                          </div>
                          <div className="mt-2 grid gap-3 md:grid-cols-4 text-xs">
                            <div className="space-y-0.5">
                              <p className="text-muted-foreground">Kontrak</p>
                              <p className="font-medium">{contract ? formatCurrency(contract) : '-'}</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-muted-foreground">Dibayar</p>
                              <p className="font-medium text-green-600">{paid ? formatCurrency(paid) : '-'}</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-muted-foreground">Sisa</p>
                              <p className="font-medium text-orange-600">{remaining ? formatCurrency(remaining) : '-'}</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-muted-foreground flex justify-between"><span>Progress</span><span>{progress}%</span></p>
                              <Progress value={progress} className="h-2" />
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
           <Card className="w-full">
            <CardHeader>
              <CardTitle>Distribusi Tipe Formulir</CardTitle>
              <CardDescription>Jenis formulir permintaan</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300} className="md:h-[350px]">
                <PieChart>
                  <Pie
                    data={formTypesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => (value && value > 0) ? `${name} ${value}` : name}
                    outerRadius={60}
                    className="md:outerRadius-[80]"
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
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle className="text-base sm:text-lg">Ringkasan Sistem</CardTitle>
                <CardDescription className="text-sm">Data yang tersedia di sistem</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
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
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 shrink-0">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">Klien</p>
                      <p className="text-xs text-gray-500 truncate">Total klien terdaftar</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium shrink-0">{loading ? "..." : dashboardData.clients}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 shrink-0">
                      <UserCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">Petugas</p>
                      <p className="text-xs text-gray-500 truncate">Petugas proyek</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium shrink-0">{loading ? "..." : dashboardData.officers}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 shrink-0">
                      <Truck className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">Vendor</p>
                      <p className="text-xs text-gray-500 truncate">Supplier terdaftar</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium shrink-0">{loading ? "..." : dashboardData.vendors}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="truncate">Proyek Baru</span>
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/clients/new">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="truncate">Tambah Klien</span>
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/forms/new">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="truncate">Formulir Permintaan</span>
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/supply-items">
                  <Package className="h-4 w-4 mr-2" />
                  <span className="truncate">Kelola Persediaan</span>
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
                  <span className="truncate mr-2">Setup Klien</span>
                  <span className="shrink-0">{dashboardData.clients > 0 ? "100%" : "0%"}</span>
                </div>
                <Progress value={dashboardData.clients > 0 ? 100 : 0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="truncate mr-2">Setup Proyek</span>
                  <span className="shrink-0">{dashboardData.projects > 0 ? "100%" : "0%"}</span>
                </div>
                <Progress value={dashboardData.projects > 0 ? 100 : 0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="truncate mr-2">Data Persediaan</span>
                  <span className="shrink-0">{dashboardData.supplyItems > 0 ? "100%" : "0%"}</span>
                </div>
                <Progress value={dashboardData.supplyItems > 0 ? 100 : 0} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Status Sistem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm truncate mr-2">Total Formulir</span>
                <Badge variant="default" className="bg-blue-100 text-blue-800 shrink-0">
                  <FileText className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">{dashboardData.forms} Formulir</span>
                  <span className="sm:hidden">{dashboardData.forms}</span>
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm truncate mr-2">Petugas Aktif</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800 shrink-0">
                  <UserCheck className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">{dashboardData.officers} Petugas</span>
                  <span className="sm:hidden">{dashboardData.officers}</span>
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm truncate mr-2">Vendor Terdaftar</span>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 shrink-0">
                  <Truck className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">{dashboardData.vendors} Vendor</span>
                  <span className="sm:hidden">{dashboardData.vendors}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
