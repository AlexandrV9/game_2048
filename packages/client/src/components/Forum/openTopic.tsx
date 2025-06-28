import { Comment, me, Topic } from '@/pages/Forum/Forum.mock.ts'
import { FormEvent, useEffect, useRef, useState } from 'react'
import CommentComponent from './comment.tsx'
import { routesName } from '@/shared/configs/routes.ts'
import calendarImage from '../../shared/assets/Forum/calendar.svg'
import sendImage from '../../shared/assets/Forum/sendButton.svg'

export const dateFormatted = (date: Date): string => {
  const day = date.getDate().toString()
  const month = date.toLocaleString('RU-ru', { month: 'long' })
  const year = date.getFullYear().toString()
  const hour = date.getHours().toString()
  const minutes = date.getMinutes().toString()
  return `${day} ${month} ${year}, ${hour}:${minutes}`
}

const OpenTopic: React.FC<{
  topic: Topic
  forumTopics: Topic[]
  setForumTopics: React.Dispatch<React.SetStateAction<Topic[]>>
  styles: CSSModuleClasses
  closeDialog: () => void
}> = ({ topic, forumTopics, setForumTopics, styles, closeDialog }) => {
  const thisTopic = forumTopics.find(item => item.id == topic.id) as Topic
  const [commentsTopic, setCommentsTopic] = useState(thisTopic.comments)
  const commentsContainerRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

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

    if (!inputRef.current?.value) return

    const newComment: Comment = {
      id: commentsTopic.length + Math.random() * 100,
      content: inputRef.current?.value,
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
    if (inputRef.current) {
      inputRef.current.value = ''
    }
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
                  src={calendarImage}
                  className={styles.calendarIcon}
                  alt="calendar"
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
              rows={3}
              ref={inputRef}></textarea>
            <button className={styles.sendBtn} type="submit">
              <img src={sendImage} alt="sendButton" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OpenTopic
