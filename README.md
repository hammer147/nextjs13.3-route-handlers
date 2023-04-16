# Demo code for Route Handlers in Next.js 13

Note that Route Handler are only needed if you fetch data from client components and have something to hide.
Things you want to hide: API keys, secret URLs, etc.

## GET, POST, PUT, DELETE

see code in src/app/api/todos

## rate limiting

we rate limited the hello route

npm i limiter

see code in src/app/api/config/limiter.ts and src/app/api/hello/route.ts

## CORS

api routes are same-origin only by default

if we want to allow some other origins, we can use middleware

see code in middleware.ts and src/app/api/hello/route.ts
