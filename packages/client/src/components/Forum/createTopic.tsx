import { Button } from '@/components/ui/button.js'
import { me, Topic } from '@/pages/Forum/Forum.mock.ts'
import { FormEvent, useEffect, useRef } from 'react'

const CreateTopic: React.FC<{
  forumTopics: Topic[]
  setForumTopics: React.Dispatch<React.SetStateAction<Topic[]>>
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

  const createTopic = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault()

    if (!inputRef.current?.value) return

    const newTopic: Topic = {
      id: forumTopics.length + Math.random() * 100,
      topic: inputRef.current?.value,
      author: me,
      created: new Date(),
      comments: [],
    }
    setForumTopics((prevTopics: Topic[]) => [newTopic, ...prevTopics])
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
