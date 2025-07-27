import { Author, Comment, Topic } from '@/pages/Forum/Forum.type'
import { FormEvent, useEffect, useRef, useState } from 'react'
import CommentComponent from './comment'
import { routesName } from '@/shared/configs/routes'
import calendarImage from '../../shared/assets/Forum/calendar.svg'
import sendImage from '../../shared/assets/Forum/sendButton.svg'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { serverApi } from '@/shared/api/core/BaseAPI'
import { axiosServer } from '@/shared/api/configs/axios'

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
  setForumTopics: React.Dispatch<React.SetStateAction<Topic[] | null>>
  styles: CSSModuleClasses
  closeDialog: () => void
}> = ({ topic, forumTopics, setForumTopics, styles, closeDialog }) => {
  const thisTopic = forumTopics.find(item => item.id == topic.id) as Topic
  const [commentsTopic, setCommentsTopic] = useState<Comment[] | undefined>(
    thisTopic.comments
  )
  const [author, setAuthor] = useState<Author | null>(null)
  const commentsContainerRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const me = useSelector((state: RootState) => state.user).user
  const avatarLink = me?.avatar
  const avatar = avatarLink
    ? `http://localhost:3001/yandex-api/resources${avatarLink}`
    : null

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

    const getComments = async () => {
      const response = await axiosServer.get(
        `/forum/topics/${thisTopic.id}/comments`
      )
      setCommentsTopic(response.data)
    }
    void getComments()

    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    const postAuthor = async () => {
      const authorPost = await serverApi.post('/yandex-api/user/search', {
        login: topic.author,
      })
      const authorData: Author[] = authorPost.data as Author[]
      setAuthor({
        id: authorData[0].id,
        first_name: authorData[0].first_name,
        second_name: authorData[0].second_name,
        login: authorData[0].login,
        email: authorData[0].email,
        phone: authorData[0].phone,
        avatar: `http://localhost:3001/yandex-api/resources${authorData[0].avatar}`,
        display_name: authorData[0].display_name,
      })
    }
    void postAuthor()
  }, [])

  const createComment = async (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault()

    if (!inputRef.current?.value) return
    const createComment = await axiosServer.post(
      `/forum/topics/${thisTopic.id}/comments`,
      {
        content: inputRef.current?.value,
        authorLogin: me?.login as string,
      }
    )
    const newComment: Comment = {
      id: createComment.data.id,
      content: createComment.data.content,
      authorLogin: createComment.data.authorLogin,
      created: createComment.data.created,
    }
    commentsTopic
      ? setCommentsTopic((prevComments: Comment[] | undefined) => [
          ...(prevComments as Comment[]),
          newComment,
        ])
      : setCommentsTopic(() => [newComment])
    setForumTopics((prevTopics: Topic[] | null) => {
      return (
        prevTopics &&
        prevTopics.map(item => {
          if (item.id == thisTopic.id) {
            return {
              ...item,
              comments: item.comments
                ? [...item.comments, newComment]
                : [newComment],
            }
          }
          return item
        })
      )
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
              <a href={`${routesName['profile']}/${author?.id}`}>
                <div className={styles.authorInfo}>
                  <img
                    src={author?.avatar}
                    alt={author?.login}
                    className={styles.authorAvatar}
                  />
                  <span className={styles.authorName}>
                    {author?.first_name} {author?.second_name}
                  </span>
                </div>
              </a>
              <div className={styles.dateInfo}>
                <img
                  src={calendarImage}
                  className={styles.calendarIcon}
                  alt="calendar"
                />
                <span>{dateFormatted(new Date(topic.created))}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.commentsSection} ref={commentsContainerRef}>
          {commentsTopic?.map(item => (
            <CommentComponent comment={item} styles={styles} key={item.id} />
          ))}
        </div>

        <div className={styles.commentInputSection}>
          <img
            src={avatar ? avatar : me?.avatar}
            alt={me?.login}
            className={styles.inputAvatar}
          />
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
