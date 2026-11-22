import { useEffect, useRef } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ArticleView } from './components/article-view'
import { HelpCenterHome } from './components/help-center-home'
import { getArticle } from './data/helpers'

const route = getRouteApi('/_authenticated/help-center/')

export function HelpCenter() {
  const { article: articleSlug } = route.useSearch()
  // An unknown slug finds nothing and falls back to the list.
  const article = getArticle(articleSlug)

  // Remember the open article so the list can return focus to its link.
  const lastArticleRef = useRef<string | null>(null)
  useEffect(() => {
    if (article) lastArticleRef.current = article.slug
  }, [article])

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col items-center pt-0 pb-12'>
        {article ? (
          <ArticleView article={article} />
        ) : (
          <HelpCenterHome returnFocusRef={lastArticleRef} />
        )}
      </Main>
    </>
  )
}
