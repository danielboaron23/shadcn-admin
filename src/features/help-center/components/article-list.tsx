import { Link } from '@tanstack/react-router'
import { ChevronRight, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { type HelpArticle } from '../data/articles'
import { formatReadingTime, getCategory } from '../data/helpers'

type ArticleListProps = {
  articles: HelpArticle[]
}

/** Bordered list of article rows. Each row is one link that opens the article. */
export function ArticleList({ articles }: ArticleListProps) {
  return (
    <Card className='w-full gap-0 overflow-hidden py-0'>
      <ul className='divide-y'>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              to='/help-center'
              search={(prev) => ({ ...prev, article: article.slug })}
              data-article={article.slug}
              className='hover:bg-muted/50 focus-visible:ring-ring/50 flex min-h-25 items-center gap-4 px-4 py-3.5 transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-inset'
            >
              <span
                aria-hidden='true'
                className='bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-md'
              >
                <FileText className='size-4' />
              </span>
              <span className='flex min-w-0 flex-1 flex-col gap-0.5 text-sm'>
                <span className='font-medium wrap-break-word'>
                  <bdi>{article.title}</bdi>
                </span>
                {/* This line is cut with an ellipsis, so it takes the text's
                    own direction to cut at the end of the sentence, and is
                    aligned back to the RTL side by hand. */}
                <span
                  dir='auto'
                  className='text-muted-foreground sm:truncate rtl:text-right'
                >
                  {article.summary}
                </span>
              </span>
              <Badge variant='outline' className='hidden sm:inline-flex'>
                <bdi>{getCategory(article.categoryId)?.title}</bdi>
              </Badge>
              <span className='text-muted-foreground hidden text-xs whitespace-nowrap sm:inline'>
                <bdi>{formatReadingTime(article.readingMinutes)}</bdi>
              </span>
              <ChevronRight
                aria-hidden='true'
                className='text-muted-foreground size-4 shrink-0 rtl:rotate-180'
              />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}
