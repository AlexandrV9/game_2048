import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Card,
  Form,
  TextInput,
  PhoneInput,
  Avatar,
  AvatarImage,
} from '@/shared/ui'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { formSchema, FormSchema } from '../model/formSchema'
import { UserService } from '@/shared/api/services/user'
import { routesName } from '@/shared/configs/routes'

const mockUser: FormSchema & { avatarUrl?: string } = {
  first_name: 'UserName',
  second_name: 'UserSeconName',
  login: 'UserLogin',
  email: 'euser@email.example',
  phone: '+11111111111',
}

const ProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarUrl, setAvatarUrl] = useState<string>(
    'https://sun9-25.userapi.com/c10968/u85534956/141244771/x_4ee7e2c5.jpg'
  )
  const form = useForm<FormSchema>({
    defaultValues: mockUser,
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await UserService.getUserInfo()
        form.reset({
          first_name: response.data.first_name,
          second_name: response.data.second_name,
          login: response.data.login,
          email: response.data.email,
          phone: response.data.phone,
          avatar: undefined,
        })
        if (response.data.avatar) {
          setAvatarUrl(
            'https://ya-praktikum.tech/api/v2/resources/' + response.data.avatar
          )
        }
      } catch (error) {
        console.error('Ошибка загрузки пользователя', error)
      }
    }
    void loadUser()
  }, [form])

  const avatarFile = form.watch('avatar')

  const onAvatarChange = async (file?: File) => {
    if (!file) {
      return
    }
    form.setValue('avatar', file)
    await form.trigger('avatar')
    if (form.control.getFieldState('avatar').invalid) {
      return
    }

    try {
      const response = await UserService.changeUserAvatar(file)

      setAvatarUrl(
        'https://ya-praktikum.tech/api/v2/resources/' + response.data.avatar
      )
    } catch (error) {
      console.error('Ошибка при загрузке аватара', error)
      form.setError('avatar', {
        type: 'manual',
        message: 'Не удалось загрузить изображение',
      })
    }
  }

  const onSubmit = async (data: FormSchema) => {
    const { avatar, ...userWithoutAvatar } = data
    if (
      !form.getFieldState('first_name').invalid &&
      !form.getFieldState('second_name').invalid &&
      !form.getFieldState('email').invalid &&
      !form.getFieldState('phone').invalid
    ) {
      await UserService.updateUserData(userWithoutAvatar)
      return
    }
    void form.trigger()
  }

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-[#fbfbe9]">
      <Card.Root className="w-full max-w-[400px] bg-[#f6e5b4] border-[#FFA28D]">
        <Card.Header>
          <Card.Title className="text-center text-xl">Профиль</Card.Title>
        </Card.Header>
        <Card.Content>
          <Form.Root {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Form.Field
                control={form.control}
                name="avatar"
                render={() => (
                  <Form.Item>
                    <Form.Control>
                      <div className="flex flex-col items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="hover:opacity-80 transition cursor-pointer">
                          <Avatar className="w-24 h-24 border border-[#FFA28D] bg-[#fbfbe9]">
                            <AvatarImage
                              src={avatarUrl}
                              alt="avatar"
                              className="rounded-full w-full h-full object-cover border-1"
                            />
                          </Avatar>
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={e => {
                            const file = e.target.files?.[0]
                            void onAvatarChange(file)
                          }}
                        />
                      </div>
                    </Form.Control>
                    <Form.Message className="text-center" />
                  </Form.Item>
                )}
              />
              <Form.Field
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control>
                      <TextInput
                        autoComplete="off"
                        {...field}
                        value={field.value ?? ''}
                        className="border-[#FFA28D] bg-[#fbfbe9]"
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                control={form.control}
                name="second_name"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control>
                      <TextInput
                        autoComplete="off"
                        {...field}
                        value={field.value ?? ''}
                        className="border-[#FFA28D] bg-[#fbfbe9]"
                      />
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
                      <TextInput
                        autoComplete="off"
                        {...field}
                        value={field.value ?? ''}
                        className="border-[#FFA28D] bg-[#fbfbe9]"
                      />
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
                      <TextInput
                        autoComplete="off"
                        {...field}
                        value={field.value ?? ''}
                        className="border-[#FFA28D] bg-[#fbfbe9]"
                      />
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
                        value={field.value ?? ''}
                        numberInputProps={{
                          className: 'border-[#FFA28D] bg-[#fbfbe9]',
                        }}
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <div className="flex flex-row gap-1">
                <Button
                  type="button"
                  className="bg-[#f6e5b4] hover:bg-[#fae5a7] active:bg-[#faedc6] flex-1 shadow-md border-1 border-[#FFA28D] text-[#000] font-bold">
                  <Link to={routesName.home}>На главную</Link>
                </Button>
                <Button
                  type="submit"
                  className="bg-[#f6e5b4] hover:bg-[#fae5a7] active:bg-[#faedc6] flex-1 shadow-md border-1 border-[#FFA28D] text-[#000] font-bold">
                  Сохранить
                </Button>
              </div>
            </form>
          </Form.Root>
        </Card.Content>
      </Card.Root>
    </div>
  )
}

export default ProfilePage
