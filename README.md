# Pokedex

Fun Pokemon.

## Development

### Setup

Build docker images:

```console
$ docker compose build --no-cache
```

### Run the application in watch mode

Run the application:

```console
$ docker compose up -d && docker compose logs -f
```

Now you can access the application at `http://localhost:3000`. Since the application is by default launched with `node --watch`, any local code change will automatically restart the application.

In order to access the running container:

```console
$ docker exec -it app sh
```

If you prefer to run the containers and open a shell without starting the service as well:

```console
$ docker compose run --rm --service-ports app sh
```

### Executing development commands

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

## Production setup

When started with Docker, as well as when running integration tests, the application calls fake services that return fixture data, instead of real one.

In order to configure the application to run with a production setup, and thus make real calls on the network, just start it with the environment variable `APP_ENV` set to `prod`:

```console
$ APP_ENV=prod docker compose up
```
