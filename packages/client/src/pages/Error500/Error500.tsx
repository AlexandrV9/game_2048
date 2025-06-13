import { Link } from 'react-router-dom'
import { routesName } from '@/core/Routes.js'
import './Error500.css'

const Error500Page = () => {
  return (
    <div className={'error-page-wrapper'}>
      <h1>Ошибка 500 — Страница не найдена</h1>
      <Link to={routesName.home} className={'error-page-link'}>
        На главную
      </Link>
    </div>
  )
}

export default Error500Page
