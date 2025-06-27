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
} from '@/shared/ui/AlertDialog/alert-dialog.tsx'
import { routesName } from '@/shared/configs/routes.ts'

const ErrorBoundary = () => {
  const navigate = useNavigate()
  const error = useRouteError() as { message: string }
  return (
    <div>
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Непредвиденная ошибка</AlertDialogTitle>
            <AlertDialogDescription>
              Ошибка: <code>{error.message}</code>
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
                navigate('.', { replace: true })
              }}>
              Перезагрузить страницу
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ErrorBoundary
