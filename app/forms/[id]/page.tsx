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
    title: "Persetujuan Anggaran Proyek",
    dateSubmitted: "2025-07-28",
    type: "Anggaran",
    project: "Mall Downtown Fase 2",
    projectOfficer: "John Smith",
    items: [
      { itemName: "Baja I-Beam 20ft", quantity: 10, unit: "buah", specifications: "Panjang 20ft, Baja Grade A36", notes: "" },
      { itemName: "Campuran Beton (Kuat Tinggi)", quantity: 5, unit: "meter kubik", specifications: "4000 PSI, Semen Portland", notes: "" },
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
                <BreadcrumbLink href="/">Dasbor</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/forms">Formulir</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Detail Formulir</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Button asChild variant="outline" className="w-fit mb-2">
          <Link href="/forms">← Kembali ke Formulir</Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{form.title}</CardTitle>
            <CardDescription>ID Formulir: {form.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p><b>Proyek:</b> {form.project}</p>
                <p><b>Tipe:</b> {form.type}</p>
                <p><b>Petugas Proyek:</b> {form.projectOfficer}</p>
                <p><b>Tanggal Pengajuan:</b> {form.submissionDate}</p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Barang yang Diminta</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Barang</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Satuan</TableHead>
                    <TableHead>Spesifikasi</TableHead>
                    <TableHead>Catatan</TableHead>
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
