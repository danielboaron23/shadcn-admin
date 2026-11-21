import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { recentSales } from '../data/report'

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function RecentSales() {
  return (
    <div className='space-y-8'>
      {recentSales.map((sale) => (
        <div key={sale.email} className='flex items-center gap-4'>
          <Avatar className='h-9 w-9'>
            <AvatarImage src={sale.avatar} alt='Avatar' />
            <AvatarFallback>{sale.initials}</AvatarFallback>
          </Avatar>
          <div className='flex flex-1 flex-wrap items-center justify-between'>
            <div className='space-y-1'>
              <p className='text-sm leading-none font-medium'>{sale.name}</p>
              <p className='text-muted-foreground text-sm'>{sale.email}</p>
            </div>
            <div className='font-medium'>+{usd.format(sale.amount)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
