import { format } from 'date-fns'
import {
  dashboardKpis,
  monthlyRevenue,
  recentSales,
  reportPeriod,
} from './report'

type Cell = string | number

const columns = ['Section', 'Name', 'Value', 'Detail']

function toCsvCell(cell: Cell) {
  const text = String(cell)
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

/**
 * The dashboard report as CSV text: one flat table with a row per value the
 * Overview tab shows. Everything comes from `report.ts`, so the file always
 * matches the screen.
 */
export function buildReportCsv() {
  const rows: Cell[][] = [
    columns,
    [
      'Report',
      'Period',
      reportPeriod.label,
      `${reportPeriod.start} to ${reportPeriod.end}`,
    ],
    ...dashboardKpis.map((kpi) => ['KPI', kpi.label, kpi.value, kpi.change]),
    ...monthlyRevenue.map((month) => [
      'Monthly revenue (USD)',
      month.name,
      month.total,
      '',
    ]),
    ...recentSales.map((sale) => [
      'Recent sales (USD)',
      sale.name,
      sale.amount,
      sale.email,
    ]),
  ]

  return rows.map((row) => row.map(toCsvCell).join(',')).join('\r\n')
}

/** `report-YYYY-MM-DD.csv`, using the local date. */
export function getReportFileName(date: Date = new Date()) {
  return `report-${format(date, 'yyyy-MM-dd')}.csv`
}
