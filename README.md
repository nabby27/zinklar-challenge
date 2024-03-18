# ZINKLAR-CHALLENGE

## Requirements

- [docker compose](https://docs.docker.com/compose/)
- [just](https://just.systems/)

> You can run the project also with only with `npm` but we encourage you to use `docker compose` to use the same environment, `just` works as an alias of the `docker compose` commands.

# First Steps

1. Create the `.env` file with the proper values, you can copy the `.env.sample`

2. Run `just install` to install the dependencies

## Main Commands

> You can see all the commands available in the `Justfile` file.

### Run the project on dev mode

```sh
just dev
```

### Build the project

```sh
just build
```

### Run the test

> Also, you can run the test in mode watch or run the code coverage (go to the Justfile to see the corresponding command)

```sh
just test_unit
```

```sh
just test_integration
```
