import { Link } from 'react-router-dom'
import { routesName } from '@/shared/configs/routes'
import { Button } from '@/shared/ui'

const Error500Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-10 bg-amber-50 dark:bg-gray-800">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Ошибка 500 — Проблемы на сервере
      </h1>
      <Button className="w-auto cursor-pointer">
        <Link to={routesName.home}>Домой</Link>
      </Button>
    </div>
  )
}

export default Error500Page
