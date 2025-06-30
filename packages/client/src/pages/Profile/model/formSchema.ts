import { z } from 'zod'

const requiredField = (message = 'Поле обязательно') =>
  z.string({ required_error: message })

const avatarField = (message = 'Недопустимы формат') =>
  z
    .instanceof(File)
    .refine(
      file =>
        ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(
          file.type
        ),
      { message: message }
    )

export const formSchema = z.object({
  first_name: requiredField()
    .min(2, { message: 'Имя должно быть не короче 2 символов' })
    .max(50, { message: 'Имя должно быть не длиннее 50 символов' })
    .regex(/^[a-zA-Zа-яА-ЯёЁ\- ]+$/, {
      message: 'Имя может содержать только буквы и дефисы',
    }),

  second_name: requiredField()
    .min(2, { message: 'Фамилия должна быть не короче 2 символов' })
    .max(50, { message: 'Фамилия должна быть не длиннее 50 символов' })
    .regex(/^[a-zA-Zа-яА-ЯёЁ\- ]+$/, {
      message: 'Фамилия может содержать только буквы и дефисы',
    }),

  login: requiredField()
    .min(5, { message: 'Логин должен быть не короче 5 символов' })
    .max(20, { message: 'Логин должно быть не длиннее 20 символов' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Логин может содержать только латинские буквы, цифры и _',
    }),

  email: requiredField()
    .email('Некорректный email')
    .max(100, { message: 'Email должен быть короче 100 символов' }),

  phone: requiredField()
    .regex(/^\+?[0-9\s\-()]+$/, {
      message: 'Некорректный номер телефона',
    })
    .min(10, { message: 'Номер должен быть не короче 10 цифр' })
    .max(20, { message: 'Номер должен быть не длиннее 20 цифр' }),

  avatar: avatarField().optional(),
})

export type FormSchema = z.infer<typeof formSchema>
