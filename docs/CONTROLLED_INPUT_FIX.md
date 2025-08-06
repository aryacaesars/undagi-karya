# Fix: Controlled vs Uncontrolled Input Error

## Masalah
Error yang terjadi:
```
Error: A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen.
```

```  
Error: `value` prop on `input` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.
```

## Penyebab
1. **Null/Undefined dari Database**: Field seperti `unit`, `specifications` dari database bisa berupa `null`
2. **Input Field Values**: Input field menerima `null/undefined` sebagai value, mengubah controlled input menjadi uncontrolled
3. **State Management**: State item tidak konsisten dalam memastikan semua field memiliki nilai string yang valid

## Solusi yang Diterapkan

### 1. **Helper Functions**
```tsx
// Helper untuk memastikan string tidak null/undefined
const ensureString = (value: any): string => {
  return value?.toString() || "";
};

// Helper untuk memastikan number valid
const ensureNumber = (value: any): number => {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};
```

### 2. **Perbaikan handleItemChange**
```tsx
// Sebelum:
unit: selectedItem.unit,
specifications: selectedItem.specifications,

// Sesudah:
unit: ensureString(selectedItem.unit),
specifications: ensureString(selectedItem.specifications),
```

### 3. **Perbaikan Input Components**
```tsx
// Semua input field dipastikan memiliki fallback
<Input
  value={item.unit || ""}           // Sebelum: item.unit
  value={item.specifications || ""} // Sebelum: item.specifications
  value={item.notes || ""}          // Sebelum: item.notes
/>

<Select
  value={item.itemName || ""}       // Sebelum: item.itemName
/>
```

### 4. **Consistent Value Handling**
```tsx
// Dalam handleItemChange
[field]: field === "quantity" ? ensureNumber(value) : ensureString(value)
```

## Hasil
✅ **No More Controlled/Uncontrolled Errors**: Semua input selalu memiliki string value yang valid
✅ **Database Null Handling**: Field null dari database ditangani dengan fallback ke string kosong
✅ **Consistent State**: State item selalu memiliki nilai yang valid untuk semua field
✅ **Better UX**: User tidak akan melihat error dan form bekerja dengan lancar

## Best Practice
1. **Always use fallbacks** untuk value yang bisa null: `value={data || ""}`
2. **Type safety** dengan helper functions untuk konversi yang aman
3. **Consistent handling** untuk semua input field
4. **Database field validation** untuk memastikan data yang konsisten

## Testing
- ✅ Form creation dengan item selection
- ✅ Dynamic item addition/removal  
- ✅ Supply item dengan field null/undefined
- ✅ Form submission dengan PDF generation
