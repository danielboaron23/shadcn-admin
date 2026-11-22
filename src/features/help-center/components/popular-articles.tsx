import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { helpArticles } from '../data/articles'
import { formatReadingTime, getCategory } from '../data/helpers'

const popularArticles = helpArticles.filter((article) => article.popular)

export function PopularArticles() {
  return (
    <section
      aria-labelledby='help-popular-heading'
      className='flex w-full flex-col gap-3'
    >
      <h2
        id='help-popular-heading'
        className='text-muted-foreground text-sm font-semibold'
      >
        Popular articles
      </h2>
      <ul className='grid gap-4 sm:grid-cols-2'>
        {popularArticles.map((article) => (
          <li key={article.slug}>
            <Card className='hover:bg-muted/50 has-[a:focus-visible]:border-ring has-[a:focus-visible]:ring-ring/50 relative h-full gap-2 p-5 shadow-xs transition-colors has-[a:focus-visible]:ring-[3px]'>
              <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                <span className='flex-1 font-medium'>
                  {getCategory(article.categoryId)?.title}
                </span>
                <span className='whitespace-nowrap'>
                  {formatReadingTime(article.readingMinutes)}
                </span>
              </div>
              <h3 className='text-base font-semibold tracking-tight wrap-break-word'>
                {/* The link stretches over the whole card, so the card is one target. */}
                <Link
                  to='/help-center'
                  search={(prev) => ({ ...prev, article: article.slug })}
                  className='outline-none after:absolute after:inset-0 after:rounded-xl'
                >
                  {article.title}
                </Link>
              </h3>
              <p className='text-muted-foreground text-sm'>{article.summary}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
