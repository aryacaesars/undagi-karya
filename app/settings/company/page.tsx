"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Globe, Upload, Save, Bell, Shield, Clock } from "lucide-react"

export default function CompanySettingsPage() {
  const [companyData, setCompanyData] = useState({
    name: "ContractorPro Construction Ltd.",
    email: "info@contractorpro.com",
    phone: "+1 (555) 123-4567",
    website: "www.contractorpro.com",
    address: "123 Construction Ave, New York, NY 10001",
    description:
      "Leading construction company specializing in commercial and residential projects with over 20 years of experience.",
    timezone: "America/New_York",
    currency: "USD",
    language: "en",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    projectUpdates: true,
    clientMessages: true,
    systemAlerts: true,
    weeklyReports: false,
    marketingEmails: false,
  })

  const handleCompanyDataChange = (field: string, value: string) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
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
                <BreadcrumbPage>Company Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Company Settings</h1>
            <p className="text-muted-foreground">Manage your company profile and system preferences</p>
          </div>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>Update your company details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Company Logo" />
                  <AvatarFallback>
                    <Building2 className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">Recommended: 200x200px, PNG or JPG</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={companyData.name}
                    onChange={(e) => handleCompanyDataChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email Address</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={companyData.email}
                    onChange={(e) => handleCompanyDataChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone Number</Label>
                  <Input
                    id="company-phone"
                    value={companyData.phone}
                    onChange={(e) => handleCompanyDataChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Website</Label>
                  <Input
                    id="company-website"
                    value={companyData.website}
                    onChange={(e) => handleCompanyDataChange("website", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-address">Address</Label>
                <Input
                  id="company-address"
                  value={companyData.address}
                  onChange={(e) => handleCompanyDataChange("address", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-description">Company Description</Label>
                <Textarea
                  id="company-description"
                  value={companyData.description}
                  onChange={(e) => handleCompanyDataChange("description", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Regional Settings
              </CardTitle>
              <CardDescription>Configure timezone, currency, and language preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={companyData.timezone}
                    onValueChange={(value) => handleCompanyDataChange("timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={companyData.currency}
                    onValueChange={(value) => handleCompanyDataChange("currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={companyData.language}
                    onValueChange={(value) => handleCompanyDataChange("language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Project Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about project status changes</p>
                  </div>
                  <Switch
                    checked={notifications.projectUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("projectUpdates", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Client Messages</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for new client messages</p>
                  </div>
                  <Switch
                    checked={notifications.clientMessages}
                    onCheckedChange={(checked) => handleNotificationChange("clientMessages", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Important system notifications and alerts</p>
                  </div>
                  <Switch
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("systemAlerts", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive product updates and marketing content</p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage security and access control settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Change Password Policy
                </Button>
                <Button variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Session Timeout Settings
                </Button>
              </div>
              <div className="p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground mb-3">Add an extra layer of security to your account</p>
                <Button size="sm">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
