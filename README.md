# Services REST API NestJS

## Description
The project was developed using the following tech stack:
- Postgres v12
- Node.js v16
- Nest.js v6.10
- TypeORM v0.2
- TypeScript

---
The project includes two main REST APIs to comply with [Story requirements](https://www.figma.com/file/zeaWiePnc3OCe34I4oZbzN/Service-Card-List?node-id=0%3A1):
  - Services (available under `/services` endpoint)
  - Versions (available under `/versions` endpoint)

All basic CRUD operations are implemented for both Services and Versions (see next section). 

Furthermore, all the POST, PUT and DELETE requests are protected using an api-key (i.e. `supersecret`). This auth method has been implemented since I expect another service to provide user managment functionalities including the login methods to fetch the required API key. In fact the idea is to keep the Services APIs as a Microservice responsible for the management of Services with linked versions only. This doesn't prevent it to interact with others Microservices.

Another design implementation cosists in the return only of ids of versions linked with each service when calling the `GET /services` or `GET /services/:id` APIs. This decision has been made to prevent higher resource usage than required when showing up only the dashboard where the details of versions are not relevant. If we want to display the actual versions details linked with a service, the API `GET /services/:id/versions` can be used. 

Moreover, all the user inputs are validated to prevent errors. If a wrong or unexpected parameter is used, a `400 - Bad Request` response is returned highlighting the error.

Finally, to allow pagination, when calling the `GET /services` endpoint a limit on the number of returned items can be specified as query param, then a list of items along with an offset and total number of elements is returned. Thanks to this design decision, the frontend developer is free to choose the amount of items and pages to display according to various screen sizes.


## Quickstart

You can run the project by simply running the docker-compose, the REST APIs will be exposed on `http://localhost:3000`

```bash
$ cd services-api
$ docker compose up
```

The command will deploy the actual services-api and a Postgres instance with some mock data for testing purpose.

## REST API Docs
All the API calls can be imported in [Insomnia.rest](https://insomnia.rest) using the file `InsomniaServicesAssignmentBulbarelli.json` present in the root of the project.

### Services APIs

```plaintext
GET /services
```

Supported attributes:

| Query Params                | Type     | Required | Description           | Default
|--------------------------|----------|----------|-----------------------| -----
| `offset`              | number | No      | Offset from where to start fetching items. | 0
| `limit`              | number | No       | Limit of returned items. | 12
| `search`              | string | No       | Service name or description to search. | NA
| `sort`              | string | No       | Which field to order by. | id
| `order`              | 'ASC'/'DESC' | No       | Ascending or Descending order. | ASC

If successful, returns list of services with offset and total number of items. 

Example response:

```json
{
    "items": [
        {
            "id": 1,
            "name": "Service 1",
            "description": "Description of Service 1",
            "createdAt": "2024-05-20T22:32:46.696Z",
            "updatedAt": "2024-05-20T22:32:46.696Z",
            "versions": [
                2,
                3,
                1
            ]
        }
    ],
    "offset": 1,
    "total": 50
}
```
___

```plaintext
GET /services/:id
```

Specify the ID of the service to fetch.
If successful, returns the service with linked versions. 

Example response:

```json
{
    "items": [
        {
            "id": 1,
            "name": "Service 1",
            "description": "Description of Service 1",
            "createdAt": "2024-05-20T22:32:46.696Z",
            "updatedAt": "2024-05-20T22:32:46.696Z",
            "versions": [
                2,
                3,
                1
            ]
        }
    ],
    "offset": 1,
    "total": 50
}
```

___

```plaintext
GET /services/:id/versions
```
Specify the Service ID to fetch its versions.

Supported attributes:

| Query Params                | Type     | Required | Description           | Default
|--------------------------|----------|----------|-----------------------| -----
| `offset`              | number | No      | Offset from where to start fetching items. | 0
| `limit`              | number | No       | Limit of returned items. | 12
| `search`              | string | No       | Service name or description to search. | NA
| `sort`              | string | No       | Which field to order by. | id
| `order`              | 'ASC'/'DESC' | No       | Ascending or Descending order. | ASC

 
If successful, returns the service with linked versions details. 

Example response:

```json
{
    "items": [
        {
            "id": 1,
            "name": "version",
            "description": "test",
            "createdAt": "2024-05-20T22:32:48.980Z",
            "updatedAt": "2024-05-20T20:33:24.438Z"
        },
        {
            "id": 2,
            "name": "Version 1.1",
            "description": "Minor update of Service 1",
            "createdAt": "2024-05-20T22:32:48.980Z",
            "updatedAt": "2024-05-20T22:32:48.980Z"
        },
        {
            "id": 3,
            "name": "Version 2.0",
            "description": "Major update of Service 1",
            "createdAt": "2024-05-20T22:32:48.980Z",
            "updatedAt": "2024-05-20T22:32:48.980Z"
        }
    ],
    "offset": 3,
    "total": 3
}
```
___

```plaintext
POST /services
```
Create a new Service. `api-key` is required in headers (i.e. `supersecret`).

Supported attributes in JSON:

| Body                | Type     | Required | Description           | Default
|--------------------------|----------|----------|-----------------------| -----
| `name`              | string | Yes      | Service name. | NA
| `description`              | string | No       | Service description. | NA

 
If successful, returns the new created service. 

Example response:

```json
{
    "name": "test service",
    "description": "test service description",
    "id": 51,
    "createdAt": "2024-05-20T18:24:18.776Z",
    "updatedAt": "2024-05-20T18:24:18.776Z"
}
```
___

```plaintext
PUT /services/:id
```
Edit a Service by specifying the ID as param and attributes in body. `api-key` is required in headers (i.e. `supersecret`).

Supported attributes in JSON:

| Body                | Type     | Required | Description           | Default
|--------------------------|----------|----------|-----------------------| -----
| `name`              | string | Yes      | Service name. | NA
| `description`       | string | No       | Service description. | NA

 
If successful, returns the updated service. 

Example response:

```json
{
    "id": 1,
    "name": "Service 1 bis",
    "description": "service 1 bis description",
    "createdAt": "2024-05-20T22:32:46.696Z",
    "updatedAt": "2024-05-20T23:11:44.252Z"
}
```
___

```plaintext
DELETE /services/:id
```
Delete a Service by specifying the ID as param. `api-key` is required in headers (i.e. `supersecret`).

If successful, returns `true`, `false` otherwise. 

### Version APIs

```plaintext
GET /versions/:id
```

Specify the ID of the version to fetch.
If successful, returns the version with linked service. 

Example response:

```json
{
    "id": 10,
    "name": "Version 1.0",
    "description": "Initial release of Service 4",
    "createdAt": "2024-05-20T22:32:48.980Z",
    "updatedAt": "2024-05-20T22:32:48.980Z"
}
```

___

```plaintext
POST /versions
```
Create a new Version. `api-key` is required in headers (i.e. `supersecret`).

Supported attributes in JSON:

| Body                | Type     | Required | Description           | Default
|--------------------------|----------|----------|-----------------------| -----
| `name`              | string | Yes      | Version name. | NA
| `description`              | string | No       | Version description. | NA
| `service`              | number | Yes       | Service ID linked to version. | NA

 
If successful, returns the new created version. 

Example response:

```json
{
    "name": "test version",
    "description": "test version description",
    "service": {
        "id": 1,
        "name": "Service 1",
        "description": "service 1 bis",
        "createdAt": "2024-05-20T22:32:46.696Z",
        "updatedAt": "2024-05-20T23:11:44.252Z"
    },
    "id": 73,
    "createdAt": "2024-05-20T23:19:01.467Z",
    "updatedAt": "2024-05-20T23:19:01.467Z"
}
```
___

```plaintext
PUT /version/:id
```
Edit a Version by specifying the ID as param and attributes in body. `api-key` is required in headers (i.e. `supersecret`).

Supported attributes in JSON:

| Body                | Type     | Required | Description           | Default
|--------------------------|----------|----------|-----------------------| -----
| `name`              | string | Yes      | Version name. | NA
| `description`              | string | No       | Version description. | NA
| `service`              | number | Yes       | Service ID linked to version. | NA

 
If successful, returns the updated version. 

Example response:

```json
{
    "id": 1,
    "name": "version",
    "description": "version test",
    "createdAt": "2024-05-20T22:32:48.980Z",
    "updatedAt": "2024-05-20T20:33:24.438Z",
    "service": {
        "id": 1,
        "name": "Service 1",
        "description": "service 1 bis",
        "createdAt": "2024-05-20T22:32:46.696Z",
        "updatedAt": "2024-05-20T23:11:44.252Z"
    }
}
```
___

```plaintext
DELETE /versions/:id
```
Delete a Version by specifying the ID as param. `api-key` is required in headers (i.e. `supersecret`).

If successful, returns `true`, `false` otherwise. 

## Testing

Since the APIs are simple CRUD, I decided to not proceed with unit/integration tests since I prefer to dedicate time for testing business logic that has an higher impact on customer experience.
However as a testing plan, some E2E tests can be performed using [Insomnia automated testing](https://insomnia.rest/product/automated-testing)