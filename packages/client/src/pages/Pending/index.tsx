import { Card } from '@/shared/ui'
import { ScaleLoader } from 'react-spinners'

export const PendingPage = () => {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <Card.Root>
        <Card.Content className="flex flex-col items-center gap-[20px]">
          <ScaleLoader />
          <p className="leading-5">Загрузка</p>
        </Card.Content>
      </Card.Root>
    </div>
  )
}
