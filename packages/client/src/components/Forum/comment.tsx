import { comment, me } from '@/pages/Forum/Forum.mock.ts'
import { dateFormatted } from './openTopic.tsx'

const Comment = (comment: comment) => {
  return (
    <div
      className={`comment ${me.id == comment.author.id ? 'me' : ''}`}
      key={comment.id}>
      <img
        src={comment.author.avatar}
        alt={comment.author.login}
        className="comment-avatar"
      />
      <div className="comment-content">
        <div
          className={`comment-bubble ${
            me.id == comment.author.id ? 'me' : ''
          }`}>
          <div className="comment-header">
            <span className="comment-author">
              {comment.author.first_name} {comment.author.second_name}
            </span>
            <span className="comment-separator">•</span>
            <span className="comment-date">
              {dateFormatted(comment.created)}
            </span>
          </div>
          <p className="comment-text">{comment.content}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment
