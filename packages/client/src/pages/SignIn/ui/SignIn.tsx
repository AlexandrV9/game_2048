import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema, formSchema } from '../model/formSchema'
import { useAuth } from '@/shared/auth'
import { Link } from 'react-router-dom'
import { Button, Card, Form, TextInput } from '@/shared/ui'
import { routesName } from '@/shared/configs/routes'
import yaImage from '../../../shared/assets/yandex.svg'

const SignInPage = () => {
  const { signInByLogin, isLoading } = useAuth()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: FormSchema) {
    void signInByLogin(values)
  }

  const OAuth = async () => {
    const queryParams = new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_CLIENT_ID_OAUTH,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI_OAUTH,
    })
    window.location.href =
      import.meta.env.VITE_OAUTH_URL + queryParams.toString()
  }

  if (isLoading) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-[100vw] h-[100vh] bg-[#fbfbe9]">
      <h1 className="text-3xl font-bold">Игра 2048</h1>
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
            <p className="text-center">или</p>
            <Button className="w-full" onClick={OAuth}>
              <img src={yaImage} alt="yandex" className="w-5 h-5" />
              <p>Яндекс.ID</p>
            </Button>
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
