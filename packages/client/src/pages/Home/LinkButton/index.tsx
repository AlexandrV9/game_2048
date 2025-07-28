import { Button } from '@/shared/ui'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface LinkButtonProps {
  link: string
  text: string
  icon?: ReactNode
}

export function LinkButton({ link, text, icon }: LinkButtonProps) {
  return (
    <Link to={link} className="w-max self-center">
      <Button
        className={clsx(
          'h-[10vh] w-[25vw] max-w-[500px] min-w-[300px]',
          'flex items-center justify-center',
          'dark:bg-amber-600 dark:hover:bg-amber-700 dark:active:bg-amber-500',
          'bg-amber-200 hover:bg-amber-300 active:bg-amber-100 cursor-pointer p-4 shadow-md rounded-[4vw] border-none mx-auto transition-colors'
        )}>
        {icon}
        <span className="text-amber-600 dark:text-amber-100 font-bold text-[2rem]">
          {text}
        </span>
      </Button>
    </Link>
  )
}
