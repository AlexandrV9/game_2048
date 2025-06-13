import { Topic } from '@/pages/Forum/Forum.mock.ts'
import { dateFormatted } from './openTopic.tsx'

interface topicProps {
  topic?: Topic
  add?: boolean
  styles: CSSModuleClasses
}

export const TopicComponent = ({ topic, add = false, styles }: topicProps) => {
  return (
    <>
      {add ? (
        <span className={styles.topicTitle}>ДОБАВИТЬ</span>
      ) : (
        <div className={styles.topicInfo}>
          <h2 className={styles.topicTitle}>{topic?.topic}</h2>
          <div className={styles.topicMeta}>
            <div className={styles.authorInfo}>
              <img
                src={topic?.author.avatar}
                alt={topic?.author.login}
                className={styles.authorAvatar}
              />
              <span className={styles.authorName}>
                {topic?.author.firstName} {topic?.author.secondName}
              </span>
            </div>
            <div className={styles.dateInfo}>
              <img src="/Forum/calendar.svg" className={styles.calendarIcon} />
              <span>{dateFormatted((topic as Topic).created)}</span>
            </div>
          </div>
        </div>
      )}
      {!add && topic?.comments?.length ? (
        <>
          <img
            src="/Forum/message.svg"
            alt="messages"
            className={styles.messageIcon}
          />
          <span>{topic?.comments?.length}</span>
        </>
      ) : (
        ''
      )}
    </>
  )
}
