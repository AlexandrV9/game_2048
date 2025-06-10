import { Button } from '@/components/ui/button.js'
import './Forum.scss'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { routesName } from '@/core/Routes.js'
import { useEffect, useState } from 'react'

import { forumTopicsMock, me } from './Forum.mock.ts'
import { Topic } from '@/components/Forum/topic.tsx'

const ForumPage: React.FC = () => {
  document.getElementsByTagName('title')[0].textContent = 'Форум'
  const [forumTopics, setForumTopics] = useState(forumTopicsMock)

  useEffect(() => {
    const topicContainer = document.getElementsByClassName('topic-list')[0]
    topicContainer.scrollTo(0, 0)
  }, [forumTopics])

  const topics: JSX.Element[] = []
  forumTopics.map(item => {
    topics.push(
      <Topic
        topic={item}
        id={String(item.id)}
        forumTopics={forumTopics}
        setForumTopics={setForumTopics}
        key={item.id}
      />
    )
  })

  return (
    <div className="forum">
      <div className="hover-trigger"></div>
      <Button
        className="back-button"
        onClick={() => {
          history.back()
        }}>
        back
      </Button>

      <nav>
        <h2>ФОРУМ</h2>
        <div className="avatar">
          <Avatar>
            <a href={`${routesName['profile']}/${me.id}`}>
              <AvatarImage src={me.avatar} alt="avatar" />
            </a>
          </Avatar>
        </div>
      </nav>

      <div className="forum-panel">
        <Topic
          id={'btn-add'}
          add={true}
          forumTopics={forumTopics}
          setForumTopics={setForumTopics}
        />
        <div className="topic-list" id="topic_list" key="topic_list">
          {topics}
        </div>
      </div>
      <div className="plug-topic"></div>
    </div>
  )
}

export default ForumPage
