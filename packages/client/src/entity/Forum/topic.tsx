import { useEffect, useState } from 'react'

import { Author, Topic } from '@/pages/Forum/Forum.type'
import { dateFormatted } from './openTopic'
import messageImage from '../../shared/assets/Forum/message.svg'
import calendarImage from '../../shared/assets/Forum/calendar.svg'
import { UserService } from '@/shared/api/services/user'

interface topicProps {
  topic: Topic | null
  add?: boolean
  styles: CSSModuleClasses
}

export const TopicComponent = ({ topic, styles }: topicProps) => {
  const [author, setAuthor] = useState<Author | null>(null)

  useEffect(() => {
    const postAuthor = async () => {
      const authorPost = await UserService.searchUser({
        login: topic?.author as string,
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
                src={author?.avatar}
                alt={author?.login}
                className={styles.authorAvatar}
              />
              <span className={styles.authorName}>
                {author?.first_name} {author?.second_name}
              </span>
            </div>
            <div className={styles.dateInfo}>
              <img
                src={calendarImage}
                className={styles.calendarIcon}
                alt="calendar"
              />
              <span>{dateFormatted(new Date((topic as Topic).created))}</span>
            </div>
          </div>
        </div>
      )}
      {topic && topic.comments?.length ? (
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
