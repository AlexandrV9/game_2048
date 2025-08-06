# Game 2048

Игра 2048 с современным стеком технологий.

## Быстрый старт с Docker

### Требования
- Docker
- Docker Compose

### Запуск
1. Скопируйте файл с переменными окружения:
```bash
cp env.example .env
```

2. Отредактируйте `.env` файл (особенно `POSTGRES_PASSWORD`)

3. Запустите проект:
```bash
./scripts/docker-setup.sh
```

Или вручную:
```bash
docker-compose up -d
```

### Доступ к приложению
- **Клиент**: http://localhost:3000
- **Сервер**: http://localhost:3001

Подробная документация по Docker: [DOCKER_README.md](./DOCKER_README.md)

## Разработка

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Для разработки с Docker:
   ```bash
   ./scripts/dev.sh
   ```
4. Или запустите локально:
   ```bash
   yarn dev`
   ```
5. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
6. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в Docker

### Быстрый запуск
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Структура сервисов
1. **PostgreSQL** - база данных
2. **Node.js Server** - API сервер
3. **Nginx** - статические файлы клиента

### Переменные окружения
Все настройки хранятся в файле `.env`:
- Пароли и токены не попадают в репозиторий
- Используйте `env.example` как шаблон
- Обязательно измените `POSTGRES_PASSWORD`

### Мониторинг
```bash
# Логи всех сервисов
docker-compose logs -f

# Статус сервисов
docker-compose ps

# Health checks
docker-compose exec postgres pg_isready -U postgres
curl http://localhost:3001/health
curl http://localhost:3000/health
```