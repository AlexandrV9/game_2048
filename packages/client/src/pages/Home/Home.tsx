import styles from './Home.module.scss'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { routesName } from '@/core/Routes.js'

const HomePage = () => {
  return (
    <div className={styles.home}>
      <nav>
        <img src="/Home/Home.svg" alt="2048" className={styles.icons} />
        <button className={styles.help}>
          <img src="/Home/Help.svg" alt="help" />
        </button>

        <div className={styles.rule}>
          <h4>Правила:</h4>
          <ul>
            <li>1. В каждом раунде появляется плитка номинала «2» или «4».</li>
            <li>
              2. Нажатием стрелки игрок может скинуть все плитки игрового поля в
              одну из 4 сторон. Если при сбрасывании две плитки одного номинала
              «налетают» одна на другую, то они превращаются в одну, номинал
              которой равен сумме соединившихся плиток. После каждого хода на
              свободной секции поля появляется новая плитка номиналом «2» или
              «4». Если при нажатии кнопки местоположение плиток или их номинал
              не изменится, то ход не совершается. Если в одной строчке или в
              одном столбце находится более двух плиток одного номинала, то при
              сбрасывании они начинают соединяться с той стороны, в которую были
              направлены. Например, находящиеся в одной строке плитки (4, 4, 4)
              после хода влево превратятся в (8, 4), а после хода вправо — в (4,
              8). Данная обработка неоднозначности позволяет более точно
              формировать стратегию игры.
            </li>
            <li>
              4. За каждое соединение игровые очки увеличиваются на номинал
              получившейся плитки.
            </li>
            <li>
              5. Игра заканчивается поражением, если после очередного хода
              невозможно совершить действие.
            </li>
          </ul>
        </div>

        <div className={styles.avatar}>
          <Avatar>
            <a href={`${routesName['profile']}/1`}>
              <AvatarImage
                src="https://sun9-25.userapi.com/c10968/u85534956/141244771/x_4ee7e2c5.jpg"
                alt="avatar"
              />
            </a>
          </Avatar>
        </div>
      </nav>

      <div className={styles.navPanel}>
        <nav>
          <div className={styles.navList}>
            <a href={`${routesName['start']}`}>
              <button>
                <img src="Home/Game.svg" alt="game" />
                <span>ИГРАТЬ</span>
              </button>
            </a>
            <a href={`${routesName['lederBoard']}`}>
              <button>
                <img src="Home/Crown.svg" alt="game" />
                <span>ЛИДЕРЫ</span>
              </button>
            </a>
            <a href={`${routesName['forum']}`}>
              <button>
                <img src="Home/Forum.svg" alt="game" />
                <span>ФОРУМ</span>
              </button>
            </a>
            <button onClick={window.close}>
              <img src="Home/Quit.svg" alt="game" />
              <span>ВЫХОД</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default HomePage
