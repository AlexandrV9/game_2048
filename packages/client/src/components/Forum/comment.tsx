import { Comment, me } from '@/pages/Forum/Forum.mock.ts'
import { dateFormatted } from './openTopic.tsx'
import clsx from 'clsx'
import { routesName } from '@/core/Routes.tsx'

interface topicProps {
  comment: Comment
  styles: CSSModuleClasses
}

const CommentComponent = ({ comment, styles }: topicProps) => {
  const commentStyle = clsx(
    styles.comment,
    me.id == comment.author.id && styles.me
  )
  const bubbleStyle = clsx(
    styles.commentBubble,
    me.id == comment.author.id && styles.me
  )

  return (
    <div className={commentStyle} key={comment.id}>
      <a href={`${routesName['profile']}/${comment.author.id}`}>
        <img
          src={comment.author.avatar}
          alt={comment.author.login}
          className={styles.authorAvatar}
        />
      </a>
      <div className={styles.commentContent}>
        <div className={bubbleStyle}>
          <div className={styles.commentHeader}>
            <span className={styles.commentAuthor}>
              {comment.author.firstName} {comment.author.secondName}
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
