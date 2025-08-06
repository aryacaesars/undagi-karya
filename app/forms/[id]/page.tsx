"use client"

import { notFound, useParams } from "next/navigation";
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
import { useFormDetail } from "@/hooks/use-form-detail";
import type { FormItem } from "@/types/form";
import { Skeleton } from "@/components/ui/skeleton";
import DatabaseFormPDFWrapper from "@/components/database-form-pdf-wrapper";
import { FileDown, Eye } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function FormDetailPage() {
  const params = useParams();
  const { id } = params;
  const { form, isLoading, error } = useFormDetail(id as string);
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  if (isLoading) {
    return (
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Skeleton className="h-8 w-32" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <Separator />
              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                        <TableHead><Skeleton className="h-5 w-16" /></TableHead>
                        <TableHead><Skeleton className="h-5 w-16" /></TableHead>
                        <TableHead><Skeleton className="h-5 w-32" /></TableHead>
                        <TableHead><Skeleton className="h-5 w-32" /></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...Array(3)].map((_, idx) => (
                        <TableRow key={idx}>
                          <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    );
  }

  if (error) return <div>Error: {error}</div>;
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
        <div className="flex items-center justify-between mb-2">
          <Button asChild variant="outline" className="w-fit">
            <Link href="/forms">← Kembali ke Formulir</Link>
          </Button>
          <div className="flex gap-2">
            <Dialog open={showPDFPreview} onOpenChange={setShowPDFPreview}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Preview PDF
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl h-[90vh]">
                <DialogHeader>
                  <DialogTitle>Preview Formulir PDF</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                  <DatabaseFormPDFWrapper 
                    formId={id as string}
                    mode="viewer"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <DatabaseFormPDFWrapper 
              formId={id as string}
              mode="download"
              fileName={`Form-${form.formNumber}.pdf`}
            >
              {({ loading, error }) => (
                <Button 
                  disabled={loading}
                  variant="default"
                  className="flex items-center gap-2"
                >
                  <FileDown className="h-4 w-4" />
                  {loading ? 'Menggenerate PDF...' : 'Download PDF'}
                </Button>
              )}
            </DatabaseFormPDFWrapper>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{form.title || 'Detail Formulir'}</CardTitle>
            <CardDescription>ID Formulir: {form.formNumber}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p><b>Proyek:</b> {form.project.name}</p>
                <p><b>Tipe:</b> {form.type}</p>
                <p><b>Petugas Proyek:</b> {form.officer.name}</p>
                <p><b>Tanggal Pengajuan:</b> {new Date(form.submissionDate).toLocaleDateString()}</p>
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
                  {form.items.map((item: FormItem) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.supplyItem.name}</TableCell>
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
