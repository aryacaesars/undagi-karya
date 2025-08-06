"use client"

import { useFormPDF } from '@/hooks/use-form-pdf';
import { DatabaseFormPDF } from './form-pdf';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

interface DatabaseFormPDFWrapperProps {
  formId: string;
  logoUrl?: string;
  signatureUrl?: string;
  mode?: 'viewer' | 'download';
  fileName?: string;
  children?: (props: { loading: boolean; error: string | null; blob: Blob | null }) => React.ReactNode;
}

export function DatabaseFormPDFWrapper({ 
  formId, 
  logoUrl, 
  signatureUrl, 
  mode = 'viewer',
  fileName,
  children 
}: DatabaseFormPDFWrapperProps) {
  const { form, isLoading, error } = useFormPDF(formId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Memuat data form...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p>Data form tidak ditemukan</p>
        </div>
      </div>
    );
  }

  const pdfDocument = <DatabaseFormPDF form={form} logoUrl={logoUrl} signatureUrl={signatureUrl} />;
  const defaultFileName = fileName || `Form-${form.formNumber}-${new Date().toISOString().split('T')[0]}.pdf`;

  if (mode === 'download') {
    return (
      <PDFDownloadLink 
        document={pdfDocument} 
        fileName={defaultFileName}
      >
        {({ blob, url, loading, error }) => {
          if (children) {
            return children({ loading, error: error?.message || null, blob });
          }
          return (
            <button 
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </button>
          );
        }}
      </PDFDownloadLink>
    );
  }

  return (
    <div className="w-full h-screen">
      <PDFViewer width="100%" height="100%">
        {pdfDocument}
      </PDFViewer>
    </div>
  );
}

export default DatabaseFormPDFWrapper;
