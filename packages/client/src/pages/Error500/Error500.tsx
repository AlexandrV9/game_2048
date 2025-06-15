import { Link } from 'react-router-dom'
import { routesName } from '@/shared/configs/routes'
import { Button } from '@/shared/ui'

const Error500Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Ошибка 500 — Проблемы на сервере
      </h1>
      <Button className="w-auto cursor-pointer">
        <Link to={routesName.home}>Home</Link>
      </Button>
    </div>
  )
}

export default Error500Page
