import { useEffect, useState } from 'react'
import emojiImage from '../../shared/assets/Forum/emoji.svg'
import { ForumService } from '@/shared/api/services/forum'
import { Topic } from '@/pages/Forum/Forum.type'
import { UserService } from '@/shared/api/services/user'

interface reactionsProps {
  topic: Topic
  styles: CSSModuleClasses
}

const emosjis = ['😀', '😂', '😍', '😭', '😢', '🔥', '💯', '👍']

const getEmojiData = (emojiList: string[]) => {
  const emojiData: Record<string, number> = {}

  emojiList.forEach(emoji => {
    const emojiCount = emojiData[emoji]

    emojiData[emoji] = (emojiCount || 0) + 1
  })

  return Object.entries(emojiData)
}

export const Reactions = ({ styles, topic }: reactionsProps) => {
  const [isOpenEmojiList, setOpenEmojiList] = useState(false)
  const [emojiData, setEmojiData] = useState<Array<string>>([])

  const handleClickEmoji = async (emoji: string) => {
    setEmojiData(prev => [...prev, emoji])
    const res = await UserService.getUserInfo()
    const user = res.data.login

    if (user) {
      ForumService.addReaction({
        topicId: topic.id,
        emoji,
        user,
      })
    }
  }

  useEffect(() => {
    topic?.reactions && setEmojiData(topic.reactions)
  }, [])

  return (
    <div className={styles.reactionsContainer}>
      <div className={styles.reactionsInfoContainer}>
        {emojiData && (
          <div className={styles.emojiInfoListContainer}>
            {getEmojiData(emojiData).map(([emoji, count]) => (
              <div
                className={styles.emojiInfoContainer}
                onClick={() => handleClickEmoji(emoji)}>
                <p>{emoji}</p>
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
          {emosjis.map(emoji => (
            <button
              key={emoji}
              className={styles.reactionButton}
              onClick={() => handleClickEmoji(emoji)}>
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
