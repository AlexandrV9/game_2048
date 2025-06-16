import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema, formSchema } from '../model/formSchema'
import { useAuth } from '@/shared/auth'
import { Link } from 'react-router-dom'
import { Button, Card, Form, TextInput } from '@/shared/ui'
import { routesName } from '@/shared/configs/routes'

const SignInPage = () => {
  const { signInByLogin, isLoading } = useAuth()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: FormSchema) {
    signInByLogin(values)
  }

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
                      <TextInput autoComplete="off" {...field} />
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
                      <TextInput
                        type="password"
                        autoComplete="off"
                        {...field}
                      />
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
            <Link to={routesName.signUp} className="text-blue-600">
              Создать
            </Link>
          </p>
        </Card.Footer>
      </Card.Root>
    </div>
  )
}

export default SignInPage
