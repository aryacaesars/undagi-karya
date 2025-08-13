"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProjectDetail } from '../../../../hooks/use-project-detail';
import { useClients } from '../../../../hooks/use-clients';
import { useOfficers } from '../../../../hooks/use-officers';
import { useUpdateProject } from '../../../../hooks/use-update-project';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, CalendarIcon, Loader2, Save, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { toast } from 'sonner';

function cn(...classes: (string | false | undefined | null)[]) {return classes.filter(Boolean).join(' ');} 

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const { project, loading: loadingDetail, error: errorDetail, refetch } = useProjectDetail(id as string);
  const { clients, fetchClients, loading: loadingClients } = useClients();
  const { officers, fetchOfficers, loading: loadingOfficers } = useOfficers();
  const { updateProject, loading: updating, error: updateError } = useUpdateProject();

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    officer: '',
    type: '',
    location: '',
    description: '',
    contractValue: '',
    paymentTerms: '',
    totalPaid: '',
    status: '',
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { fetchClients({ limit: 100 }); fetchOfficers({ limit: 100 }); }, [fetchClients, fetchOfficers]);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        client: project.client || '',
        officer: project.officer || '',
        type: project.type || '',
        location: project.location || '',
        description: project.description || '',
        contractValue: project.contractValue || '',
        paymentTerms: project.paymentTerms || '',
        totalPaid: project.totalPaid || '',
        status: project.status || 'ACTIVE',
      });
      setStartDate(project.startDate ? new Date(project.startDate) : undefined);
      setEndDate(project.endDate ? new Date(project.endDate) : undefined);
    }
  }, [project]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      if (!formData.name.trim()) throw new Error('Nama proyek harus diisi');
      if (startDate && endDate && endDate <= startDate) throw new Error('Tanggal selesai harus setelah tanggal mulai');

      const payload = {
        id: project.id,
        name: formData.name.trim(),
        client: formData.client || null,
        officer: formData.officer || null,
        type: formData.type || null,
        location: formData.location || null,
        description: formData.description || null,
        startDate: startDate || null,
        endDate: endDate || null,
        contractValue: formData.contractValue ? parseFloat(formData.contractValue) : null,
        paymentTerms: formData.paymentTerms || null,
        totalPaid: formData.totalPaid ? parseFloat(formData.totalPaid) : null,
        status: formData.status as any,
      };

      const updated = await updateProject(payload);
      toast.success('Proyek diperbarui', { description: `Perubahan tersimpan untuk ${updated.name}` });
      refetch();
      router.push(`/projects/${project.id}`);
    } catch (err:any) {
      const m = err instanceof Error ? err.message : 'Gagal memperbarui proyek';
      setSubmitError(m);
      toast.error('Gagal memperbarui', { description: m });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block"><BreadcrumbLink href="/">Dasbor</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block"><BreadcrumbLink href="/projects">Proyek</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem><BreadcrumbPage>Edit Proyek</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {submitError && (
          <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{submitError}</AlertDescription></Alert>
        )}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Proyek</h1>
            <p className="text-muted-foreground">Perbarui informasi proyek</p>
          </div>
          <Button variant="outline" asChild disabled={isSubmitting}><Link href={`/projects/${id}`}><ArrowLeft className="mr-2 h-4 w-4" />Kembali</Link></Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Informasi Dasar</CardTitle><CardDescription>Detail utama proyek</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="name">Nama Proyek *</Label><Input id="name" value={formData.name} onChange={e=>handleInputChange('name', e.target.value)} required disabled={isSubmitting || loadingDetail} /></div>
                <div className="space-y-2"><Label htmlFor="client">Klien</Label>
                  <Select value={formData.client} onValueChange={v=>handleInputChange('client', v)} disabled={isSubmitting || loadingClients}>
                    <SelectTrigger><SelectValue placeholder={loadingClients ? 'Memuat...' : 'Pilih klien'} /></SelectTrigger>
                    <SelectContent>{clients.map(c=> <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="officer">Petugas</Label>
                  <Select value={formData.officer} onValueChange={v=>handleInputChange('officer', v)} disabled={isSubmitting || loadingOfficers}>
                    <SelectTrigger><SelectValue placeholder={loadingOfficers ? 'Memuat...' : 'Pilih petugas'} /></SelectTrigger>
                    <SelectContent>{officers.map(o=> <SelectItem key={o.id} value={o.name}>{o.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label htmlFor="type">Tipe</Label>
                  <Select value={formData.type} onValueChange={v=>handleInputChange('type', v)} disabled={isSubmitting}>
                    <SelectTrigger><SelectValue placeholder="Pilih tipe" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="renovasi">Renovasi</SelectItem>
                      <SelectItem value="instalasi">Instalasi</SelectItem>
                      <SelectItem value="peralatan">Peralatan</SelectItem>
                      <SelectItem value="perlengkapan">Perlengkapan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label htmlFor="location">Lokasi</Label><Input id="location" value={formData.location} onChange={e=>handleInputChange('location', e.target.value)} disabled={isSubmitting} /></div>
              <div className="space-y-2"><Label htmlFor="description">Deskripsi</Label><Textarea id="description" value={formData.description} onChange={e=>handleInputChange('description', e.target.value)} rows={4} disabled={isSubmitting} /></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Jadwal</CardTitle><CardDescription>Tanggal proyek</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label>Tanggal Mulai</Label><Popover>
                  <PopoverTrigger asChild><Button variant="outline" className={cn('w-full justify-start text-left font-normal', !startDate && 'text-muted-foreground')} disabled={isSubmitting}><CalendarIcon className="mr-2 h-4 w-4" />{startDate ? format(startDate, 'PPP') : 'Pilih tanggal'}</Button></PopoverTrigger>
                  <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={startDate} onSelect={d=>setStartDate(d)} initialFocus /></PopoverContent>
                </Popover></div>
                <div className="space-y-2"><Label>Tanggal Selesai</Label><Popover>
                  <PopoverTrigger asChild><Button variant="outline" className={cn('w-full justify-start text-left font-normal', !endDate && 'text-muted-foreground')} disabled={isSubmitting}><CalendarIcon className="mr-2 h-4 w-4" />{endDate ? format(endDate, 'PPP') : 'Pilih tanggal'}</Button></PopoverTrigger>
                  <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={endDate} onSelect={d=>setEndDate(d)} initialFocus /></PopoverContent>
                </Popover></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Finansial & Status</CardTitle><CardDescription>Informasi nilai kontrak dan status proyek</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2"><Label>Nilai Kontrak</Label><Input type="number" value={formData.contractValue} onChange={e=>handleInputChange('contractValue', e.target.value)} disabled={isSubmitting} /></div>
                <div className="space-y-2"><Label>Total Dibayarkan</Label><Input type="number" value={formData.totalPaid} onChange={e=>handleInputChange('totalPaid', e.target.value)} disabled={isSubmitting} /></div>
                <div className="space-y-2"><Label>Status</Label>
                  <Select value={formData.status} onValueChange={v=>handleInputChange('status', v)} disabled={isSubmitting}>
                    <SelectTrigger><SelectValue placeholder="Pilih status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="STALL">Stall</SelectItem>
                      <SelectItem value="TERMINATED">Terminated</SelectItem>
                      <SelectItem value="FINISH">Finish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Termin Pembayaran</Label><Textarea rows={3} value={formData.paymentTerms} onChange={e=>handleInputChange('paymentTerms', e.target.value)} disabled={isSubmitting} /></div>
              <p className="text-xs text-muted-foreground">Status otomatis akan menjadi FINISH jika progress (milestone SELESAI) mencapai 100%.</p>
            </CardContent>
          </Card>
          <div className="flex items-center gap-4">
            <Button type="submit" className="flex-1 max-w-xs" disabled={isSubmitting || updating}>
              {(isSubmitting || updating) ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : <><Save className="mr-2 h-4 w-4" />Simpan Perubahan</>}
            </Button>
            <Button type="button" variant="outline" asChild disabled={isSubmitting}><Link href={`/projects/${id}`}>Batal</Link></Button>
          </div>
        </form>
      </div>
    </SidebarInset>
  );
}
