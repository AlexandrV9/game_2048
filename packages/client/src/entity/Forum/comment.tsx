import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

import { Author, Comment } from '@/pages/Forum/Forum.type'
import { dateFormatted } from './openTopic'
import { routesName } from '@/shared/configs/routes'
import { RootState } from '@/app/store'
import { Button } from '@/shared/ui'
import { ForumService } from '@/shared/api/services/forum'
import { UserService } from '@/shared/api/services/user'

interface topicProps {
  comment: Comment
  styles: CSSModuleClasses
}

const CommentComponent: React.FC<topicProps> = ({
  comment,
  styles,
}: topicProps) => {
  const me = useSelector((state: RootState) => state.user).user
  const [author, setAuthor] = useState<Author | null>(null)
  const [replies, setReplies] = useState<Comment[] | undefined>(comment.replies)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const postAuthor = async () => {
      const authorPost = await UserService.searchUser({
        login: comment.authorLogin,
      })
      const authorData: Author[] = authorPost.data as Author[]
      setAuthor({
        id: authorData[0].id,
        first_name: authorData[0].first_name,
        second_name: authorData[0].second_name,
        login: authorData[0].login,
        email: authorData[0].email,
        phone: authorData[0].phone,
        avatar: `${import.meta.env.VITE_AVATAR_URL}${authorData[0].avatar}`,
        display_name: authorData[0].display_name,
      })
    }
    void postAuthor()
  }, [])

  const commentStyle = clsx(
    styles.comment,
    me?.login === comment.authorLogin && styles.me
  )
  const bubbleStyle = clsx(
    styles.commentBubble,
    me?.login === comment.authorLogin && styles.me
  )

  const handleReplySubmit = async (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault()

    if (!inputRef.current?.value) return

    const createReply = await ForumService.createReply({
      commentId: comment.id,
      content: inputRef.current?.value,
      authorLogin: me?.login as string,
    })
    const replyData = createReply.data
    const authorReply = await UserService.searchUser({
      login: replyData.authorLogin,
    })
    const authorData: Author[] = authorReply.data as Author[]
    const newReply: Comment = {
      id: Number(replyData.id),
      content: replyData.content,
      authorLogin: replyData.authorLogin,
      created: new Date(replyData.created),
      author: authorData[0],
    }
    replies
      ? setReplies((prevReplies: Comment[] | undefined) => [
          ...(prevReplies as Comment[]),
          newReply,
        ])
      : setReplies([newReply])
    comment.replies?.push(newReply)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const clickShowReplies = () => {
    setShowReplies(!showReplies)
    const getReplies = async () => {
      setIsLoading(true)
      const replyGet = await ForumService.getReply({
        commentId: comment.id,
      })
      const readyReply: Comment[] = []
      for (const index in replyGet.data) {
        replyGet.data[index]
        const authorReply = await UserService.searchUser({
          login: replyGet.data[index].authorLogin,
        })
        const authorData: Author[] = authorReply.data as Author[]
        readyReply.push({
          id: Number(replyGet.data[index].id),
          content: replyGet.data[index].content,
          authorLogin: replyGet.data[index].authorLogin,
          created: new Date(replyGet.data[index].created),
          author: authorData[0],
        })
      }
      setReplies(readyReply)
      return
    }
    !showReplies &&
      void getReplies().finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className={commentStyle}>
        <div className={styles.commentContent}>
          <div className={bubbleStyle}>
            <div className={styles.commentHeader}>
              <a href={`${routesName['profile']}/${author?.id}`}>
                <img
                  src={author?.avatar}
                  alt={author?.login}
                  className={styles.authorAvatar}
                />
              </a>
              <span className={styles.commentAuthor}>
                {author?.first_name} {author?.second_name}
              </span>
              <span className={styles.commentSeparator}>•</span>
              <span className={styles.commentDate}>
                {dateFormatted(new Date(comment.created))}
              </span>
            </div>
            <p className={styles.commentText}>{comment.content}</p>
          </div>
        </div>
      </div>

      <div
        className={clsx([
          styles.replySection,
          me?.login === comment.authorLogin && styles.me,
        ])}>
        <Button
          type="button"
          onClick={() => setShowReplyForm(!showReplyForm)}
          className={styles.actionButton}>
          Ответить
        </Button>

        <Button
          onClick={clickShowReplies}
          className={clsx([styles.actionButton, styles.toggleReplies])}>
          {showReplies ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          ответы ({comment.replies?.length})
        </Button>
      </div>
      {isLoading ? (
        <div className={clsx(me?.login === comment.authorLogin && styles.me)}>
          Загрузка...
        </div>
      ) : null}

      {showReplies &&
        replies?.map(reply => {
          return (
            <div
              className={clsx([
                styles.comment,
                me?.login === comment.authorLogin && styles.me,
              ])}
              key={reply.id}>
              <div
                className={
                  me?.login === comment.authorLogin
                    ? styles.levelRight
                    : styles.levelLeft
                }>
                <div className={styles.commentContent}>
                  <div className={styles.commentBubble}>
                    <div className={styles.commentHeader}>
                      <a href={`${routesName['profile']}/${reply.author?.id}`}>
                        <img
                          src={`${import.meta.env.VITE_AVATAR_URL}${
                            reply.author?.avatar
                          }`}
                          alt={reply.author?.login}
                          className={styles.authorAvatar}
                        />
                      </a>
                      <span className={styles.commentAuthor}>
                        {reply.author?.first_name} {reply.author?.second_name}
                      </span>
                      <span className={styles.commentSeparator}>•</span>
                      <span className={styles.commentDate}>
                        {dateFormatted(new Date(reply.created))}
                      </span>
                    </div>
                    <p className={styles.commentText}>{reply.content}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

      {showReplyForm && (
        <div className={clsx([styles.replyForm])}>
          <form onSubmit={handleReplySubmit}>
            <div className={styles.replyInputContainer}>
              <textarea
                placeholder={`Ответить ${author?.first_name}...`}
                className={styles.replyInput}
                rows={2}
                ref={inputRef}
              />
            </div>
            <div className={styles.replyActions}>
              <Button
                type="button"
                onClick={() => setShowReplyForm(false)}
                className={styles.cancelButton}>
                Отмена
              </Button>
              <button type="submit" className={styles.submitButton}>
                Ответить
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default CommentComponent
