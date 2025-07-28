import { FormEvent, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { Button } from '@/shared/ui'
import { RootState } from '@/app/store'
import { Topic } from '@/pages/Forum/Forum.type'
import { ForumService } from '@/shared/api/services/forum'

interface TopicData {
  author: string
  created: Date
  id: number
  topic: string
}

const CreateTopic: React.FC<{
  forumTopics: Topic[] | null
  setForumTopics: React.Dispatch<React.SetStateAction<Topic[] | null>>
  styles: CSSModuleClasses
  closeDialog: () => void
}> = ({ forumTopics, setForumTopics, styles, closeDialog }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDialog()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const userLogin = useSelector((state: RootState) => state.user).user?.login

  const createTopic = async (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault()

    if (!inputRef.current?.value) return

    const createTopic = await ForumService.createTopic({
      topic: inputRef.current?.value,
      author: userLogin as string,
      created: new Date(),
      comments: [],
    })
    const topicData: TopicData = createTopic.data as TopicData

    const newTopic: Topic = {
      id: Number(topicData.id),
      topic: topicData.topic,
      author: topicData.author,
      created: topicData.created,
      comments: [],
    }

    forumTopics
      ? setForumTopics((prevTopics: Topic[] | null) => [
          newTopic,
          ...(prevTopics as Topic[]),
        ])
      : setForumTopics(() => [newTopic])
    closeDialog()
  }

  return (
    <div className={styles.createTopic}>
      <button className={styles.closeWindow} onClick={closeDialog} />
      <form
        className={styles.createTopicDialog}
        onSubmit={data => createTopic(data)}>
        <textarea
          placeholder="Введите тему ..."
          className={styles.topicCreateTitle}
          maxLength={2000}
          ref={inputRef}
        />
        <Button className={styles.topicCreateButton}>СОЗДАТЬ</Button>
      </form>
    </div>
  )
}

export default CreateTopic
