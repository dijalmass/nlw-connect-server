# nlw-connect-server

## To run:

* Create a .env file in root directory:

```.env
PORT=3333

# URLs

WEB_URL="http://localhost:3000"

# Database

POSTGRES_URL="postgresql://docker:docker@localhost:5432/connect"
REDIS_URL="redis://localhost:6379"
```

```shell
docker compose up -d
```

 * Developement:
```shell
npm run dev
```

* Production:
```shell
npm run build & node --env-file .env dist/server.mjs
```
