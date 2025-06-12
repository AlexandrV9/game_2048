import { Button } from '@/components/ui/button.js'
import { Textarea } from '@/components/ui/textarea.tsx'
import { me, Topic } from '@/pages/Forum/Forum.mock.ts'
import { FormEvent, useEffect } from 'react'
import { Root } from 'react-dom/client'

const CreateTopic: React.FC<{
  rootTopic: Root
  forumTopics: Topic[]
  setForumTopics: React.Dispatch<React.SetStateAction<Topic[]>>
  styles: CSSModuleClasses
}> = ({ rootTopic, forumTopics, setForumTopics, styles }) => {
  const closeDialog = () => {
    rootTopic.render('')
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDialog()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const createTopic = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault()

    const form = data.currentTarget as HTMLFormElement
    const topicInput = form.elements[0] as HTMLTextAreaElement

    if (!topicInput.value) return

    const newTopic: Topic = {
      id: forumTopics.length + 1,
      topic: topicInput.value,
      author: me,
      created: new Date(),
      comments: [],
    }
    setForumTopics((prevTopics: Topic[]) => [newTopic, ...prevTopics])
    rootTopic.render('')

    topicInput.value = ''
  }

  return (
    <div className={styles.createTopic}>
      <button className={styles.closeWindow} onClick={closeDialog} />
      <form
        className={styles.createTopicDialog}
        onSubmit={data => createTopic(data)}>
        <Textarea
          placeholder="Введите тему ..."
          className={styles.topicCreateTitle}
          maxLength={2000}
        />
        <Button className={styles.topicCreateButton}>СОЗДАТЬ</Button>
      </form>
    </div>
  )
}

export default CreateTopic
