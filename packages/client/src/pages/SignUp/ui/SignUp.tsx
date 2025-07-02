import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema, formSchema } from '../model/formSchema'
import { useAuth } from '@/shared/auth'
import { Button, Card, Form, TextInput, PhoneInput } from '@/shared/ui'
import { Link } from 'react-router-dom'
import { routesName } from '@/shared/configs/routes'

const SignUpPage = () => {
  const { signUp, isLoading } = useAuth()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(formData: FormSchema) {
    void signUp(formData)
  }

  if (isLoading) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-[100vw] h-[100vh] bg-[#fbfbe9]">
      <h1 className="text-3xl font-bold">Игра 2048</h1>
      <Card.Root className="w-full max-w-[400px]">
        <Card.Header>
          <Card.Title className="text-center text-xl">Регистрация</Card.Title>
        </Card.Header>
        <Card.Content>
          <Form.Root {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Form.Field
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control>
                      <TextInput autoComplete="off" {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                control={form.control}
                name="secondName"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control>
                      <TextInput autoComplete="off" {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
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
                name="email"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control>
                      <TextInput autoComplete="off" {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Номер телефона</Form.Label>
                    <Form.Control>
                      <PhoneInput
                        {...field}
                        defaultCountry="RU"
                        international
                        autoComplete="off"
                        onChange={value => {
                          field.onChange(value === '+8' ? '+7' : value)
                        }}
                      />
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
                Создать
              </Button>
            </form>
          </Form.Root>
        </Card.Content>
        <Card.Footer className="flex-col gap-2">
          <p className="leading-5">
            Уже есть аккаунт?{' '}
            <Link to={routesName.signIn} className="text-blue-600">
              Войти
            </Link>
          </p>
        </Card.Footer>
      </Card.Root>
    </div>
  )
}

export default SignUpPage
