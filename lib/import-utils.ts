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
            // Simple CSV parsing that handles quoted fields
            const columns: string[] = [];
            let current = '';
            let inQuotes = false;
            
            for (let i = 0; i < line.length; i++) {
              const char = line[i];
              
              if (char === '"' && (i === 0 || line[i-1] === ',')) {
                inQuotes = true;
              } else if (char === '"' && inQuotes && (i === line.length - 1 || line[i+1] === ',')) {
                inQuotes = false;
              } else if (char === ',' && !inQuotes) {
                columns.push(current.trim());
                current = '';
              } else if (char !== '"' || inQuotes) {
                current += char;
              }
            }
            columns.push(current.trim()); // Add the last column
            
            return {
              name: columns[0] || '',
              specifications: columns[1] || ''
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
        specifications: item.specifications?.trim() || undefined
      });
    }
  });

  return { valid, errors };
}
