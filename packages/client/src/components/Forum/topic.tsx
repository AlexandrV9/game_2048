import { Topic } from '@/pages/Forum/Forum.mock.ts'
import { dateFormatted } from './openTopic.tsx'
import messageImage from '../../shared/assets/Forum/message.svg'
import calendarImage from '../../shared/assets/Forum/calendar.svg'

interface topicProps {
  topic: Topic | null
  add?: boolean
  styles: CSSModuleClasses
}

export const TopicComponent = ({ topic, styles }: topicProps) => {
  return (
    <>
      {!topic ? (
        <span className={styles.topicTitle}>ДОБАВИТЬ</span>
      ) : (
        <div className={styles.topicInfo}>
          <h2 className={styles.topicTitle}>{topic?.topic}</h2>
          <div className={styles.topicMeta}>
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
            <div className={styles.dateInfo}>
              <img src={calendarImage} className={styles.calendarIcon} />
              <span>{dateFormatted((topic as Topic).created)}</span>
            </div>
          </div>
        </div>
      )}
      {topic && topic.comments.length ? (
        <>
          <img
            src={messageImage}
            alt="messages"
            className={styles.messageIcon}
          />
          <span>{topic.comments.length}</span>
        </>
      ) : null}
    </>
  )
}
