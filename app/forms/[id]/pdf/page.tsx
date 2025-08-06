"use client"

import { useParams } from "next/navigation";
import DatabaseFormPDFWrapper from "@/components/database-form-pdf-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FormPDFPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <Button asChild variant="outline" size="sm">
          <Link href={`/forms/${id}`} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Detail
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">Preview PDF Formulir</h1>
        <div></div>
      </div>
      <div className="flex-1">
        <DatabaseFormPDFWrapper 
          formId={id as string}
          mode="viewer"
        />
      </div>
    </div>
  );
}
