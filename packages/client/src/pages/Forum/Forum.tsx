import styles from './Forum.module.scss'
import { useEffect, useRef, useState } from 'react'
import { TopicComponent } from '@/entity/Forum/topic'
import CreateTopic from '@/entity/Forum/createTopic'
import clsx from 'clsx'
import OpenTopic from '@/entity/Forum/openTopic'
import { forumTopicsMock, me, Topic } from './Forum.mock'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui'
import { routesName } from '@/shared/configs/routes'
import { Avatar, AvatarImage } from '@/shared/ui'
import { useNotification } from '@/shared/hooks/useNotification'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

const ForumPage = () => {
  const [forumTopics, setForumTopics] = useState(forumTopicsMock)
  const [isVisible, setIsVisible] = useState(false)
  const [openedTopic, setOpenedTopic] = useState<Topic | null>(null)
  const [dialogState, setDialogState] = useState<'create' | 'open' | null>(null)
  const topicContainerRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const avatarLink = useSelector((state: RootState) => state.user).user?.avatar
  const avatar = avatarLink
    ? `https://${import.meta.env.VITE_BASE_API_URL}/resources/${avatarLink}`
    : null

  useNotification()

  useEffect(() => {
    if (topicContainerRef.current) {
      topicContainerRef.current.scrollTo(0, 0)
    }
  }, [forumTopics])

  const closeDialog = () => {
    setIsVisible(false)
    setDialogState(null)
  }

  const createDialog = () => {
    setIsVisible(true)
    setDialogState('create')
  }

  const openDialog = (topic: Topic) => {
    setIsVisible(true)
    setDialogState('open')
    setOpenedTopic(topic)
  }

  const topicStyle = clsx(styles.topic, styles.add)

  return (
    <div className={styles.forum}>
      <div className={styles.hoverTrigger}></div>
      <Button
        className={styles.backButton}
        onClick={() => {
          navigate(-1)
        }}>
        back
      </Button>

      <nav>
        <h2>ФОРУМ</h2>

        <div className={styles.avatar}>
          <a href={`${routesName['profile']}/${me.id}`}>
            <Avatar className={styles.avatarImg}>
              <AvatarImage src={avatar ? avatar : me.avatar} alt="avatar" />
            </Avatar>
          </a>
        </div>
      </nav>

      <div className={styles.forumPanel}>
        <Button className={topicStyle} onClick={createDialog}>
          <TopicComponent topic={null} styles={styles} />
        </Button>
        <div className={styles.topicList} ref={topicContainerRef}>
          {forumTopics.map(item => (
            <Button
              className={styles.topic}
              onClick={() => openDialog(item)}
              key={item.id}>
              <TopicComponent topic={item} styles={styles} />
            </Button>
          ))}
        </div>
      </div>
      <div className={clsx(styles.plugTopic, isVisible ? '' : 'hidden')}>
        {dialogState === 'create' && (
          <CreateTopic
            forumTopics={forumTopics}
            setForumTopics={setForumTopics}
            styles={styles}
            closeDialog={closeDialog}
          />
        )}

        {dialogState === 'open' && openedTopic && (
          <OpenTopic
            topic={openedTopic}
            forumTopics={forumTopics}
            setForumTopics={setForumTopics}
            styles={styles}
            closeDialog={closeDialog}
          />
        )}
      </div>
    </div>
  )
}

export default ForumPage
