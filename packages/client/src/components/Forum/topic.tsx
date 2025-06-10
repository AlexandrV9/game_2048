import { topic } from '@/pages/Forum/Forum.mock.ts'
import { createRoot, Root } from 'react-dom/client'
import CreateTopic from './createTopic.tsx'
import OpenTopic from './openTopic.tsx'
import { Button } from '../ui/button.tsx'

let rootTopic: Root

interface topicProps {
  topic?: topic
  id: string
  add?: boolean
  forumTopics: topic[]
  setForumTopics: React.Dispatch<React.SetStateAction<topic[]>>
}

export const Topic = ({
  topic,
  id,
  add = false,
  forumTopics,
  setForumTopics,
}: topicProps) => {
  const createDialog = () => {
    if (add) {
      if (!rootTopic)
        rootTopic = createRoot(document.getElementsByClassName('plug-topic')[0])
      rootTopic.render(
        <CreateTopic
          rootTopic={rootTopic}
          forumTopics={forumTopics}
          setForumTopics={setForumTopics}
        />
      )
    } else {
      if (!rootTopic)
        rootTopic = createRoot(document.getElementsByClassName('plug-topic')[0])
      rootTopic.render(
        <OpenTopic
          rootTopic={rootTopic}
          topic={topic as topic}
          forumTopics={forumTopics}
          setForumTopics={setForumTopics}
        />
      )
    }
  }

  return (
    <Button
      className={`topic ${add ? 'add' : ''}`}
      onClick={createDialog}
      id={id}
      key={id}>
      <span className="topic-title">{add ? 'ДОБАВИТЬ' : topic?.topic}</span>
      {!add && topic?.comments?.length ? (
        <>
          <img src="/message.svg" alt="messages" className="message-icon" />
          <span>{topic?.comments?.length}</span>
        </>
      ) : (
        ''
      )}
    </Button>
  )
}
