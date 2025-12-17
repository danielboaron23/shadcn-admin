import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from './popover'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  )
}

type CardTitleProps = React.ComponentProps<'div'> & {
  popoverContent?: React.ReactNode
  popoverTitle?: string
}

function CardTitle({ 
  className, 
  popoverContent,
  popoverTitle,
  children,
  ...props 
}: CardTitleProps) {
  const titleElement = (
    <div
      data-slot='card-title'
      className={cn('leading-none font-semibold', className)}
      {...props}
    >
      {children}
    </div>
  )

  if (popoverContent || popoverTitle) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            data-slot='card-title'
            className={cn(
              'leading-none font-semibold cursor-pointer hover:opacity-80 transition-opacity text-left bg-transparent border-none p-0 m-0',
              className
            )}
            {...props}
          >
            {children}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            {popoverTitle && (
              <h4 className="font-medium leading-none">{popoverTitle}</h4>
            )}
            {popoverContent && (
              <div className="text-sm text-muted-foreground">
                {popoverContent}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return titleElement
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-content'
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
