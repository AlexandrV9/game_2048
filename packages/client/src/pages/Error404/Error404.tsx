import { Link } from 'react-router-dom'
import { routesName } from '@/shared/configs/routes'
import { Button } from '@/shared/ui'

const Error404Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Ошибка 404 — Страница не найдена
      </h1>
      <Button className="w-auto cursor-pointer">
        <Link to={routesName.home}>Home</Link>
      </Button>
    </div>
  )
}

export default Error404Page
