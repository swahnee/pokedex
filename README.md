# Pokedex

Fun Pokemon.

## Development

### Setup

Build docker images:

```console
$ docker compose build --no-cache
```

### Start the application

Start the application for manual use

```console
$ docker compose up -d && docker compose logs -f app
```

Now you can access the application at `http://localhost:3000`.

Alternatively, start the application in watch mode:

```console
$ docker compose watch && docker compose logs -f
```

Now you can access the application at `http://localhost:3000`. and any local code change will automatically restart the application.

In order to access the running container:

```console
$ docker exec -it app sh
```

### Console mode

If you prefer to run the container and open a shell without starting the application:

```console
$ docker compose run --rm --service-ports app sh
```

### Running commands

From inside a container shell, you first need to install dependencies:

```console
# npx ci
```

then you can run lint, test and coverage:

```console
# npx prettier --check .
# npm test
# npm run coverage
```

### Shutdown

Turn off the containers:

```console
$ docker compose down --remove-orphans --volumes
```
