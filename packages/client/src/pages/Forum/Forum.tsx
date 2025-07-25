import styles from './Forum.module.scss'
import { useEffect, useRef, useState } from 'react'
import { TopicComponent } from '@/components/Forum/topic'
import CreateTopic from '@/components/Forum/createTopic'
import clsx from 'clsx'
import OpenTopic from '@/components/Forum/openTopic'

import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui'
import { routesName } from '@/shared/configs/routes'
import { Avatar, AvatarImage } from '@/shared/ui'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { axiosServer } from '@/shared/api/configs/axios'
import { Topic } from './Forum.type'

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
    ? `http://localhost:3001/yandex-api/resources${avatarLink}`
    : null

  useEffect(() => {
    const getTopics = async () => {
      const response = await axiosServer.get('/forum/topic')
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

  const test = () => {
    axiosServer.get('/')
  }

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
        <Button className={styles.topicCreateButton} onClick={test}>
          ghjdt
        </Button>

        <div className={styles.avatar}>
          <a href={`${routesName['profile']}/${me?.id}`}>
            <Avatar className={styles.avatarImg}>
              <AvatarImage src={avatar ? avatar : me?.avatar} alt="avatar" />
            </Avatar>
          </a>
        </div>
      </nav>

      <div className={styles.forumPanel}>
        <Button className={topicStyle} onClick={createDialog}>
          <TopicComponent topic={null} styles={styles} />
        </Button>
        <div className={styles.topicList} ref={topicContainerRef}>
          {forumTopics &&
            forumTopics.map(item => (
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
