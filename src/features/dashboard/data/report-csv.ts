import {
  type DashboardKpi,
  type MonthlyRevenue,
  type RecentSale,
} from './report'

export type DashboardReport = {
  period: { label: string; start: string }
  kpis: DashboardKpi[]
  monthlyRevenue: MonthlyRevenue[]
  recentSales: RecentSale[]
}

type CsvCell = string | number

/** Same format as the Recent Sales list on screen. */
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

/** Quotes a cell that contains a comma, a quote or a line break (RFC 4180). */
function escapeCsvCell(cell: CsvCell) {
  const text = String(cell)
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

/** The report as CSV: one block per dashboard section, in screen order. */
export function buildReportCsv(report: DashboardReport) {
  const rows: CsvCell[][] = [
    ['Dashboard report', report.period.label],
    [],
    ['Summary'],
    ['Metric', 'Value', 'Change'],
    ...report.kpis.map((kpi) => [kpi.label, kpi.value, kpi.change]),
    [],
    ['Monthly revenue'],
    ['Month', 'Revenue (USD)'],
    ...report.monthlyRevenue.map((month) => [month.name, month.total]),
    [],
    ['Recent sales'],
    ['Name', 'Email', 'Amount'],
    ...report.recentSales.map((sale) => [
      sale.name,
      sale.email,
      `+${usd.format(sale.amount)}`,
    ]),
  ]

  return rows.map((row) => row.map(escapeCsvCell).join(',')).join('\r\n')
}

/** `dashboard-report-YYYY-MM.csv`, from the month the report covers. */
export function getReportFileName(period: DashboardReport['period']) {
  return `dashboard-report-${period.start.slice(0, 7)}.csv`
}
