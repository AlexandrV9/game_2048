import { useEffect, useState } from 'react'
import emojiImage from '../../shared/assets/Forum/emoji.svg'
import { ForumService } from '@/shared/api/services/forum'
import { EmojiObj, Topic, TopicEmojiList } from '@/pages/Forum/Forum.type'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/common/selectors'

interface reactionsProps {
  topic: Topic
  styles: CSSModuleClasses
}

export const Reactions = ({ styles, topic }: reactionsProps) => {
  const userInfo = useSelector(selectUser)
  const [isOpenEmojiList, setOpenEmojiList] = useState(false)
  const [emojiList, setEmojiList] = useState<EmojiObj[]>([])
  const [emojiData, setEmojiData] = useState<TopicEmojiList>({})

  const handleClickEmoji = async (emojiId: number) => {
    if (userInfo) {
      const reactions = await ForumService.addReaction({
        topicId: topic.id,
        emojiId,
        user: userInfo.login,
      })
      if (reactions.data) {
        setEmojiData(reactions.data)
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (topic?.reactions) setEmojiData(topic.reactions)

      const resEmojis = await ForumService.getEmojiList()
      setEmojiList(resEmojis.data || [])
      console.log(emojiList)
    }

    fetchData()
  }, [topic])

  useEffect(() => {
    topic?.reactions && setEmojiData(topic.reactions)
    console.log(emojiData)
  }, [])

  return (
    <div className={styles.reactionsContainer}>
      <div className={styles.reactionsInfoContainer}>
        {emojiData && (
          <div className={styles.emojiInfoListContainer}>
            {Object.entries(emojiData).map(([id, { code, count }]) => (
              <div
                key={id}
                className={styles.emojiInfoContainer}
                onClick={() => handleClickEmoji(Number(id))}>
                <p>{code}</p>
                <p>{count}</p>
              </div>
            ))}
          </div>
        )}

        <button
          className={styles.emojiButton}
          onClick={() => setOpenEmojiList(!isOpenEmojiList)}>
          <img src={emojiImage} alt="emoji" className={styles.emojiIcon} />
        </button>
      </div>

      {isOpenEmojiList && (
        <div className={styles.reactionsList}>
          {emojiList.map(emoji => (
            <button
              key={emoji.id}
              className={styles.reactionButton}
              onClick={() => handleClickEmoji(emoji.id)}>
              {emoji.code}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
