import { Card } from '@/shared/ui'

export const PendingPage = () => {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <Card.Root>
        <Card.Content className="flex flex-col items-center gap-[20px]">
          <p className="leading-5">Загрузка</p>
        </Card.Content>
      </Card.Root>
    </div>
  )
}
