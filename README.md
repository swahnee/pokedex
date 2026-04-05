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
$ docker compose up -d && docker compose logs -f
```

Now you can access the application at `http://localhost:3000`. Since the application is by default launched with `node --watch`, any local code change will automatically restart the application.

In order to access the running container:

```console
$ docker exec -it app sh
```

### Console mode

If you prefer to run the container and open a shell without starting the application:

```console
$ docker compose run --rm --service-ports app sh
```

### Executing commands

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

## Running the application

When started with Docker, as well as when running integration tests, the application calls fake services that return fixture data, instead of real data.

In order to configure the application to run with a production setup, and thus make real calls on the network, just start it with the environment variable `APP_ENV` set to `production`:

```console
$ APP_ENV=production docker compose up
```
