# Game 2048 - Docker Setup

Этот проект настроен для запуска в Docker с использованием docker-compose.

## Требования

- Docker
- Docker Compose

## Настройка

1. Скопируйте файл с переменными окружения:
```bash
cp env.example .env
```

2. Отредактируйте файл `.env` и установите необходимые значения:
```bash
# Client Configuration
CLIENT_PORT=3000
CLIENT_URL=http://localhost

# Server Configuration
SERVER_PORT=3001

# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_DB=game_2048
POSTGRES_PORT=5432
POSTGRES_HOST=postgres

# Yandex API Configuration
YA_API_URL=https://ya-praktikum.tech/api/v2

# Environment
NODE_ENV=development
```

## Запуск

### Полный запуск всех сервисов
```bash
docker-compose up -d
```

### Запуск с пересборкой образов
```bash
docker-compose up -d --build
```

### Просмотр логов
```bash
# Все сервисы
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f postgres
```

## Остановка

```bash
docker-compose down
```

### Остановка с удалением данных
```bash
docker-compose down -v
```

## Структура сервисов

### Зависимости
1. **PostgreSQL** - база данных (запускается первой)
2. **Server** - API сервер (зависит от PostgreSQL)
3. **Client** - веб-приложение (зависит от Server)

### Порты
- **Client**: http://localhost:3000
- **Server**: http://localhost:3001
- **PostgreSQL**: localhost:5432

## Переменные окружения

### Безопасность
- Все пароли и токены хранятся в файле `.env`
- Файл `.env` не должен попадать в репозиторий
- Используйте `env.example` как шаблон

### Обязательные переменные
- `POSTGRES_PASSWORD` - пароль для PostgreSQL
- `POSTGRES_USER` - пользователь PostgreSQL
- `POSTGRES_DB` - название базы данных

## Разработка

### Пересборка одного сервиса
```bash
docker-compose build server
docker-compose up -d server
```

### Вход в контейнер
```bash
docker-compose exec server sh
docker-compose exec client sh
docker-compose exec postgres psql -U postgres -d game_2048
```

## Мониторинг

### Health Checks
Все сервисы имеют настроенные health checks:
- PostgreSQL: проверка подключения к БД
- Server: проверка HTTP endpoint `/health`
- Client: проверка доступности nginx

### Логи
Логи доступны через docker-compose:
```bash
docker-compose logs -f [service_name]
```

## Troubleshooting

### Проблемы с базой данных
```bash
# Проверка статуса PostgreSQL
docker-compose exec postgres pg_isready -U postgres

# Сброс данных
docker-compose down -v
docker-compose up -d
```

### Проблемы с сетью
```bash
# Проверка сети
docker network ls
docker network inspect game_2048_game-network
```

### Очистка
```bash
# Удаление всех контейнеров и образов
docker-compose down --rmi all --volumes --remove-orphans
``` 