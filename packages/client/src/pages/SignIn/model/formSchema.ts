import { z } from 'zod'

const requiredField = (message = 'Поле обязательно') =>
  z.string({ required_error: message })

export const formSchema = z.object({
  login: requiredField()
    .min(5, { message: 'Логин должен быть не короче 5 символов' })
    .max(20, { message: 'Логин должно быть не длиннее 20 символов' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Логин может содержать только латинские буквы, цифры и _',
    }),

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
})
