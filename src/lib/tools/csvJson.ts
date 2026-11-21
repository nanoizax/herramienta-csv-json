export function isSpreadsheetFile(file: File): boolean {
  const lower = file.name.toLowerCase();
  return lower.endsWith(".csv") || lower.endsWith(".xlsx") || lower.endsWith(".xls");
}

export async function spreadsheetToJson(file: File): Promise<unknown[]> {
  const lower = file.name.toLowerCase();

  if (lower.endsWith(".csv")) {
    const Papa = (await import("papaparse")).default;
    const text = await file.text();
    const result = Papa.parse(text, { header: true, skipEmptyLines: true });
    return result.data as unknown[];
  }

  const XLSX = await import("xlsx");
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];
  return XLSX.utils.sheet_to_json(sheet);
}

export async function jsonToCsv(jsonText: string): Promise<string> {
  const Papa = (await import("papaparse")).default;
  const parsed = JSON.parse(jsonText);
  const rows = Array.isArray(parsed) ? parsed : [parsed];
  return Papa.unparse(rows);
}
