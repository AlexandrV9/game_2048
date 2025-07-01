import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Error404Page from './Error404'
import '@testing-library/jest-dom'
import { routesName } from '@/shared/configs/routes'

describe('Error404Page', () => {
  it('должна отображать заголовок и ссылку на главную', () => {
    render(
      <BrowserRouter>
        <Error404Page />
      </BrowserRouter>
    )

    expect(
      screen.getByText('Ошибка 404 — Страница не найдена')
    ).toBeInTheDocument()

    const link = screen.getByText('Домой')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', routesName.home)
  })
})
