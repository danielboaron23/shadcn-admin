import { useEffect, useRef, useState } from 'react'
import { Check, CircleAlert, Download, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { buildReportCsv, getReportFileName } from '../data/report-csv'

type Status = 'idle' | 'loading' | 'success'

/** Keeps the spinner on screen long enough to read as a state, not a flash. */
const MIN_LOADING_MS = 600
const SUCCESS_MS = 2000
const ERROR_TOAST_ID = 'download-report-error'

const statusMessage: Record<Status, string> = {
  idle: '',
  loading: 'Preparing report…',
  success: 'Report downloaded',
}

function saveCsv(csv: string, fileName: string) {
  // The BOM makes Excel read the file as UTF-8.
  const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function DownloadReportButton() {
  const [status, setStatus] = useState<Status>('idle')
  const isBusy = useRef(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  async function downloadReport() {
    if (isBusy.current) return
    isBusy.current = true
    clearTimeout(resetTimer.current)
    toast.dismiss(ERROR_TOAST_ID)
    setStatus('loading')

    try {
      await sleep(MIN_LOADING_MS)
      saveCsv(buildReportCsv(), getReportFileName())
      setStatus('success')
      resetTimer.current = setTimeout(() => setStatus('idle'), SUCCESS_MS)
    } catch {
      setStatus('idle')
      toast.error('Couldn’t download the report', {
        id: ERROR_TOAST_ID,
        description: 'Something went wrong while creating the CSV.',
        icon: <CircleAlert className='text-destructive size-4' aria-hidden />,
        action: { label: 'Try again', onClick: () => downloadReport() },
      })
    } finally {
      isBusy.current = false
    }
  }

  const isLoading = status === 'loading'

  return (
    <>
      <span role='status' className='sr-only'>
        {statusMessage[status]}
      </span>
      {/* aria-disabled (not disabled) so keyboard focus stays on the button. */}
      <Button
        variant='outline'
        aria-disabled={isLoading}
        className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
        onClick={downloadReport}
      >
        {isLoading ? (
          <LoaderCircle className='animate-spin' aria-hidden />
        ) : status === 'success' ? (
          <Check aria-hidden />
        ) : (
          <Download aria-hidden />
        )}
        Download report
      </Button>
    </>
  )
}
