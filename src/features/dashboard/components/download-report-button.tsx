import { useEffect, useRef, useState } from 'react'
import { Check, Download, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  dashboardKpis,
  monthlyRevenue,
  recentSales,
  reportPeriod,
} from '../data/report'
import {
  buildReportCsv,
  getReportFileName,
  type DashboardReport,
} from '../data/report-csv'

const report: DashboardReport = {
  period: reportPeriod,
  kpis: dashboardKpis,
  monthlyRevenue,
  recentSales,
}

/** Building the CSV is instant; hold the spinner so it does not flash. */
const MIN_LOADING_MS = 500
/** How long the check icon stays before the button returns to default. */
const SUCCESS_MS = 2000
/** Leave the file URL alive long enough for the browser to start saving. */
const REVOKE_URL_MS = 1000

type Status = 'idle' | 'loading' | 'success'

function saveCsvFile(csv: string, fileName: string) {
  const url = URL.createObjectURL(
    new Blob([csv], { type: 'text/csv;charset=utf-8' })
  )
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  try {
    link.click()
  } finally {
    link.remove()
    // Revoking in the same tick can cancel the download in Safari.
    setTimeout(() => URL.revokeObjectURL(url), REVOKE_URL_MS)
  }
}

export function DownloadReportButton() {
  const [status, setStatus] = useState<Status>('idle')
  const isBusy = useRef(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  async function handleDownload() {
    // A second click while the file is being prepared must not start another.
    if (isBusy.current) return
    isBusy.current = true
    clearTimeout(resetTimer.current)
    setStatus('loading')

    try {
      const csv = buildReportCsv(report)
      await sleep(MIN_LOADING_MS)
      saveCsvFile(csv, getReportFileName(report.period))
      setStatus('success')
      resetTimer.current = setTimeout(() => setStatus('idle'), SUCCESS_MS)
    } catch {
      setStatus('idle')
      toast.error('Couldn’t download the report', {
        description: 'Something went wrong while creating the CSV.',
        action: { label: 'Try again', onClick: () => void handleDownload() },
      })
    } finally {
      isBusy.current = false
    }
  }

  const isLoading = status === 'loading'

  return (
    <>
      {/* First, so the button stays the last child of the title-row actions. */}
      <span className='sr-only' role='status'>
        {status === 'loading' && 'Preparing report…'}
        {status === 'success' && 'Report downloaded'}
      </span>
      {/* aria-disabled, not disabled, so keyboard focus stays on the button. */}
      <Button
        variant='outline'
        onClick={handleDownload}
        aria-disabled={isLoading}
        aria-busy={isLoading}
        aria-label={isLoading ? 'Preparing report…' : undefined}
        className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
      >
        {status === 'idle' && <Download aria-hidden='true' />}
        {status === 'loading' && (
          <LoaderCircle className='animate-spin' aria-hidden='true' />
        )}
        {status === 'success' && <Check aria-hidden='true' />}
        Download report
      </Button>
    </>
  )
}
