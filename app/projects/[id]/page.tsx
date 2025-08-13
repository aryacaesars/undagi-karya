"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Calendar,
  DollarSign,
  User,
  Edit,
  Plus,
  CheckCircle,
  FileText,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useProjectDetail } from "../../../hooks/use-project-detail"
import { Project, Milestone } from "../../../types/project"
import { formatCurrency, MILESTONE_WEIGHTS } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock data untuk demo (akan diganti dengan data real)
const projectStages = [
  {
    id: 1,
    name: "Pondasi & Persiapan Lokasi",
    progress: 100,
    startDate: "2023-03-15",
    endDate: "2023-05-30",
  },
  {
    id: 2,
    name: "Kerangka Struktural",
    progress: 100,
    startDate: "2023-06-01",
    endDate: "2023-08-15",
  },
  {
    id: 3,
    name: "Konstruksi Interior",
    progress: 60,
    startDate: "2023-08-16",
    endDate: "2023-11-30",
  },
  {
    id: 4,
    name: "Listrik & Plambing",
    progress: 30,
    startDate: "2023-09-01",
    endDate: "2023-12-15",
  },
  {
    id: 5,
    name: "Finishing Akhir",
    progress: 0,
    startDate: "2023-12-01",
    endDate: "2024-01-30",
  },
]

const supplyRequests = [
  {
    id: "SR-001",
    description: "Balok baja dan beton",
    requestDate: "2023-08-15",
    estimatedCost: 45000,
    vendor: "Steel & Materials Co.",
  },
  {
    id: "SR-002",
    description: "Komponen listrik",
    requestDate: "2023-08-20",
    estimatedCost: 25000,
    vendor: "ElectricPro Supplies",
  },
  {
    id: "SR-003",
    description: "Perlengkapan interior",
    requestDate: "2023-08-22",
    estimatedCost: 35000,
    vendor: "Interior Solutions",
  },
]

const projectDocuments = [
  { id: 1, name: "Cetak Biru Proyek.pdf", type: "Cetak Biru", uploadDate: "2023-03-10", size: "2.4 MB" },
  { id: 2, name: "Izin Bangunan.pdf", type: "Izin", uploadDate: "2023-03-12", size: "1.1 MB" },
  { id: 3, name: "Laporan Keselamatan.pdf", type: "Laporan", uploadDate: "2023-08-15", size: "3.2 MB" },
  { id: 4, name: "Foto Progres.zip", type: "Foto", uploadDate: "2023-08-20", size: "15.7 MB" },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")
  const projectId = params.id as string

  // Ambil data project dari API
  const { project, loading, error, refetch } = useProjectDetail(projectId)

  // Status badge function removed

  const getTypeBadge = (type: string) => {
    const colors = {
      renovasi: "bg-blue-100 text-blue-800",
      instalasi: "bg-green-100 text-green-800",
      peralatan: "bg-yellow-100 text-yellow-800",
      perlengkapan: "bg-purple-100 text-purple-800",
    }
    return <Badge className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{type}</Badge>
  }

  const progress = project?.progress ?? 0

  const calculateDaysRemaining = () => {
    if (!project?.endDate) return 0
    const endDate = new Date(project.endDate)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(diffDays, 0)
  }

  if (loading) {
    return (
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                  <BreadcrumbLink href="/projects">Proyek</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Memuat...</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-2 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    )
  }

  if (error) {
    return (
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                  <BreadcrumbLink href="/projects">Proyek</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Error</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <Button variant="outline" size="sm" onClick={refetch}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Coba Lagi
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </SidebarInset>
    )
  }

  if (!project) {
    return (
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                  <BreadcrumbLink href="/projects">Proyek</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Tidak Ditemukan</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Proyek tidak ditemukan atau tidak dapat diakses.
            </AlertDescription>
          </Alert>
        </div>
      </SidebarInset>
    )
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
                <BreadcrumbLink href="/">Dasbor</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/projects">Proyek</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
              <div className="flex items-center gap-2">
                {project.type && getTypeBadge(project.type)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/projects/${project.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Proyek
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progres</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl font-bold">{progress}%</span>
                {project?.status && (
                  <Badge className={
                    project.status === 'FINISH' ? 'bg-green-600' :
                    project.status === 'STALL' ? 'bg-yellow-600' :
                    project.status === 'TERMINATED' ? 'bg-red-600' : 'bg-blue-600'}>
                    {project.status.toLowerCase()}
                  </Badge>
                )}
              </div>
              <Progress value={progress} className="mt-1" />
              <div className="mt-2 text-xs text-muted-foreground flex flex-wrap gap-2 items-center">
                <span>Milestone:</span>
                {project?.milestone && <Badge variant="outline">{project.milestone}</Badge>}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jadwal</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateDaysRemaining()}</div>
              <p className="text-xs text-muted-foreground">hari tersisa</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Petugas</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {project.officer ? project.officer.split(" ")[0] : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">{project.officer || "Belum ditentukan"}</p>
            </CardContent>
          </Card>
        </div>

    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
      <TabsTrigger value="overview">Ringkasan</TabsTrigger>
      <TabsTrigger value="milestones">Milestone</TabsTrigger>
      <TabsTrigger value="forms">Riwayat Laporan Dokumen</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Proyek</CardTitle>
                <CardDescription>Detail dasar tentang proyek</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Klien</p>
                      <p className="text-sm text-muted-foreground">{project.client || "Belum ditentukan"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Petugas Proyek</p>
                      <p className="text-sm text-muted-foreground">{project.officer || "Belum ditentukan"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Jadwal</p>
                      <p className="text-sm text-muted-foreground">
                        {project.startDate ? new Date(project.startDate).toLocaleDateString() : "Belum ditentukan"} -{" "}
                        {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Belum ditentukan"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Lokasi</p>
                      <p className="text-sm text-muted-foreground">{project.location || "Belum ditentukan"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Tipe</p>
                      <p className="text-sm text-muted-foreground">{project.type || "Belum ditentukan"}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Nilai Kontrak</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(project.contractValue)}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Total Dibayarkan</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(project.totalPaid)}</p>
                    {project.contractValue && project.totalPaid && (
                      <p className="text-xs">Sisa: {formatCurrency((parseFloat(project.contractValue) - parseFloat(project.totalPaid)).toString())}</p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <p className="text-sm font-medium">Termin Pembayaran</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{project.paymentTerms || '-'}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-2">Deskripsi</p>
                  <p className="text-sm text-muted-foreground">
                    {project.description || "Tidak ada deskripsi yang tersedia."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kelola Milestone</CardTitle>
                <CardDescription>Update milestone akan otomatis menyesuaikan progress dan menyimpan riwayat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <MilestoneUpdater project={project} onUpdated={refetch} />
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-2">Riwayat Milestone</h4>
                  {project.milestoneHistories && project.milestoneHistories.length > 0 ? (
                    <div className="space-y-2 max-h-72 overflow-auto pr-2">
                      {project.milestoneHistories.map(h => (
                        <div key={h.id} className="flex justify-between text-xs border rounded p-2">
                          <div className="space-y-1">
                            <div>
                              {h.previousMilestone ? (
                                <>{h.previousMilestone} ➜ <span className="font-medium">{h.newMilestone}</span></>
                              ) : (
                                <span className="font-medium">{h.newMilestone}</span>
                              )}
                            </div>
                            {h.note && <div className="text-muted-foreground">{h.note}</div>}
                          </div>
                          <div className="text-right space-y-1">
                            <div className="font-medium">{h.progress}%</div>
                            <div className="text-muted-foreground">{new Date(h.changedAt).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Belum ada riwayat.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Permintaan Dokumen</CardTitle>
                <CardDescription>Lacak progres di berbagai fase proyek</CardDescription>
              </CardHeader>
              <CardContent>
                {project.forms && project.forms.length > 0 ? (
                  <div className="space-y-4">
                    {project.forms.map((form, index) => (
                      <div key={form.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{form.formNumber}</h4>
                        </div>
                        <div className="grid gap-2 md:grid-cols-2 text-sm text-muted-foreground mb-3">
                          <div>
                            <span className="font-medium">Dibuat:</span>{" "}
                            {new Date(form.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Belum ada tahap proyek yang dibuat.</p>
                    <p className="text-sm">Form proyek akan tampil di sini ketika sudah dibuat.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}

// Component for updating milestone
function MilestoneUpdater({ project, onUpdated }: { project: Project, onUpdated: () => void }) {
  const [milestone, setMilestone] = useState<Milestone>(project.milestone)
  const [note, setNote] = useState('')
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const weights = MILESTONE_WEIGHTS

  const handleUpdate = () => {
    setError(null)
    startTransition(async () => {
      try {
        const res = await fetch('/api/projects/milestone', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: project.id, milestone, note: note || undefined })
        })
        const data = await res.json()
        if (!res.ok || !data.success) throw new Error(data.error || 'Gagal update milestone')
        setNote('')
        onUpdated()
      } catch (e:any) {
        setError(e.message)
      }
    })
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-2 md:grid-cols-4 items-end">
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-medium">Milestone</label>
          <Select value={milestone} onValueChange={(v:any)=>setMilestone(v)} disabled={pending}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih milestone" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(weights).map(m => (
                <SelectItem key={m} value={m}>{m} ({weights[m]}%)</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-medium">Catatan (opsional)</label>
          <Textarea rows={2} value={note} onChange={e=>setNote(e.target.value)} disabled={pending} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button size="sm" onClick={handleUpdate} disabled={pending || milestone === project.milestone}>
          {pending ? 'Menyimpan...' : 'Update Milestone'}
        </Button>
        <p className="text-xs text-muted-foreground">Progress akan diset ke bobot milestone secara otomatis.</p>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
