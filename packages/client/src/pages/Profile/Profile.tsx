import { useParams } from 'react-router-dom'

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <>
      <h1>Profile Page</h1>
      <p>ID: {id}</p>
    </>
  )
}

export default ProfilePage
