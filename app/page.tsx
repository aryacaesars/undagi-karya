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
  DollarSign,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
  Building2,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import {
  Bar,
  BarChart,
  Line,
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

const statsData = [
  {
    title: "Total Clients",
    value: "248",
    change: "+12%",
    trend: "up",
    icon: Users,
    description: "Active clients",
  },
  {
    title: "Active Projects",
    value: "42",
    change: "+8%",
    trend: "up",
    icon: FolderOpen,
    description: "Currently running",
  },
  {
    title: "Monthly Revenue",
    value: "$2.4M",
    change: "+15%",
    trend: "up",
    icon: DollarSign,
    description: "This month",
  },
  {
    title: "Supply Requests",
    value: "156",
    change: "-3%",
    trend: "down",
    icon: ClipboardList,
    description: "Pending approval",
  },
]

const revenueData = [
  { month: "Jan", revenue: 1800000, projects: 35 },
  { month: "Feb", revenue: 2100000, projects: 38 },
  { month: "Mar", revenue: 1950000, projects: 42 },
  { month: "Apr", revenue: 2300000, projects: 45 },
  { month: "May", revenue: 2150000, projects: 41 },
  { month: "Jun", revenue: 2400000, projects: 42 },
]

const projectStatusData = [
  { name: "Running", value: 42, color: "#3b82f6" },
  { name: "Completed", value: 128, color: "#10b981" },
  { name: "Paused", value: 8, color: "#f59e0b" },
  { name: "Planning", value: 15, color: "#8b5cf6" },
]

const recentActivities = [
  {
    id: 1,
    type: "client",
    title: "New client registered",
    description: "ABC Construction Ltd joined the platform",
    time: "2 hours ago",
    icon: Users,
  },
  {
    id: 2,
    type: "project",
    title: "Project milestone completed",
    description: "Downtown Mall - Phase 2 foundation completed",
    time: "4 hours ago",
    icon: CheckCircle,
  },
  {
    id: 3,
    type: "supply",
    title: "Supply request approved",
    description: "Steel beams order for Residential Complex",
    time: "6 hours ago",
    icon: ClipboardList,
  },
  {
    id: 4,
    type: "project",
    title: "Project status updated",
    description: "Office Building renovation moved to completion",
    time: "1 day ago",
    icon: FolderOpen,
  },
]

const topClients = [
  { name: "MegaBuild Corp", projects: 12, value: "$850K", type: "PERUSAHAAN" },
  { name: "Urban Developers", projects: 8, value: "$620K", type: "CV" },
  { name: "City Infrastructure", projects: 15, value: "$1.2M", type: "PERUSAHAAN" },
  { name: "Green Construction", projects: 6, value: "$480K", type: "CV" },
]

export default function Dashboard() {
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
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          {statsData.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue and project count</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "revenue" ? `$${(value as number).toLocaleString()}` : value,
                      name === "revenue" ? "Revenue" : "Projects",
                    ]}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue" />
                  <Line yAxisId="right" dataKey="projects" stroke="#10b981" name="Projects" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Project Status Distribution</CardTitle>
              <CardDescription>Current project status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest updates across the system</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <activity.icon className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Top Clients</CardTitle>
                <CardDescription>Highest value clients this month</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/clients">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={client.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                        <Building2 className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{client.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {client.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{client.projects} projects</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{client.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/clients/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Client
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/supply-requests/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Supply Request
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Project Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Downtown Mall</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Residential Complex</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Office Building</span>
                  <span>90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Projects</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  42 Running
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Approvals</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Clock className="h-3 w-3 mr-1" />
                  12 Waiting
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Overdue Tasks</span>
                <Badge variant="destructive" className="bg-red-100 text-red-800">
                  <AlertCircle className="h-3 w-3 mr-1" />3 Overdue
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
