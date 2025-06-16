import { z } from 'zod'

const requiredField = (message = 'Поле обязательно') =>
  z.string({ required_error: message })

export const formSchema = z.object({
  firstName: requiredField()
    .min(2, { message: 'Имя должно быть не короче 2 символов' })
    .max(50, { message: 'Имя должно быть не длиннее 50 символов' })
    .regex(/^[a-zA-Zа-яА-ЯёЁ\- ]+$/, {
      message: 'Имя может содержать только буквы и дефисы',
    }),

  secondName: requiredField()
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

  password: requiredField()
    .min(5, { message: 'Пароль должен быть не короче 5 символов' })
    .max(30, { message: 'Пароль должен быть не длиннее 30 символов' })
    .regex(/[a-z]/, {
      message: 'Пароль должен содержать хотя бы одну строчную букву',
    })
    .regex(/[A-Z]/, {
      message: 'Пароль должен содержать хотя бы одну заглавную букву',
    })
    .regex(/[_!@#$%^&*()]/, {
      message:
        'Пароль должен содержать хотя бы один спец. символ: _ ! @ # $ % ^ & * ( )',
    })
    .regex(/[0-9]/, {
      message: 'Пароль должен содержать хотя бы одну цифру',
    }),

  phone: requiredField()
    .regex(/^\+?[0-9\s\-()]+$/, {
      message: 'Некорректный номер телефона',
    })
    .min(10, { message: 'Номер должен быть не короче 10 цифр' })
    .max(20, { message: 'Номер должен быть не длиннее 20 цифр' }),
})

export type FormSchema = z.infer<typeof formSchema>
