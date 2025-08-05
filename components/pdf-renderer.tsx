'use client';

import { useState, useEffect } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import FormPDF from '@/components/form-pdf';
import type { RequestItem } from '@/app/forms/new/page';
import { usePublicImage } from '@/lib/use-public-image';
import { FileDown } from 'lucide-react';

interface PDFRendererProps {
  formData: {
    project: string;
    type: string;
    projectOfficer: string;
  };
  items: RequestItem[];
}

export const PDFDownloader = ({ formData, items }: PDFRendererProps) => {
  const [isClient, setIsClient] = useState(false);
  // Use the custom hook to get the logo as a data URL
  const logoUrl = usePublicImage('/logo.png');
  // Use the custom hook to get the signature as a data URL
  const signatureUrl = usePublicImage('/ttd.png');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Memuat generator PDF...</div>;
  }

  return (
    <PDFDownloadLink
      document={<FormPDF formData={formData} items={items} logoUrl={logoUrl} signatureUrl={signatureUrl} />}
      fileName={`form-${new Date().toISOString().split('T')[0]}.pdf`}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-primary-foreground hover:bg-blue-700 h-10 px-4 py-2"
    >
      {({ blob, url, loading, error }) => 
        loading ? 'Membuat PDF...' : (
          <>
            <FileDown className="mr-2 h-4 w-4" />
            Unduh PDF
          </>
        )
      }
    </PDFDownloadLink>
  );
};

export const PDFPreviewerWrapper = ({ formData, items }: PDFRendererProps) => {
  const [isClient, setIsClient] = useState(false);
  // Use the custom hook to get the logo as a data URL
  const logoUrl = usePublicImage('/logo.png');
  // Use the custom hook to get the signature as a data URL
  const signatureUrl = usePublicImage('/ttd.png');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="w-full h-full flex items-center justify-center">Memuat pratinjau PDF...</div>;
  }

  return (
    <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
      <FormPDF formData={formData} items={items} logoUrl={logoUrl} signatureUrl={signatureUrl} />
    </PDFViewer>
  );
};
