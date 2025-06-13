import { Button } from '@/components/ui/button.js'
import styles from './Forum.module.scss'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { routesName } from '@/core/Routes.js'
import { useEffect, useRef, useState } from 'react'
import { TopicComponent } from '@/components/Forum/topic.tsx'
import CreateTopic from '@/components/Forum/createTopic.tsx'
import clsx from 'clsx'
import OpenTopic from '@/components/Forum/openTopic.tsx'

import { forumTopicsMock, me, Topic } from './Forum.mock.ts'

const ForumPage = () => {
  const [forumTopics, setForumTopics] = useState(forumTopicsMock)
  const [thisTopic, setThisTopic] = useState(<></>)
  const [isVisible, setIsVisible] = useState(false)
  const topicContainerRef = useRef<HTMLDivElement | null>(null)
  const plugContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isVisible) {
      plugContainerRef.current?.classList.remove('hidden')
      setIsVisible(false)
    } else {
      plugContainerRef.current?.classList.add('hidden')
      setIsVisible(true)
    }
  }, [thisTopic])

  useEffect(() => {
    if (topicContainerRef.current) {
      topicContainerRef.current.scrollTo(0, 0)
    }
  }, [forumTopics])

  const closeDialog = () => {
    setThisTopic(<></>)
  }

  const createDialog = () => {
    setThisTopic(
      <CreateTopic
        forumTopics={forumTopics}
        setForumTopics={setForumTopics}
        styles={styles}
        closeDialog={closeDialog}
      />
    )
  }

  const openDialog = (topic: Topic) => {
    setThisTopic(
      <OpenTopic
        topic={topic as Topic}
        forumTopics={forumTopics}
        setForumTopics={setForumTopics}
        styles={styles}
        closeDialog={closeDialog}
      />
    )
  }

  const topicStyle = clsx(styles.topic, styles.add)

  return (
    <div className={styles.forum}>
      <div className={styles.hoverTrigger}></div>
      <Button
        className={styles.backButton}
        onClick={() => {
          history.back()
        }}>
        back
      </Button>

      <nav>
        <h2>ФОРУМ</h2>
        <div className={styles.avatar}>
          <Avatar>
            <a href={`${routesName['profile']}/${me.id}`}>
              <AvatarImage src={me.avatar} alt="avatar" />
            </a>
          </Avatar>
        </div>
      </nav>

      <div className={styles.forumPanel}>
        <Button className={topicStyle} onClick={createDialog}>
          <TopicComponent add={true} styles={styles} />
        </Button>
        <div
          className={styles.topicList}
          ref={topicContainerRef}
          key="topic_list">
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
      <div className={styles.plugTopic} ref={plugContainerRef} id="plug_topic">
        {thisTopic}
      </div>
    </div>
  )
}

export default ForumPage
