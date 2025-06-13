import { Comment, me, Topic } from '@/pages/Forum/Forum.mock.ts'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Root } from 'react-dom/client'
import CommentComponent from './comment.tsx'
import { routesName } from '@/core/Routes.tsx'

export const dateFormatted = (date: Date): string => {
  const day = date.getDay().toString()
  const month = date.toLocaleString('RU-ru', { month: 'long' })
  const year = date.getFullYear().toString()
  const hour = date.getHours().toString()
  const minutes = date.getMinutes().toString()
  return `${day} ${month} ${year}, ${hour}:${minutes}`
}

const OpenTopic: React.FC<{
  rootTopic: Root
  topic: Topic
  forumTopics: Topic[]
  setForumTopics: React.Dispatch<React.SetStateAction<Topic[]>>
  styles: CSSModuleClasses
}> = ({ rootTopic, topic, forumTopics, setForumTopics, styles }) => {
  const thisTopic = forumTopics.find(item => item.id == topic.id) as Topic
  const [commentsTopic, setCommentsTopic] = useState(thisTopic.comments)
  const commentsContainerRef = useRef<HTMLDivElement | null>(null)

  const closeDialog = () => {
    rootTopic.render('')
  }

  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTo(
        0,
        commentsContainerRef.current.scrollHeight
      )
    }
  }, [commentsTopic])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDialog()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const createComment = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault()
    const form = data.currentTarget as HTMLFormElement
    const commentInput = form.elements[0] as HTMLTextAreaElement

    if (!commentInput.value) return

    const newComment: Comment = {
      id: commentsTopic.length + 1,
      content: commentInput.value,
      author: me,
      created: new Date(),
    }
    setCommentsTopic((prevComments: Comment[]) => [...prevComments, newComment])
    setForumTopics((prevTopics: Topic[]) => {
      return prevTopics.map(item => {
        if (item.id == thisTopic.id) {
          return {
            ...item,
            comments: [...item.comments, newComment],
          }
        }
        return item
      })
    })
    commentInput.value = ''
  }

  return (
    <div className={styles.openTopic}>
      <button className={styles.closeWindow} onClick={closeDialog} />
      <div className={styles.openTopicDialog}>
        <div className={styles.dialogHeader}>
          <div className={styles.topicInfo}>
            <h2 className={styles.topicTitle}>{topic.topic}</h2>
            <div className={styles.topicMeta}>
              <a href={`${routesName['profile']}/${topic.author.id}`}>
                <div className={styles.authorInfo}>
                  <img
                    src={topic.author.avatar}
                    alt={topic.author.login}
                    className={styles.authorAvatar}
                  />
                  <span className={styles.authorName}>
                    {topic.author.firstName} {topic.author.secondName}
                  </span>
                </div>
              </a>
              <div className={styles.dateInfo}>
                <img
                  src="/Forum/calendar.svg"
                  className={styles.calendarIcon}
                />
                <span>{dateFormatted(topic.created)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.commentsSection} ref={commentsContainerRef}>
          {commentsTopic.map(item => (
            <CommentComponent comment={item} styles={styles} key={item.id} />
          ))}
        </div>

        <div className={styles.commentInputSection}>
          <img src={me.avatar} alt={me.login} className={styles.inputAvatar} />
          <form
            className={styles.inputContainer}
            onSubmit={data => {
              createComment(data)
            }}>
            <textarea
              className={styles.commentInput}
              placeholder="Написать комментарий..."
              rows={3}></textarea>
            <button className={styles.sendBtn} type="submit">
              <img src="/Forum/sendButton.svg" alt="sendButton" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OpenTopic
