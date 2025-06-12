import { Topic } from '@/pages/Forum/Forum.mock.ts'
import { createRoot, Root } from 'react-dom/client'
import CreateTopic from './createTopic.tsx'
import OpenTopic, { dateFormatted } from './openTopic.tsx'
import { Button } from '../ui/button.tsx'
import clsx from 'clsx'

let rootTopic: Root

interface topicProps {
  topic?: Topic
  id: string
  add?: boolean
  forumTopics: Topic[]
  setForumTopics: React.Dispatch<React.SetStateAction<Topic[]>>
  styles: CSSModuleClasses
}

export const TopicComponent = ({
  topic,
  id,
  add = false,
  forumTopics,
  setForumTopics,
  styles,
}: topicProps) => {
  const createDialog = () => {
    if (!rootTopic)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      rootTopic = createRoot(document.getElementById('plug_topic')!)
    if (add) {
      rootTopic.render(
        <CreateTopic
          rootTopic={rootTopic}
          forumTopics={forumTopics}
          setForumTopics={setForumTopics}
          styles={styles}
        />
      )
    } else {
      rootTopic.render(
        <OpenTopic
          rootTopic={rootTopic}
          topic={topic as Topic}
          forumTopics={forumTopics}
          setForumTopics={setForumTopics}
          styles={styles}
        />
      )
    }
  }

  const commentStyle = clsx(styles.topic, add && styles.add)

  return (
    <Button className={commentStyle} onClick={createDialog} id={id} key={id}>
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
    </Button>
  )
}
