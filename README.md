# Reviews micro-service

> A service responsible for displaying/rendering a book reviews stored in a MongoDB with the ability to add new reviews & like a review.

## Related Projects

  - https://github.com/rpt12-knightrider/jb-service
  - https://github.com/rpt12-knightrider/s-service
  - https://github.com/rpt12-knightrider/sm-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
1- run the seeding script tp feed the database with 10000 reviews documents.
```sh
npm run seed
```
2- then run the server.
```sh
npm start
```
3- use `Postman` to send a `/reviews/:id` GET request to fetch the reviews associated to the book with the specified `id`.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 8.11.4
- npm 5.6.0
- MongoDB

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## API Endpoints

#### `/reviews/:id`
* description: retrieve the reviews associated to the book with the specified `id`.
* API response:
A JSON-encoded array of objects where each object represent a review. A review object example looks like this:
```js
{
  "_id": "5c99be23d83f3c5994dd1e38",
  "id": 20,
  "image_url": "http://lorempixel.com/640/480/people",
  "reviewer_name": "Rey Cummerata",
  "star_rate": 5,
  "review_date": "2019-03-06T09:58:19.247Z",
  "review_description": "Incidunt suscipit corrupti fugit earum saepe ipsum et veritatis earum. Eius voluptatem sint perspiciatis accusamus porro deleniti aut et debitis. Iste vitae ut voluptatum dicta consequatur exercitationem dolore sed. Veritatis est et. Illo iure voluptatem voluptatem aperiam possimus. Consequatur fugiat sapiente nostrum aut quisquam magni quaerat non in.\n \rConsectetur qui adipisci. Totam qui voluptas. Aperiam minima est earum quae est labore sit.\n \rOmnis esse hic iure. Vitae qui qui amet sed asperiores repellat porro quidem soluta. Quo officia voluptatem mollitia aspernatur possimus quia. Dolore porro fugiat.",
  "likes_count": 995
},
```


