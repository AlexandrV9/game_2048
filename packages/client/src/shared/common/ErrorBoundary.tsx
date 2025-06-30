import { useNavigate, useRouteError } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/AlertDialog/alert-dialog'
import { routesName } from '@/shared/configs/routes'

const ErrorBoundary = () => {
  const navigate = useNavigate()
  const error = useRouteError()

  let message = 'Неизвестная ошибка'

  if (error instanceof Error) {
    message = error.message
  } else if (typeof error === 'string') {
    message = error
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error
  ) {
    message = String((error as any).message)
  }
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Непредвиденная ошибка</AlertDialogTitle>
          <AlertDialogDescription>
            Ошибка: <code>{message}</code>
            <br />
            Если подобное повторяется неоднократно, свяжитесь со службой
            поддержки приложения.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              navigate(routesName.home)
            }}>
            Перейти на домашнюю страницу
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              window.location.reload()
            }}>
            Перезагрузить страницу
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ErrorBoundary
