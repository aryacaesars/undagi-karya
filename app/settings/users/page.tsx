"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Search, Plus, MoreHorizontal, Eye, Edit, Shield, Users, UserCheck, Clock } from "lucide-react"
import Link from "next/link"

const usersData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Admin",
    department: "Management",
    status: "Active",
    lastLogin: "2023-08-22T10:30:00Z",
    joinDate: "2022-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["All Access"],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Manager",
    department: "Projects",
    status: "Active",
    lastLogin: "2023-08-22T09:15:00Z",
    joinDate: "2022-06-20",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["Project Management", "Client Management"],
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@company.com",
    role: "Manager",
    department: "Operations",
    status: "Active",
    lastLogin: "2023-08-21T16:45:00Z",
    joinDate: "2021-09-10",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["Project Management", "Supply Management"],
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "User",
    department: "Projects",
    status: "Active",
    lastLogin: "2023-08-22T08:20:00Z",
    joinDate: "2023-02-14",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["Project View", "Client View"],
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom.brown@company.com",
    role: "User",
    department: "Operations",
    status: "Inactive",
    lastLogin: "2023-08-15T14:30:00Z",
    joinDate: "2023-04-01",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["Project View"],
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    role: "Manager",
    department: "Finance",
    status: "Active",
    lastLogin: "2023-08-22T11:00:00Z",
    joinDate: "2022-11-30",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["Financial Reports", "Project Management"],
  },
]

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadge = (role: string) => {
    const colors = {
      Admin: "bg-red-100 text-red-800",
      Manager: "bg-blue-100 text-blue-800",
      User: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{role}</Badge>
  }

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    )
  }

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
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
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>User Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
          </div>
          <Button asChild>
            <Link href="/settings/users/new">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usersData.length}</div>
              <p className="text-xs text-muted-foreground">All users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usersData.filter((u) => u.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administrators</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usersData.filter((u) => u.role === "Admin").length}</div>
              <p className="text-xs text-muted-foreground">Admin users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Logins</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  usersData.filter((u) => new Date().getTime() - new Date(u.lastLogin).getTime() < 24 * 60 * 60 * 1000)
                    .length
                }
              </div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Manage user accounts and their access permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{formatLastLogin(user.lastLogin)}</TableCell>
                      <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.slice(0, 2).map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                          {user.permissions.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.permissions.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/settings/users/${user.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              Manage Permissions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className={user.status === "Active" ? "text-red-600" : "text-green-600"}>
                              {user.status === "Active" ? "Deactivate" : "Activate"} User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
