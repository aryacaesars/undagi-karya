"use client"

import type React from "react"

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ClipboardList, Save, ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const supplyItemsData = [
  {
    id: 1,
    name: "Steel I-Beam 20ft",
    category: "Structural Steel",
    unit: "piece",
    specifications: "20ft length, Grade A36 steel",
  },
  {
    id: 2,
    name: "Concrete Mix (High Strength)",
    category: "Concrete",
    unit: "cubic yard",
    specifications: "4000 PSI, Portland cement",
  },
  {
    id: 3,
    name: "Electrical Wire 12 AWG",
    category: "Electrical",
    unit: "foot",
    specifications: "THHN/THWN-2, 600V rated",
  },
  {
    id: 4,
    name: "Plywood Sheet 4x8",
    category: "Lumber",
    unit: "sheet",
    specifications: "4x8 feet, Grade A/B, exterior grade",
  },
  {
    id: 5,
    name: "PVC Pipe 4 inch",
    category: "Plumbing",
    unit: "foot",
    specifications: "Schedule 40, white PVC",
  },
]

interface RequestItem {
  id: string
  itemName: string
  quantity: number
  unit: string
  specifications: string
  notes: string
}

export default function NewSupplyRequestPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    project: "",
    priority: "",
    vendor: "",
    description: "",
    notes: "",
  })

  const [items, setItems] = useState<RequestItem[]>([
    {
      id: "1",
      itemName: "",
      quantity: 0,
      unit: "",
      specifications: "",
      notes: "",
    },
  ])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleItemChange = (id: string, field: keyof RequestItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (field === "itemName") {
            // Find the selected supply item
            const selectedItem = supplyItemsData.find((si) => si.name === value)
            if (selectedItem) {
              return {
                ...item,
                itemName: selectedItem.name,
                unit: selectedItem.unit,
                specifications: selectedItem.specifications,
              }
            }
          }
          return {
            ...item,
            [field]: field === "quantity" ? Number(value) : value,
          }
        }
        return item
      }),
    )
  }

  const addItem = () => {
    const newItem: RequestItem = {
      id: Date.now().toString(),
      itemName: "",
      quantity: 0,
      unit: "",
      specifications: "",
      notes: "",
    }
    setItems((prev) => [...prev, newItem])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating supply request:", { ...formData, items })
    setTimeout(() => {
      router.push("/supply-requests")
    }, 1000)
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
                <BreadcrumbLink href="/supply-requests">Supply Requests</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>New Request</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Create Supply Request</h1>
              <p className="text-muted-foreground">Request materials and equipment for your construction projects</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/supply-requests">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Requests
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
              <CardDescription>Enter the basic details for the supply request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project">Project *</Label>
                  <Select
                    value={formData.project}
                    onValueChange={(value) => handleInputChange("project", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="downtown-mall">Downtown Mall Phase 2</SelectItem>
                      <SelectItem value="residential-complex">Residential Complex A</SelectItem>
                      <SelectItem value="highway-bridge">Highway Bridge Renovation</SelectItem>
                      <SelectItem value="office-building">Eco-Friendly Office Building</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => handleInputChange("priority", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendor">Preferred Vendor</Label>
                <Select value={formData.vendor} onValueChange={(value) => handleInputChange("vendor", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="steel-materials">Steel & Materials Co.</SelectItem>
                    <SelectItem value="buildpro">BuildPro Supplies</SelectItem>
                    <SelectItem value="heavy-equipment">Heavy Equipment Rentals</SelectItem>
                    <SelectItem value="green-materials">Green Materials Inc.</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description of the request"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any additional notes or special requirements"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Request Items</CardTitle>
                <CardDescription>Add materials and equipment to your request</CardDescription>
              </div>
              <Button type="button" onClick={addItem} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Specifications</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Select
                            value={item.itemName}
                            onValueChange={(value) => handleItemChange(item.id, "itemName", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select item" />
                            </SelectTrigger>
                            <SelectContent>
                              {supplyItemsData.map((supplyItem) => (
                                <SelectItem key={supplyItem.id} value={supplyItem.name}>
                                  <div className="flex flex-col">
                                    <span>{supplyItem.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {supplyItem.category} - {supplyItem.unit}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantity || ""}
                            onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                            placeholder="0"
                            min="0"
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.unit}
                            onChange={(e) => handleItemChange(item.id, "unit", e.target.value)}
                            placeholder="Unit"
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.specifications}
                            onChange={(e) => handleItemChange(item.id, "specifications", e.target.value)}
                            placeholder="Specifications"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.notes}
                            onChange={(e) => handleItemChange(item.id, "notes", e.target.value)}
                            placeholder="Additional notes"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          {items.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{items.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <Button type="submit" className="flex-1 max-w-xs">
              <Save className="mr-2 h-4 w-4" />
              Create Request
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/supply-requests">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </SidebarInset>
  )
}
