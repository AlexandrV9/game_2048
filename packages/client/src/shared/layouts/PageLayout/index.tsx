import { useAuth } from '@/shared/auth'
import { Button } from '@/shared/ui'
import clsx from 'clsx'

export type PageLayoutProps = {
  children: React.ReactNode
  className?: string
}

const testNavBar = {
  home: '/',
  profile: '/profile',
  leaderboard: '/leaderboard',
  forum: '/forum',
}

export const PageLayout = ({
  className,
  children,
  ...props
}: PageLayoutProps) => {
  const { signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div className={clsx(' min-h-screen bg-gray-100', className)} {...props}>
      <header className="p-[20px] flex items-center justify-between ">
        <nav className="flex gap-4 p-[20px] bg-white shadow-md rounded-2xl">
          {/* TODO: Это харкод, позже убрать */}
          {Object.entries(testNavBar).map(([page, route]) => (
            <a key={route} href={route}>
              {page}
            </a>
          ))}
        </nav>
        <Button onClick={handleSignOut}>Выйти</Button>
      </header>
      <main className="p-5">{children}</main>
    </div>
  )
}
