import clsx from 'clsx'
import { useSelector } from 'react-redux'

import { Author, Comment } from '@/pages/Forum/Forum.type'
import { dateFormatted } from './openTopic'
import { routesName } from '@/shared/configs/routes'
import { RootState } from '@/app/store'
import { serverApi } from '@/shared/api/core/BaseAPI'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    const postAuthor = async () => {
      const authorPost = await serverApi.post('/yandex-api/user/search', {
        login: comment.authorLogin,
      })
      const authorData: Author = authorPost.data as Author
      setAuthor({
        id: authorData.id,
        first_name: authorData.first_name,
        second_name: authorData.second_name,
        login: authorData.login,
        email: authorData.email,
        phone: authorData.phone,
        avatar: `http://localhost:3001/yandex-api/resources${authorData.avatar}`,
        display_name: authorData.display_name,
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

  return (
    <div className={commentStyle}>
      <a href={`${routesName['profile']}/${author?.id}`}>
        <img
          src={author?.avatar}
          alt={author?.login}
          className={styles.authorAvatar}
        />
      </a>
      <div className={styles.commentContent}>
        <div className={bubbleStyle}>
          <div className={styles.commentHeader}>
            <span className={styles.commentAuthor}>
              {author?.first_name} {author?.second_name}
            </span>
            <span className={styles.commentSeparator}>•</span>
            <span className={styles.commentDate}>
              {dateFormatted(comment.created)}
            </span>
          </div>
          <p className={styles.commentText}>{comment.content}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentComponent
