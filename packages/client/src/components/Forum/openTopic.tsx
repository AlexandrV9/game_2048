import { comment, me, topic } from '@/pages/Forum/Forum.mock.ts'
import { FormEvent, useEffect, useState } from 'react'
import { Root } from 'react-dom/client'
import Comment from './comment.tsx'

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
  topic: topic
  forumTopics: topic[]
  setForumTopics: React.Dispatch<React.SetStateAction<topic[]>>
}> = ({ rootTopic, topic, forumTopics, setForumTopics }) => {
  const thisTopic = forumTopics.find(item => item.id == topic.id) as topic
  const [commentsTopic, setCommentsTopic] = useState(thisTopic.comments)

  const closeDialog = () => {
    rootTopic.render('')
  }

  useEffect(() => {
    const dialogContainer =
      document.getElementsByClassName('comments-section')[0]
    dialogContainer.scrollTo(0, dialogContainer.scrollHeight)
  }, [commentsTopic])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDialog()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const createComment = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault()
    const form = data.currentTarget as HTMLFormElement
    const commentInput = form.elements[0] as HTMLTextAreaElement

    const newComment: comment = {
      id: comments.length + 1,
      content: commentInput.value,
      author: me,
      created: new Date(),
    }
    setCommentsTopic((prevComments: comment[]) => [...prevComments, newComment])
    setForumTopics((prevTopics: topic[]) => {
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

  const comments: JSX.Element[] = []
  commentsTopic.map(item => {
    comments.push(<Comment {...item} key={item.id} />)
  })

  return (
    <div className="open-topic">
      <button className="close-window" onClick={closeDialog} />
      <div className="open-topic-dialog">
        <div className="dialog-header">
          <div className="topic-info">
            <h2 className="topic-title">{topic.topic}</h2>
            <div className="topic-meta">
              <div className="author-info">
                <img
                  src={topic.author.avatar}
                  alt={topic.author.login}
                  className="author-avatar"
                />
                <span className="author-name">
                  {topic.author.first_name} {topic.author.second_name}
                </span>
              </div>
              <div className="date-info">
                <img src="/calendar.svg" className="calendar-icon" />
                <span>{dateFormatted(topic.created)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="comments-section">{comments}</div>

        <div className="comment-input-section">
          <img src={me.avatar} alt={me.login} className="input-avatar" />
          <form
            className="input-container"
            onSubmit={data => {
              createComment(data)
            }}>
            <textarea
              className="comment-input"
              placeholder="Написать комментарий..."
              rows={3}></textarea>
            <button className="send-btn" type="submit">
              <img src="/sendButton.svg" alt="sendButton" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OpenTopic
