import type { ReportRow } from '../data/reports'

export type CsvColumn = {
  header: string
  pick: (row: ReportRow) => string | number
}

function quote(value: string | number): string {
  const s = String(value ?? '')
  // Always quote — keeps Excel happy with commas, quotes, and newlines.
  return `"${s.replace(/"/g, '""')}"`
}

export function rowsToCsv(rows: ReportRow[], columns: CsvColumn[]): string {
  const lines: string[] = []
  lines.push(columns.map((c) => quote(c.header)).join(','))
  for (const row of rows) {
    lines.push(columns.map((c) => quote(c.pick(row))).join(','))
  }
  // CRLF for Excel-friendliness.
  return lines.join('\r\n')
}

export function downloadCsv(filename: string, csv: string) {
  // UTF-8 BOM so Excel detects encoding correctly.
  const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function csvFilename(from: Date, to: Date): string {
  const iso = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  return `reports_${iso(from)}_${iso(to)}.csv`
}
