import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

import { z } from 'zod'
import { formSchema } from '../model/formSchema'
import { useAuth } from '@/shared/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Form, Input } from '@/shared/ui'
import { routesName } from '@/shared/configs/routes'
import { useEffect } from 'react'

const SignInPage = () => {
  const navigate = useNavigate()
  const { signInByLogin, isLoggedIn, isLoading } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await signInByLogin(values)

      if (res?.status === 200) {
        toast.success('Добро пожаловать!')
        navigate(routesName.home)
      }
    } catch {
      toast.error('Упс, что-то пошло не так. Попробуйте снова')
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      // navigate(routesName.home)
    }
  }, [isLoggedIn, navigate])

  if (isLoading) {
    return null
  }

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <Card.Root className="w-full max-w-[400px]">
        <Card.Header>
          <Card.Title className="text-center text-xl">Авторизация</Card.Title>
        </Card.Header>
        <Card.Content>
          <Form.Root {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Form.Field
                control={form.control}
                name="login"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control>
                      <Input autoComplete="off" {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                control={form.control}
                name="password"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control>
                      <Input type="password" autoComplete="off" {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </Form.Root>
        </Card.Content>
        <Card.Footer className="flex-col gap-2">
          <p className="leading-5">
            Нет аккаунта?{' '}
            <Link to={routesName.signup} className="text-blue-600">
              Создать
            </Link>
          </p>
        </Card.Footer>
      </Card.Root>
    </div>
  )
}

export default SignInPage
