import { Button } from '@/components/ui/button.js'
import { Textarea } from '@/components/ui/textarea.tsx'
import { me, topic } from '@/pages/Forum/Forum.mock.ts'
import { FormEvent, useEffect } from 'react'
import { Root } from 'react-dom/client'

const CreateTopic: React.FC<{
  rootTopic: Root
  forumTopics: topic[]
  setForumTopics: React.Dispatch<React.SetStateAction<topic[]>>
}> = ({ rootTopic, forumTopics, setForumTopics }) => {
  const closeDialog = () => {
    rootTopic.render('')
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDialog()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const createTopic = (data: FormEvent<HTMLFormElement>) => {
    const form = data.currentTarget as HTMLFormElement
    const topicInput = form.elements[0] as HTMLTextAreaElement

    const newTopic: topic = {
      id: forumTopics.length + 1,
      topic: topicInput.value,
      author: me,
      created: new Date(),
      comments: [],
    }
    setForumTopics((prevTopics: topic[]) => [newTopic, ...prevTopics])
    rootTopic.render('')
  }

  return (
    <div className="create-topic">
      <button className="close-window" onClick={closeDialog} />
      <form
        className="create-topic-dialog"
        onSubmit={data => createTopic(data)}>
        <Textarea
          placeholder="Введите тему ..."
          className="topic-create-title"
          maxLength={2000}
        />
        <Button className="topic-create-button">СОЗДАТЬ</Button>
      </form>
    </div>
  )
}

export default CreateTopic
