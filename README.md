# BookNook

**Live site:** https://booknook-client-gilt.vercel.app

BookNook is a small online library. Add a book, borrow a book, return a book.

## Features

- Browse every book on the shelf with search and category filters
- Home page with a Swiper slider and the 6 newest books, sorted and limited in MongoDB
- Register and log in with email and password, or continue with Google (Better Auth)
- Private routes for Add Book, My Books, My Borrows and book details, with no logout on page reload
- Add a book with a cover image uploaded to imgbb, and edit or delete your own books with confirm modals
- Borrow a book for 7 days and return it with one click, with live available copy counts
- Not Available state when no copies are left, and a block on borrowing the same book twice
- JWT protected API, light and dark theme, Framer Motion animations and a fully responsive layout

## Tech stack

- **Client:** Next.js (App Router), TypeScript, Tailwind CSS, DaisyUI, Swiper, Framer Motion
- **Auth:** Better Auth with the MongoDB adapter and the JWT plugin
- **Server:** Express and TypeScript, MongoDB Atlas (see the server repository)

## Repositories

- Client: https://github.com/mehedijoy-dev/booknook-client
- Server: https://github.com/mehedijoy-dev/booknook-server
- API: https://booknook-server-seven-indol.vercel.app

## Run locally

```bash
git clone https://github.com/mehedijoy-dev/booknook-client.git
cd booknook-client
npm install
npm run dev
```

Create a `.env.local` file with these variables:

```
MONGODB_URI=
DB_NAME=booknook
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
IMGBB_API_KEY=
```

Then open http://localhost:3000. The Express server must be running on port 5000.
