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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  Download,
  FileText,
  TrendingUp,
  DollarSign,
  Users,
  FolderOpen,
  Calendar,
  BarChart3,
  PieChartIcon,
  Activity,
} from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 1800000, profit: 540000, costs: 1260000 },
  { month: "Feb", revenue: 2100000, profit: 630000, costs: 1470000 },
  { month: "Mar", revenue: 1950000, profit: 585000, costs: 1365000 },
  { month: "Apr", revenue: 2300000, profit: 690000, costs: 1610000 },
  { month: "May", revenue: 2150000, profit: 645000, costs: 1505000 },
  { month: "Jun", revenue: 2400000, profit: 720000, costs: 1680000 },
]

const projectStatusData = [
  { name: "Completed", value: 128, color: "#10b981" },
  { name: "Running", value: 42, color: "#3b82f6" },
  { name: "Planning", value: 15, color: "#8b5cf6" },
  { name: "Paused", value: 8, color: "#f59e0b" },
  { name: "Cancelled", value: 3, color: "#ef4444" },
]

const clientTypeData = [
  { name: "PERUSAHAAN", value: 45, color: "#3b82f6" },
  { name: "CV", value: 32, color: "#8b5cf6" },
  { name: "Individual", value: 23, color: "#10b981" },
]

const vendorPerformanceData = [
  { vendor: "Steel & Materials Co.", orders: 45, onTime: 42, rating: 4.8 },
  { vendor: "BuildPro Supplies", orders: 32, onTime: 30, rating: 4.5 },
  { vendor: "Heavy Equipment", orders: 28, onTime: 25, rating: 4.2 },
  { vendor: "Green Materials", orders: 18, onTime: 17, rating: 4.6 },
  { vendor: "Home Depot Pro", orders: 52, onTime: 48, rating: 4.0 },
]

const monthlyProjectsData = [
  { month: "Jan", started: 8, completed: 12 },
  { month: "Feb", started: 10, completed: 9 },
  { month: "Mar", started: 12, completed: 15 },
  { month: "Apr", started: 15, completed: 11 },
  { month: "May", started: 9, completed: 18 },
  { month: "Jun", started: 11, completed: 14 },
]

export default function ReportsPage() {
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
                <BreadcrumbPage>Reports & Analytics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights and analytics for your construction business</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="6months">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12.7M</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+15.2%</span>
                from last period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30.2%</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+2.1%</span>
                from last period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Project Completion</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.5%</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+3.2%</span>
                from last period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Client Satisfaction</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7/5</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+0.3</span>
                from last period
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Financial Performance</CardTitle>
              <CardDescription>Revenue, profit, and costs over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, ""]} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="costs"
                    stackId="2"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                    name="Costs"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stackId="3"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Profit"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Status Distribution</CardTitle>
              <CardDescription>Current status of all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Project Activity</CardTitle>
              <CardDescription>Projects started vs completed each month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyProjectsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="started" fill="#3b82f6" name="Started" />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Type Distribution</CardTitle>
              <CardDescription>Breakdown of clients by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={clientTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {clientTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Performance Analysis</CardTitle>
            <CardDescription>Performance metrics for top vendors including delivery rates and ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendorPerformanceData.map((vendor, index) => (
                <div key={vendor.vendor} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{vendor.vendor}</p>
                      <p className="text-sm text-muted-foreground">
                        {vendor.orders} orders • {Math.round((vendor.onTime / vendor.orders) * 100)}% on-time delivery
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">Rating</p>
                      <p className="text-lg font-bold">{vendor.rating}/5</p>
                    </div>
                    <Badge
                      className={
                        vendor.rating >= 4.5
                          ? "bg-green-100 text-green-800"
                          : vendor.rating >= 4.0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {vendor.rating >= 4.5 ? "Excellent" : vendor.rating >= 4.0 ? "Good" : "Needs Improvement"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <BarChart3 className="mr-2 h-4 w-4" />
                Financial Report
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <PieChartIcon className="mr-2 h-4 w-4" />
                Project Summary
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="mr-2 h-4 w-4" />
                Client Analysis
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Export Options</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="mr-2 h-4 w-4" />
                PDF Report
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Activity className="mr-2 h-4 w-4" />
                Excel Export
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Report Insights</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Revenue Growth</span>
                <Badge className="bg-green-100 text-green-800">+15.2%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Project Efficiency</span>
                <Badge className="bg-blue-100 text-blue-800">94.5%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Client Retention</span>
                <Badge className="bg-purple-100 text-purple-800">87.3%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
