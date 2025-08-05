import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import type { RequestItem } from '@/app/forms/new/page';

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
    width: 100,
    height: 50,
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
  },
});

interface FormPDFProps {
  formData: {
    project: string;
    type: string;
    projectOfficer: string;
    description: string;
    notes: string;
  };
  items: RequestItem[];
  createdDate?: Date;
  logoUrl?: string;
  signatureUrl?: string;
}

// Create Document Component
export const FormPDF = ({ formData, items, createdDate = new Date(), logoUrl, signatureUrl }: FormPDFProps) => (
  <Document title="Supply Request Form">
    {/* First page: up to 6 items */}
    <Page size="A4" style={styles.page}>
      {/* Header with logo and company info */}
      <View style={styles.header}>
        <Image 
          src={logoUrl || PLACEHOLDER_LOGO}
          style={styles.logo} 
        />
        <View style={styles.companyDetails}>
          <Text>UNDAGI KARYA</Text>
          <Text>Construction & Development</Text>
          <Text>Email: info@undagi-karya.com</Text>
          <Text>Phone: (021) 1234-5678</Text>
        </View>
      </View>

      {/* Document title */}
      <View style={styles.title}>
        <Text>SUPPLY REQUEST FORM</Text>
      </View>

      {/* Basic form information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Form Information</Text>
        <View style={styles.grid}>
          <View style={styles.field}>
            <Text style={styles.label}>Project:</Text>
            <Text style={styles.value}>
              {formData.project === 'downtown-mall' ? 'Downtown Mall Phase 2' :
               formData.project === 'residential-complex' ? 'Residential Complex A' :
               formData.project === 'highway-bridge' ? 'Highway Bridge Renovation' :
               formData.project === 'office-building' ? 'Eco-Friendly Office Building' : 
               formData.project}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>
              {formData.type === 'renovasi' ? 'Renovasi' :
               formData.type === 'instalasi' ? 'Instalasi' :
               formData.type === 'perlengkapan' ? 'Perlengkapan' :
               formData.type === 'peralatan' ? 'Peralatan' : 
               formData.type}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Project Officer:</Text>
            <Text style={styles.value}>{formData.projectOfficer}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{createdDate.toLocaleDateString()}</Text>
          </View>
        </View>
      </View>

      {/* Items table (first 6 items) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Requested Items</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableColWide}><Text>Item Name</Text></View>
            <View style={styles.tableColNarrow}><Text>Qty</Text></View>
            <View style={styles.tableColNarrow}><Text>Unit</Text></View>
            <View style={styles.tableCol}><Text>Specifications</Text></View>
            <View style={styles.tableCol}><Text>Notes</Text></View>
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
        <Text>Total Items: {items.length}</Text>
      </View>

      {/* Only show signature and footer on last page */}
      {items.length <= 6 && (
        <>
          <View style={styles.signature}>
            <View style={styles.signatureBox}>
              <Image 
                src={signatureUrl || SIGNATURE_IMAGE}
                style={{ width: '100%', height: 70, marginBottom: 10, objectFit: 'contain' }}
              />
              <Text style={styles.signatureText}>Approved by: Rizal Habib</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Text>Form ID: {Math.random().toString(36).substring(2, 10).toUpperCase()} | Generated on: {createdDate.toLocaleString()}</Text>
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
            <Text>UNDAGI KARYA</Text>
            <Text>Construction & Development</Text>
            <Text>Email: info@undagi-karya.com</Text>
            <Text>Phone: (021) 1234-5678</Text>
          </View>
        </View>

        {/* Document title (optional, can be repeated or omitted) */}
        <View style={styles.title}>
          <Text>SUPPLY REQUEST FORM (cont'd)</Text>
        </View>

        {/* Items table (remaining items) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requested Items (continued)</Text>
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <View style={styles.tableColWide}><Text>Item Name</Text></View>
              <View style={styles.tableColNarrow}><Text>Qty</Text></View>
              <View style={styles.tableColNarrow}><Text>Unit</Text></View>
              <View style={styles.tableCol}><Text>Specifications</Text></View>
              <View style={styles.tableCol}><Text>Notes</Text></View>
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
            <Text style={styles.signatureText}>Approved by: Rizal Habib</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>Form ID: {Math.random().toString(36).substring(2, 10).toUpperCase()} | Generated on: {createdDate.toLocaleString()}</Text>
        </View>
      </Page>
    )}
  </Document>
);

export default FormPDF;
