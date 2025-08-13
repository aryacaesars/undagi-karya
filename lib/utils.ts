import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Milestone weight mapping (percentage progress)
export const MILESTONE_WEIGHTS: Record<string, number> = {
  PERENCANAAN: 10,
  PERSIAPAN: 20,
  PELAKSANAAN: 60,
  FINISHING: 90,
  SELESAI: 100,
}

export function formatCurrency(value?: string | number | null, locale = 'id-ID', currency = 'IDR') {
  if (value === null || value === undefined || value === '') return '-'
  const num = typeof value === 'number' ? value : parseFloat(value)
  if (isNaN(num)) return '-'
  return new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: 0 }).format(num)
}
