export interface ParsedItem {
  name: string;
  category?: string;
  unit?: string;
  specifications?: string;
}

export interface ValidationResult {
  valid: ParsedItem[];
  errors: Array<{
    row: number;
    item: Partial<ParsedItem>;
    errors: string[];
  }>;
}

export function parseExcelFile(file: File): Promise<ParsedItem[]> {
  return new Promise((_, reject) => {
    reject(new Error('Excel file parsing belum didukung. Silakan gunakan file CSV.'));
  });
}

export function parseCSVFile(file: File): Promise<ParsedItem[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        
        // Skip header row
        const dataLines = lines.slice(1);
        
        const items: ParsedItem[] = dataLines
          .map((line) => {
            const columns = line.split(',').map(col => col.trim().replace(/"/g, ''));
            return {
              name: columns[0] || '',
              category: columns[1] || '',
              unit: columns[2] || '',
              specifications: columns[3] || ''
            };
          })
          .filter(item => item.name.trim() !== ''); // Filter out empty rows
        
        resolve(items);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export function validateItems(items: ParsedItem[]): ValidationResult {
  const valid: ParsedItem[] = [];
  const errors: Array<{
    row: number;
    item: Partial<ParsedItem>;
    errors: string[];
  }> = [];

  items.forEach((item, index) => {
    const itemErrors: string[] = [];
    
    if (!item.name || item.name.trim() === '') {
      itemErrors.push('Nama item harus diisi');
    }
    
    if (itemErrors.length > 0) {
      errors.push({
        row: index + 2, // +2 because we skip header and use 1-based indexing
        item,
        errors: itemErrors
      });
    } else {
      valid.push({
        name: item.name.trim(),
        category: item.category?.trim() || 'Umum', // Default category if empty
        unit: item.unit?.trim() || 'pcs', // Default unit if empty
        specifications: item.specifications?.trim() || undefined
      });
    }
  });

  return { valid, errors };
}
