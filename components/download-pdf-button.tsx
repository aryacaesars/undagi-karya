"use client";

import { useState, useEffect } from 'react';
import { renderToFile } from '@react-pdf/renderer';
import FormPDF from '@/components/form-pdf';
import type { RequestItem } from '@/app/forms/new/page';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { usePublicImage } from '@/lib/use-public-image';

interface DownloadPDFButtonProps {
  formData: {
    project: string;
    type: string;
    projectOfficer: string;
    description: string;
    notes: string;
  };
  items: RequestItem[];
}

// A simpler button that directly generates and downloads the PDF
export const DownloadPDFButton = ({ formData, items }: DownloadPDFButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  // Use the custom hooks to get the images as data URLs
  const logoUrl = usePublicImage('/placeholder-logo.png');
  const signatureUrl = usePublicImage('/ttd.png');

  const generatePDF = async () => {
    try {
      setIsGenerating(true);
      
      // Create a blob URL for the PDF
      const blob = await generatePDFBlob(formData, items);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `form-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(link.href), 100);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDFBlob = async (formData: any, items: RequestItem[]) => {
    try {
      // Create a blob directly with PDF data
      const blob = await new Promise<Blob>((resolve, reject) => {
        import('@react-pdf/renderer').then(({ pdf }) => {
          const pdfDocument = <FormPDF 
            formData={formData} 
            items={items} 
            logoUrl={logoUrl} 
            signatureUrl={signatureUrl} 
          />;
          pdf(pdfDocument).toBlob().then(resolve).catch(reject);
        }).catch(reject);
      });
      
      return blob;
    } catch (error) {
      console.error("Error generating PDF blob:", error);
      throw new Error("Failed to generate PDF");
    }
  };

  return (
    <Button 
      onClick={generatePDF} 
      disabled={isGenerating}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-primary-foreground hover:bg-blue-700 h-10 px-4 py-2"
    >
      <FileDown className="mr-2 h-4 w-4" />
      {isGenerating ? 'Generating PDF...' : 'Download PDF'}
    </Button>
  );
};
