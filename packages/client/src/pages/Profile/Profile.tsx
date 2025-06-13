import { PageLayout } from '@/shared/layouts'
import { useParams } from 'react-router-dom'

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <PageLayout>
      <h1>Profile Page</h1>
      <p>ID: {id}</p>
    </PageLayout>
  )
}

export default ProfilePage
