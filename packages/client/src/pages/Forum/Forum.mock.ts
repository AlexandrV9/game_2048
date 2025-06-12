export interface User {
  id: number
  firstName: string
  secondName: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
}

export interface Comment {
  id: number
  content: string
  created: Date
  author: User
}

export interface Topic {
  id: number
  topic: string
  author: User
  created: Date
  comments: Comment[]
}

export const users: User[] = [
  {
    id: 1,
    firstName: 'Иван',
    secondName: 'Петров',
    login: 'ivan_petrov',
    email: 'ivan@example.com',
    password: 'qwerty123',
    phone: '+79991234567',
    avatar:
      'https://sun9-25.userapi.com/c10968/u85534956/141244771/x_4ee7e2c5.jpg',
  },
  {
    id: 2,
    firstName: 'Анна',
    secondName: 'Смирнова',
    login: 'anna_smirnova',
    email: 'anna@example.com',
    password: 'password123',
    phone: '+79997654321',
    avatar:
      'https://sun9-18.userapi.com/s/v1/ig2/p6VXe4aZJy-MmrOuS5vErDAmeoh_N0QJgShGtalTL0UssTuJ9CEh0s7yltdZ5vv7B0LOCC_3oiDnshmcyL39TBmj.jpg?quality=96&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720,1440x810,2560x1440&from=bu&u=rnhIDyyaPRNDTi0knoG1KS0uBWGjDB5_mTq9LyocncI&cs=604x340',
  },
  {
    id: 3,
    firstName: 'Максим',
    secondName: 'Иванов',
    login: 'max_ivanov',
    email: 'max@example.com',
    password: 'max12345',
    phone: '+79991112223',
    avatar:
      'https://sun9-71.userapi.com/c629203/u287236101/video/l_98a5be62.jpg',
  },
  {
    id: 4,
    firstName: 'Мария',
    secondName: 'Васильева',
    login: 'maria_vasilyeva',
    email: 'maria@example.com',
    password: 'maria123',
    phone: '+79993334445',
    avatar: 'https://sun9-46.userapi.com/c9749/u142956651/-6/x_b3befbb8.jpg',
  },
  {
    id: 5,
    firstName: 'Сергей',
    secondName: 'Козлов',
    login: 'sergey_kozlov',
    email: 'sergey@example.com',
    password: 'sergey123',
    phone: '+79995556667',
    avatar:
      'https://obrazovaka.ru/wp-content/uploads/2017/10/morfologicheskiy-razbor-slova-pushistyy.jpg',
  },
]

const comments: Comment[] = []
for (let i = 1; i <= 100; i++) {
  comments.push({
    id: i,
    content: `Комментарий ${i} к топику`,
    created: new Date(),
    author: users[Math.floor(Math.random() * 5)],
  })
}

export const forumTopicsMock: Topic[] = [
  {
    id: 1,
    topic: 'Стратегии победы: как достичь 2048 за минимальное количество ходов',
    author: users[0],
    created: new Date(),
    comments: comments.slice(0, 5),
  },
  {
    id: 2,
    topic: 'Секреты продвинутых игроков: техники слияния плиток',
    author: users[1],
    created: new Date(),
    comments: comments.slice(5, 10),
  },
  {
    id: 3,
    topic: 'Обсуждение багов и глюков в игре',
    author: users[2],
    created: new Date(),
    comments: comments.slice(10, 15),
  },
  {
    id: 4,
    topic: 'Мотивация и преодоление плато: как выйти за 1024',
    author: users[3],
    created: new Date(),
    comments: comments.slice(15, 25),
  },
  {
    id: 5,
    topic: 'Психология игры: почему так затягивает?',
    author: users[4],
    created: new Date(),
    comments: comments.slice(25, 35),
  },
  {
    id: 6,
    topic: 'Математический анализ: вероятности появления чисел',
    author: users[0],
    created: new Date(),
    comments: comments.slice(35, 45),
  },
  {
    id: 7,
    topic: 'Лучшие начальные ходы и их влияние на исход игры',
    author: users[1],
    created: new Date(),
    comments: comments.slice(45, 55),
  },
  {
    id: 8,
    topic: 'Обсуждение различных версий игры (HTML5, мобильные, настольные)',
    author: users[2],
    created: new Date(),
    comments: comments.slice(55, 65),
  },
  {
    id: 9,
    topic: 'Создание собственных модификаций игры',
    author: users[3],
    created: new Date(),
    comments: comments.slice(65, 75),
  },
  {
    id: 10,
    topic: 'Оптимизация памяти: как использовать меньше пространства',
    author: users[4],
    created: new Date(),
    comments: comments.slice(75, 85),
  },
  {
    id: 11,
    topic: 'Сравнение с другими головоломками: почему 2048 особенная',
    author: users[0],
    created: new Date(),
    comments: comments.slice(85, 95),
  },
  {
    id: 12,
    topic: 'История создания игры и её популярность',
    author: users[1],
    created: new Date(),
    comments: comments.slice(95, 100),
  },
  {
    id: 13,
    topic: 'Техники быстрого счета в игре',
    author: users[2],
    created: new Date(),
    comments: comments.slice(0, 8),
  },
  {
    id: 14,
    topic: 'Обсуждение достижений и рекордов',
    author: users[3],
    created: new Date(),
    comments: comments.slice(8, 18),
  },
  {
    id: 15,
    topic: 'Советы новичкам: с чего начать',
    author: users[4],
    created: new Date(),
    comments: comments.slice(18, 28),
  },
  {
    id: 16,
    topic: 'Анализ паттернов движения',
    author: users[0],
    created: new Date(),
    comments: comments.slice(28, 38),
  },
  {
    id: 17,
    topic: 'Обсуждение возможных улучшений игры',
    author: users[1],
    created: new Date(),
    comments: comments.slice(38, 48),
  },
  {
    id: 18,
    topic: 'Математические стратегии для высоких результатов',
    author: users[2],
    created: new Date(),
    comments: comments.slice(48, 58),
  },
  {
    id: 19,
    topic: 'Обсуждение читов и их влияние на игровой процесс',
    author: users[3],
    created: new Date(),
    comments: comments.slice(58, 68),
  },
  {
    id: 20,
    topic: 'Создание AI для игры в 2048',
    author: users[4],
    created: new Date(),
    comments: comments.slice(68, 78),
  },
]

export const me = users[0]
