"use client"

import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Dummy data, replace with fetch from backend or context as needed
const formsData = [
  {
    id: "FORM-2025-001",
    title: "Project Budget Approval",
    submitter: "John Doe",
    dateSubmitted: "2025-07-28",
    status: "Pending",
    priority: "High",
    type: "Budget",
    project: "Downtown Mall Phase 2",
    projectOfficer: "John Smith",
    items: [
      { itemName: "Steel I-Beam 20ft", quantity: 10, unit: "piece", specifications: "20ft length, Grade A36 steel", notes: "" },
      { itemName: "Concrete Mix (High Strength)", quantity: 5, unit: "cubic yard", specifications: "4000 PSI, Portland cement", notes: "" },
    ],
    submissionDate: "2025-07-28"
  },
  // ... add more forms as needed
];

export default function FormDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  // Find the form by id
  const form = formsData.find((f) => f.id === id);
  if (!form) return notFound();

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
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
                <BreadcrumbLink href="/forms">Forms</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Form Detail</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Button asChild variant="outline" className="w-fit mb-2">
          <Link href="/forms">← Back to Forms</Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{form.title}</CardTitle>
            <CardDescription>Form ID: {form.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p><b>Project:</b> {form.project}</p>
                <p><b>Type:</b> {form.type}</p>
                <p><b>Project Officer:</b> {form.projectOfficer}</p>
                <p><b>Submitter:</b> {form.submitter}</p>
                <p><b>Status:</b> {form.status}</p>
                <p><b>Priority:</b> {form.priority}</p>
                <p><b>Tanggal Pengajuan:</b> {form.submissionDate}</p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Requested Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Specifications</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {form.items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.specifications}</TableCell>
                      <TableCell>{item.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
