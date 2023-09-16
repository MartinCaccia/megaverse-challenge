
# Megaverse challenge

Backend Microservice to get maps goal, create and delete planets in the megaverse, only that just for now...
My idea later is make the Nextjs frontend part too that consume the backend in Nestjs ms.

## Content

- [Stack](#stack)
- [Setup Local](#setup-local)
  - [Config](#config)
  - [Install](#install)
  - [Start service](#start-service)
  - [Curls](#curls)
- [Documentation](#documentation)

## Stack

- _Lenguaje:_ `Typescript <4.3.5>`
- _Framework:_ `NestJS <9.0.0>`

## Setup local
### Config

Create the file `.env` base to the example `.env.example`.

### Install

```bash
$ yarn install
```

### Start service

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
### Curls

```bash
# get candidate goal map
$ curl --location --request GET 'http://localhost:3000/api/v1/goal/map/candidate'

# get goal map
$ curl --location --request GET 'http://localhost:3000/api/v1/goal/map'

# create planet
$ curl --location --request POST 'http://localhost:3000/api/v1/create/planets' \
--header 'Content-Type: application/json' \
--data-raw '{
    "row":0,
    "column":0
}'
# or
$ curl --location --request POST 'http://localhost:3000/api/v1/create/planets'

# delete planet
curl --location --request DELETE 'http://localhost:3000/api/v1/delete/planets'
```

## Documentation

By Swagger in: http://localhost:3000/api
