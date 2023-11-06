# Authentication Service

## Requirements:
- Node
- PostgreSQL
- Docker (optional)

## Instalations:
```bash
npm install

docker compose up -d (if you don't use docker skip this command, then need install PostgreSQL manually)

cp .env.example .env

./db.sh (choose 1 -> Deploy Migrations)
```
## Running:
```bash
npm start
```