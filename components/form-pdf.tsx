import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import type { RequestItem } from '@/app/forms/new/page';
import type { Form, FormItem } from '@/types/form';

// Placeholder logo (PNG, must match actual file name in public/)
const PLACEHOLDER_LOGO = '/logo.png';

// Base64 placeholder signature image (will be replaced with the actual image from public folder)
const SIGNATURE_IMAGE = '/ttd.png';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 35,
  },
  companyDetails: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottom: '1px solid #eee',
    paddingBottom: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  field: {
    width: '50%',
    marginBottom: 10,
  },
  fullWidthField: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  value: {
    marginBottom: 5,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderBottomStyle: 'solid',
    alignItems: 'center',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderBottomStyle: 'solid',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  tableCol: {
    width: '20%',
    padding: 5,
  },
  tableColWide: {
    width: '30%',
    padding: 5,
  },
  tableColNarrow: {
    width: '10%',
    padding: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: 'center',
    color: 'grey',
  },
  signature: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end', // align to right
  },
  signatureBox: {
    width: '40%',
    alignItems: 'center', // center content in box
  },
  signatureLine: {
    marginTop: 70,
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
  },
  signatureText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 10,
  },
  summaryBox: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  summaryText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

interface FormPDFProps {
  formData: {
    project: string;
    type: string;
    projectOfficer: string;
  };
  items: RequestItem[];
  createdDate?: Date;
  logoUrl?: string;
  signatureUrl?: string;
}

// New interface for database-driven PDF
interface DatabaseFormPDFProps {
  form: Form;
  logoUrl?: string;
  signatureUrl?: string;
}

// Helper function to convert FormItem to RequestItem format
const convertFormItemToRequestItem = (formItem: FormItem): RequestItem => ({
  id: formItem.id,
  itemName: formItem.supplyItem?.name || 'Item tidak ditemukan',
  quantity: formItem.quantity || 0,
  unit: formItem.unit || 'unit',
  specifications: formItem.specifications || formItem.supplyItem?.specifications || '-',
  notes: formItem.notes || '-'
});

// Helper function to format currency (if needed later)
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Create Document Component
export const FormPDF = ({ formData, items, createdDate = new Date(), logoUrl, signatureUrl }: FormPDFProps) => (
  <Document title="Formulir Permintaan Persediaan">
    {/* First page: up to 6 items */}
    <Page size="A4" style={styles.page}>
      {/* Header with logo and company info */}
      <View style={styles.header}>
        <Image 
          src={logoUrl || PLACEHOLDER_LOGO}
          style={styles.logo} 
        />
        <View style={styles.companyDetails}>
          <Text>PT GURITA BISNIS UNDAGI</Text>
          <Text>Email: undagioffice@gmail.com</Text>
          <Text>Phone: +62 888-0188-7428</Text>
        </View>
      </View>

      {/* Document title */}
      <View style={styles.title}>
        <Text>FORMULIR PERMINTAAN PERSEDIAAN</Text>
      </View>

      {/* Basic form information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informasi Formulir</Text>
        <View style={styles.grid}>
          <View style={styles.field}>
            <Text style={styles.label}>Proyek:</Text>
            <Text style={styles.value}>
              {formData.project === 'downtown-mall' ? 'Mall Downtown Fase 2' :
               formData.project === 'residential-complex' ? 'Kompleks Perumahan A' :
               formData.project === 'highway-bridge' ? 'Renovasi Jembatan Jalan Raya' :
               formData.project === 'office-building' ? 'Gedung Kantor Ramah Lingkungan' : 
               formData.project}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Tipe:</Text>
            <Text style={styles.value}>
              {formData.type === 'renovasi' ? 'Renovasi' :
               formData.type === 'instalasi' ? 'Instalasi' :
               formData.type === 'perlengkapan' ? 'Perlengkapan' :
               formData.type === 'peralatan' ? 'Peralatan' : 
               formData.type}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Petugas Proyek:</Text>
            <Text style={styles.value}>{formData.projectOfficer}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Tanggal:</Text>
            <Text style={styles.value}>{createdDate.toLocaleDateString('id-ID')}</Text>
          </View>
        </View>
      </View>

      {/* Items table (first 6 items) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Item yang Diminta</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableColWide}><Text>Nama Item</Text></View>
            <View style={styles.tableColNarrow}><Text>Qty</Text></View>
            <View style={styles.tableColNarrow}><Text>Satuan</Text></View>
            <View style={styles.tableCol}><Text>Spesifikasi</Text></View>
            <View style={styles.tableCol}><Text>Catatan</Text></View>
          </View>
          {(items.slice(0, 6)).map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableColWide}><Text>{item.itemName || '-'}</Text></View>
              <View style={styles.tableColNarrow}><Text>{item.quantity || 0}</Text></View>
              <View style={styles.tableColNarrow}><Text>{item.unit || '-'}</Text></View>
              <View style={styles.tableCol}><Text>{item.specifications || '-'}</Text></View>
              <View style={styles.tableCol}><Text>{item.notes || '-'}</Text></View>
            </View>
          ))}
        </View>
        <Text>Total Item: {items.length}</Text>
      </View>

      {/* Only show signature and footer on last page */}
      {items.length <= 6 && (
        <>
          <View style={styles.signature}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureText}>Manajer Proyek</Text>
              <Image 
                src={signatureUrl || SIGNATURE_IMAGE}
                style={{ width: '100%', height: 70, marginBottom: 10, objectFit: 'contain' }}
              />
              <Text style={styles.signatureText}>Rizal Habib</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Text>ID Formulir: {Math.random().toString(36).substring(2, 10).toUpperCase()} | Dibuat pada: {createdDate.toLocaleString()}</Text>
          </View>
        </>
      )}
    </Page>

    {/* Second page if more than 6 items */}
    {items.length > 6 && (
      <Page size="A4" style={styles.page}>
        {/* Header with logo and company info (optional, can be repeated or omitted) */}
        <View style={styles.header}>
          <Image 
            src={logoUrl || PLACEHOLDER_LOGO}
            style={styles.logo} 
          />
          <View style={styles.companyDetails}>
            <Text>PT GURITA BISNIS UNDAGI</Text>
            <Text>Konstruksi & Pengembangan</Text>
            <Text>Email: undagioffice@gmail.com</Text>
            <Text>Phone: +62 888-0188-7428</Text>
          </View>
        </View>

        {/* Document title (optional, can be repeated or omitted) */}
        <View style={styles.title}>
          <Text>FORMULIR PERMINTAAN PERSEDIAAN (lanjutan)</Text>
        </View>

        {/* Items table (remaining items) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Item yang Diminta (lanjutan)</Text>
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <View style={styles.tableColWide}><Text>Nama Item</Text></View>
              <View style={styles.tableColNarrow}><Text>Qty</Text></View>
              <View style={styles.tableColNarrow}><Text>Satuan</Text></View>
              <View style={styles.tableCol}><Text>Spesifikasi</Text></View>
              <View style={styles.tableCol}><Text>Catatan</Text></View>
            </View>
            {(items.slice(6)).map((item, index) => (
              <View key={index + 6} style={styles.tableRow}>
                <View style={styles.tableColWide}><Text>{item.itemName || '-'}</Text></View>
                <View style={styles.tableColNarrow}><Text>{item.quantity || 0}</Text></View>
                <View style={styles.tableColNarrow}><Text>{item.unit || '-'}</Text></View>
                <View style={styles.tableCol}><Text>{item.specifications || '-'}</Text></View>
                <View style={styles.tableCol}><Text>{item.notes || '-'}</Text></View>
              </View>
            ))}
          </View>
        </View>

        {/* Signatures section and footer only on last page */}
        <View style={styles.signature}>
          <View style={styles.signatureBox}>
            <Image 
              src={signatureUrl || SIGNATURE_IMAGE}
              style={{ width: '100%', height: 70, marginBottom: 10, objectFit: 'contain' }}
            />
            <Text style={styles.signatureText}>Disetujui oleh: Rizal Habib</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>ID Formulir: {Math.random().toString(36).substring(2, 10).toUpperCase()} | Dibuat pada: {createdDate.toLocaleString()}</Text>
        </View>
      </Page>
    )}
  </Document>
);

// New component that uses database data
export const DatabaseFormPDF = ({ form, logoUrl, signatureUrl }: DatabaseFormPDFProps) => {
  const items = form.items.map(convertFormItemToRequestItem);
  const formData = {
    project: form.project.name,
    type: form.type,
    projectOfficer: form.officer.name
  };
  const createdDate = new Date(form.submissionDate);

  return (
    <Document title={`Formulir Permintaan Persediaan - ${form.formNumber}`}>
      {/* First page: up to 6 items */}
      <Page size="A4" style={styles.page}>
        {/* Header with logo and company info */}
        <View style={styles.header}>
          <Image 
            src={logoUrl || PLACEHOLDER_LOGO}
            style={styles.logo} 
          />
          <View style={styles.companyDetails}>
            <Text>PT GURITA BISNIS UNDAGI</Text>
            <Text>Email: undagioffice@gmail.com</Text>
            <Text>Phone: +62 888-0188-7428</Text>
          </View>
        </View>

        {/* Document title */}
        <View style={styles.title}>
          <Text>FORMULIR PERMINTAAN PERSEDIAAN</Text>
        </View>

        {/* Basic form information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Formulir</Text>
          <View style={styles.grid}>
            <View style={styles.field}>
              <Text style={styles.label}>No. Formulir:</Text>
              <Text style={styles.value}>{form.formNumber}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Judul:</Text>
              <Text style={styles.value}>{form.title || '-'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Nama Proyek:</Text>
              <Text style={styles.value}>{form.project.name}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Lokasi Proyek:</Text>
              <Text style={styles.value}>{form.project.location || '-'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Klien:</Text>
              <Text style={styles.value}>{form.project.client || '-'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Tipe Formulir:</Text>
              <Text style={styles.value}>
                {form.type === 'renovasi' ? 'Renovasi' :
                 form.type === 'instalasi' ? 'Instalasi' :
                 form.type === 'perlengkapan' ? 'Perlengkapan' :
                 form.type === 'peralatan' ? 'Peralatan' : 
                 form.type}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Nama Petugas:</Text>
              <Text style={styles.value}>{form.officer.name}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Jabatan:</Text>
              <Text style={styles.value}>{form.officer.role}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Email Petugas:</Text>
              <Text style={styles.value}>{form.officer.email || '-'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Telepon Petugas:</Text>
              <Text style={styles.value}>{form.officer.phone || '-'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Tanggal Pengajuan:</Text>
              <Text style={styles.value}>{createdDate.toLocaleDateString('id-ID')}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Waktu Pengajuan:</Text>
              <Text style={styles.value}>{createdDate.toLocaleTimeString('id-ID')}</Text>
            </View>
          </View>
          {form.description && (
            <View style={styles.fullWidthField}>
              <Text style={styles.label}>Deskripsi Proyek:</Text>
              <Text style={styles.value}>{form.description}</Text>
            </View>
          )}
          {form.notes && (
            <View style={styles.fullWidthField}>
              <Text style={styles.label}>Catatan Khusus:</Text>
              <Text style={styles.value}>{form.notes}</Text>
            </View>
          )}
        </View>

        {/* Items table (first 6 items) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daftar Item yang Diminta</Text>
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <View style={styles.tableColWide}><Text>Nama Item</Text></View>
              <View style={styles.tableColNarrow}><Text>Qty</Text></View>
              <View style={styles.tableColNarrow}><Text>Satuan</Text></View>
              <View style={styles.tableCol}><Text>Spesifikasi Item</Text></View>
              <View style={styles.tableCol}><Text>Catatan Khusus</Text></View>
            </View>
            {(items.slice(0, 6)).map((item, index) => (
              <View key={item.id} style={styles.tableRow}>
                <View style={styles.tableColWide}>
                  <Text>{item.itemName || '-'}</Text>
                </View>
                <View style={styles.tableColNarrow}>
                  <Text>{item.quantity || 0}</Text>
                </View>
                <View style={styles.tableColNarrow}>
                  <Text>{item.unit || '-'}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{item.specifications || '-'}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{item.notes || '-'}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>Ringkasan Permintaan:</Text>
            <Text style={styles.summaryText}>• Total jenis item: {items.length}</Text>
            <Text style={styles.summaryText}>• Total kuantitas: {items.reduce((total, item) => total + item.quantity, 0)} unit</Text>
            <Text style={styles.summaryText}>• Proyek: {form.project.name}</Text>
            <Text style={styles.summaryText}>• Penanggung jawab: {form.officer.name} ({form.officer.role})</Text>
          </View>
        </View>

        {/* Only show signature and footer on last page */}
        {items.length <= 6 && (
          <>
            <View style={styles.signature}>
              <View style={styles.signatureBox}>
                <Text style={styles.signatureText}>Mengetahui,</Text>
                <Text style={styles.signatureText}>{form.officer.role}</Text>
                <Image 
                  src={signatureUrl || SIGNATURE_IMAGE}
                  style={{ width: '100%', height: 70, marginBottom: 10, objectFit: 'contain' }}
                />
                <Text style={styles.signatureText}>{form.officer.name}</Text>
                {form.officer.email && (
                  <Text style={[styles.signatureText, { fontSize: 8, marginTop: 2 }]}>
                    {form.officer.email}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.footer}>
              <Text>Formulir No: {form.formNumber} | Dibuat: {createdDate.toLocaleString('id-ID')} | Proyek: {form.project.name}</Text>
            </View>
          </>
        )}
      </Page>

      {/* Second page if more than 6 items */}
      {items.length > 6 && (
        <Page size="A4" style={styles.page}>
          {/* Header with logo and company info */}
          <View style={styles.header}>
            <Image 
              src={logoUrl || PLACEHOLDER_LOGO}
              style={styles.logo} 
            />
            <View style={styles.companyDetails}>
              <Text>PT GURITA BISNIS UNDAGI</Text>
              <Text>Konstruksi & Pengembangan</Text>
              <Text>Email: undagioffice@gmail.com</Text>
              <Text>Phone: +62 888-0188-7428</Text>
            </View>
          </View>

          {/* Document title */}
          <View style={styles.title}>
            <Text>FORMULIR PERMINTAAN PERSEDIAAN (lanjutan)</Text>
          </View>

          {/* Items table (remaining items) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daftar Item yang Diminta (lanjutan)</Text>
            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                <View style={styles.tableColWide}><Text>Nama Item</Text></View>
                <View style={styles.tableColNarrow}><Text>Qty</Text></View>
                <View style={styles.tableColNarrow}><Text>Satuan</Text></View>
                <View style={styles.tableCol}><Text>Spesifikasi Item</Text></View>
                <View style={styles.tableCol}><Text>Catatan Khusus</Text></View>
              </View>
              {(items.slice(6)).map((item, index) => (
                <View key={item.id} style={styles.tableRow}>
                  <View style={styles.tableColWide}>
                    <Text>{item.itemName || '-'}</Text>
                  </View>
                  <View style={styles.tableColNarrow}>
                    <Text>{item.quantity || 0}</Text>
                  </View>
                  <View style={styles.tableColNarrow}>
                    <Text>{item.unit || '-'}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{item.specifications || '-'}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>{item.notes || '-'}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Signatures section and footer only on last page */}
          <View style={styles.signature}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureText}>Mengetahui,</Text>
              <Text style={styles.signatureText}>{form.officer.role}</Text>
              <Image 
                src={signatureUrl || SIGNATURE_IMAGE}
                style={{ width: '100%', height: 70, marginBottom: 10, objectFit: 'contain' }}
              />
              <Text style={styles.signatureText}>{form.officer.name}</Text>
              {form.officer.email && (
                <Text style={[styles.signatureText, { fontSize: 8, marginTop: 2 }]}>
                  {form.officer.email}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.footer}>
            <Text>Formulir No: {form.formNumber} | Dibuat: {createdDate.toLocaleString('id-ID')} | Proyek: {form.project.name}</Text>
          </View>
        </Page>
      )}
    </Document>
  );
};

export default FormPDF;
