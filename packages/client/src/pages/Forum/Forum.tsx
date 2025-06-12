import { Button } from '@/components/ui/button.js'
import styles from './Forum.module.scss'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { routesName } from '@/core/Routes.js'
import { useEffect, useState } from 'react'

import { forumTopicsMock, me } from './Forum.mock.ts'
import { TopicComponent } from '@/components/Forum/topic.tsx'

const ForumPage = () => {
  const [forumTopics, setForumTopics] = useState(forumTopicsMock)

  useEffect(() => {
    const topicContainer = document.getElementById('topic_list')
    topicContainer?.scrollTo(0, 0)
  }, [forumTopics])

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
        <TopicComponent
          id={'btn-add'}
          add={true}
          forumTopics={forumTopics}
          setForumTopics={setForumTopics}
          styles={styles}
        />
        <div className={styles.topicList} id="topic_list" key="topic_list">
          {forumTopics.map(item => (
            <TopicComponent
              topic={item}
              id={String(item.id)}
              forumTopics={forumTopics}
              setForumTopics={setForumTopics}
              key={item.id}
              styles={styles}
            />
          ))}
        </div>
      </div>
      <div className={styles.plugTopic} id="plug_topic"></div>
      <div className={styles.plugTopic} id="plug_topic"></div>
    </div>
  )
}

export default ForumPage
