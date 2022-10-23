## Documentação da API

## Rotas

### `GET /tasks` 

Retorna todas as tarefas cadastradas.

#### Corpo da requisição

`N/A`

#### Exemplo de Resposta

```json
[
  {
    "id": "cl9lt3efc0002v6zoory7y2cw",
    "createdAt": "2022-10-23T20:32:24.265Z",
    "updatedAt": "2022-10-23T20:33:50.231Z",
    "title": "Estudar React",
    "description": "estudar react hooks",
    "start": "2022-10-23T21:00:00.000Z",
    "durationMinutes": 240
  },
]
```
### `GET /tasks/:id`

Retorna uma tarefa específica. 

#### Corpo da requisição
> `:id` - ID da tarefa


#### Exemplo de Resposta

```json
[
  {
    "id": :id,
    "createdAt": "2022-10-23T20:32:24.265Z",
    "updatedAt": "2022-10-23T20:33:50.231Z",
    "title": "Estudar React",
    "description": "estudar react hooks",
    "start": "2022-10-23T21:00:00.000Z",
    "durationMinutes": 240
  }
]
```

### `GET /tasks/title/:title`

Retorna uma tarefa específica pelo título.

#### Corpo da requisição
> `:title` - Título da tarefa

#### Exemplo de Resposta
```json
[
  {
    "id": "cl9lt3efc0002v6zoory7y2cw",
    "createdAt": "2022-10-23T20:32:24.265Z",
    "updatedAt": "2022-10-23T20:33:50.231Z",
    "title": :title,
    "description": "estudar react hooks",
    "start": "2022-10-23T21:00:00.000Z",
    "durationMinutes": 240
  }
]
```

### `GET /sort/:mode/:startDate`

Retorna as tarefas ordenadas por um determinado modo.

#### Corpo da requisição
> `:mode` - Modo de ordenação ( `'day'` , `'week'` ou `'month'` )
> `:startDate` - Data de início da ordenação ( formato: `ISODate` )


#### Exemplo de resposta
- Request : `tasks/sort/month/Sat,%2001%20Oct%202022%2003:00:00%20GMT/`
```json
[
  {
    "id": "cl9lt3efc0002v6zoory7y2cw",
    "createdAt": "2022-10-23T20:32:24.265Z",
    "updatedAt": "2022-10-23T20:33:50.231Z",
    "title": "Estudar React",
    "description": "estudar react hooks",
    "start": "2022-10-23T21:00:00.000Z",
    "durationMinutes": 240
  },
  {
    "id": "cl9ltm8vd0008v6zob598xfle",
    "createdAt": "2022-10-23T20:47:03.530Z",
    "updatedAt": "2022-10-23T20:47:03.530Z",
    "title": "test",
    "description": "test description",
    "start": "2022-10-24T21:00:00.000Z",
    "durationMinutes": 240
  },
  {
    "id": "cl9lt4f1v0004v6zocjizpeyk",
    "createdAt": "2022-10-23T20:33:11.731Z",
    "updatedAt": "2022-10-23T20:33:11.731Z",
    "title": "Aniversário",
    "description": "niver da namorada do jorge",
    "start": "2022-10-24T22:00:00.000Z",
    "durationMinutes": 240
  },
  {
    "id": "cl9lt665m0006v6zobct0dqw3",
    "createdAt": "2022-10-23T20:34:33.514Z",
    "updatedAt": "2022-10-23T20:34:33.514Z",
    "title": "Estudar node",
    "description": "desenvolver projeto pessoal",
    "start": "2022-10-29T23:00:00.000Z",
    "durationMinutes": 120
  }
]
```
### `POST /tasks`

Cria uma nova tarefa.

#### Corpo da requisição

```json
{
  "title": "Estudar React",
  "description": "estudar react hooks",
  "start": "2022-10-23T21:00:00.000Z",
  "durationMinutes": 240
}
```

#### Exemplo de resposta 

```
HTTP/1.1 200 OK
```
### `PUT /tasks/:id`

Atualiza uma tarefa específica.

#### Corpo da requisição

> `:id` - ID da tarefa

```json
{
  "title": "Estudar React",
  "description": "estudar react hooks",
  "start": "2022-10-23T21:00:00.000Z",
  "durationMinutes": 320
}
```

#### Exemplo de resposta 

```json
{
  "id": "cl9lt3efc0002v6zoory7y2cw",
  "createdAt": "2022-10-23T20:32:24.265Z",
  "updatedAt": "2022-10-23T20:57:41.130Z",
  "title": "Estudar React",
  "description": "estudar react hooks",
  "start": "2022-10-23T21:00:00.000Z",
  "durationMinutes": 320
}
```

### `DELETE /tasks/:id`

Deleta uma tarefa específica.

#### Corpo da requisição
> `:id` - ID da tarefa

#### Exemplo de resposta

```
HTTP/1.1 200 OK
```
