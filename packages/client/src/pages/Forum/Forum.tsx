import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './Forum.module.scss'
import { TopicComponent } from '@/entity/Forum/topic'
import CreateTopic from '@/entity/Forum/createTopic'
import OpenTopic from '@/entity/Forum/openTopic'
import { Header } from '@/widgets'
import { useNotification } from '@/shared/hooks/useNotification'
import { Button } from '@/shared/ui'
import { routesName } from '@/shared/configs/routes'
import { Avatar, AvatarImage } from '@/shared/ui'
import { RootState } from '@/app/store'
import { Topic } from './Forum.type'
import { ForumService } from '@/shared/api/services/forum'
import { Reactions } from '@/entity/Forum/emoji'

const ForumPage = () => {
  const [forumTopics, setForumTopics] = useState<Topic[] | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openedTopic, setOpenedTopic] = useState<Topic | null>(null)
  const [dialogState, setDialogState] = useState<'create' | 'open' | null>(null)
  const topicContainerRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const me = useSelector((state: RootState) => state.user).user
  const avatarLink = me?.avatar
  const avatar = avatarLink
    ? `${import.meta.env.VITE_AVATAR_URL}${avatarLink}`
    : null

  useNotification()

  useEffect(() => {
    const getTopics = async () => {
      const response = await ForumService.getTopics()
      setForumTopics(response.data)
    }
    void getTopics()
  }, [])

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

      <Header />

      <div className="flex justify-center">
        <h1 className="text-3xl font-bold">Форум</h1>
      </div>

      <div className={styles.forumPanel}>
        <Button className={topicStyle} onClick={createDialog}>
          <TopicComponent topic={null} styles={styles} />
        </Button>
        <div className={styles.topicList} ref={topicContainerRef}>
          {forumTopics &&
            forumTopics.map(item => (
              <div key={item.id} className={styles.topicContainer}>
                <Button
                  className={styles.topic}
                  onClick={() => openDialog(item)}>
                  <TopicComponent topic={item} styles={styles} />
                </Button>

                <Reactions topic={item} styles={styles} />
              </div>
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

        {dialogState === 'open' && openedTopic && forumTopics && (
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
