"use client"
import {
  Building2,
  Users,
  FolderOpen,
  UserCheck,
  Truck,
  ClipboardList,
  Settings,
  BarChart3,
  Shield,
  Home,
  ChevronDown,
  Boxes,
  BoxIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { isThisWeek } from "date-fns"

const menuItems = [
  {
    title: "Dasbor",
    url: "/",
    icon: Home,
  },
  {
    title: "Manajemen Klien",
    icon: Users,
    items: [
      { title: "Semua Klien", url: "/clients" },
      { title: "Tambah Klien", url: "/clients/new" },
    ],
  },
  {
    title: "Manajemen Proyek",
    icon: FolderOpen,
    items: [
      { title: "Semua Proyek", url: "/projects" },
      { title: "Tambah Proyek", url: "/projects/new" },
      { title: "Timeline Proyek", url: "/projects/timeline" },
    ],
  },
  {
    title: "Manajemen Petugas",
    items: [
      { title: "Semua Petugas", url: "/officers" },
      { title: "Tambah Petugas", url: "/officers/new" },
    ],
    icon: UserCheck,
  },
  {
    title: "Manajemen Vendor",
    items: [
      { title: "Semua Vendor", url: "/vendors" },
      { title: "Tambah Vendor", url: "/vendors/new" },
    ],
    icon: Truck,
  },
  {
    title: "Manajemen Persediaan",
    icon: BoxIcon,
    items: [
      { title: "Item Persediaan", url: "/supply-items" },
      { title: "Import Persediaan", url: "/supply-items/import" },
    ],
  },
  {
    title: "Formulir & Dokumen",
    icon: ClipboardList,
    items: [
      { title: "Semua Formulir", url: "/forms" },
      { title: "Buat Formulir", url: "/forms/new" },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white p-1">
                  <img src="/icon.png" alt="icon" className="w-full h-full object-contain" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Undagi Karya</span>
                  <span className="truncate text-xs text-muted-foreground">Manajemen Konstruksi</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible
                      asChild
                      defaultOpen={item.items.some((subItem) => pathname.startsWith(subItem.url))}
                      className="group/collapsible"
                    >
                      <div>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                      <Link href={item.url!}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="rounded-lg">RH</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Rizal Habib</span>
                    <span className="truncate text-xs text-muted-foreground">Manajer Proyek</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
