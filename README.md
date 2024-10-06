# How To

## Prerequisites

At a minimum you'll need `node` and `npm`.

## Install Dependencies

From a terminal, run `npm install` in this base directory to pull `node_modules`.

## Commands

`npm run build` => Creates a production ready build you could deploy.

`npm run dev` => Runs an instance with hot reload that will watch for changes.

`npm run start` => Runs a highly scalable and clustered process manager for your `build`.

`npm run test` => Runs unit tests.

## Design

I'll briefly explain my design choices here. Feel free to research commit by commit to better understand my thought process.

### PM2

PM2 is a process manager that will spin up unique and distinct processes for each CPU on the machine. It'll restart dropped processes, load balance, manage logs, and all sorts of other useful things for your production environment.

### Fastify

Fastify is a highly scalable and responsive framework for Node, and an alternative to Express. I chose it to make an opinionated point; that you don't necessarily need to use the most popular tool for the job. And while this app won't actually be receiving any production traffic, it's important to callout hypothetical performance concerns, and showcase my thought process and design choices.

### TypeBox

TypeBox is an all in one framework for all your 4XX error code needs. It'll automatically validate things like request bodies, params, queries, etc, and spit out a clear and concise error message with the appropriate status code to the user. It's also quite friendly to the developer, requiring minimal configuration or overhead, and zero if statements.

### Async / Await

Using Fastify and PM2, we can squeeze every drop of performance out of Node. But we also need to be careful with our I/O access. Reading line by line is much more efficient than loading the entire file into memory.

### TypeScript, ESLint, Prettier

All critical for catching errors at coding, compile, and run time, with linting and formatting help as well.

## Future Work

As this was just a take home assignment, I was limited by time constraints. Here's a list of things I would do if I was paid for it (hah).

- Unit and integration tests; currently there's only a dummy test used to ensure PR checks work.
- Parallelized calls to many servers with many log folders.
- A UI capable of demoing the API.
- Caching
