# **My Note Fullstack**

## Requirement

> nodejs v18.18.0
> postgresql latest version

## How To Run

Before running this program you need to make file .env in the very first folder.

> inside .env:
> NEXT_PUBLIC_DEV_DATABASE_URL="postgresql://postgres:**[your password]**@localhost:**[your database port]**"
> NEXT_PUBLIC_APP_API_ENDPOINT="http://localhost:3000/api"

After making env file you can go to next step :

- first you need to install all packages using: `npm install`
- then you need to make database with prisma by following this code: `npx prisma db push`
- You can run this program by writing this code in your favourite terminal: `npm run build && npm run start`
- if you want to run development server you can write : `npm run dev`

And for the last you can go to [http://localhost:3000/](http://localhost:3000/)

## Folder Structure

- **app** is the house for your applications such pages and APIs.
- **components** is where styled components come from.
- **controller** managing graphql logic such get, add, update, delete notes.
- **graphql** graphql configuration
- **lib** configuration apollo server to link to our APIs
- **prisma** ORM for handling database query.
- **styles** all the styles or css.

## Features

- **CRUD** adding crud to notes.
- **Server Components** housing all pages as server components for SEO and faster performance.
- **Search** search all notes realtime.
