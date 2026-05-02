# Raviteja Salva — Portfolio

Personal portfolio website. Monorepo with a React Router SPA frontend (`client/`) and an Express API backend (`server/`), backed by a Turso (libSQL cloud) database.

---

## Project Structure

```
portfolio/
├── client/          # React Router v7 SPA (deployed to Vercel)
│   ├── app/
│   ├── public/
│   ├── vite.config.ts
│   └── package.json
├── server/          # Express API (deployed to Render)
│   ├── index.cjs
│   ├── db.cjs
│   ├── routes/
│   └── package.json
├── .env             # Local env vars (never commit)
├── .env.example     # Template — copy to .env
└── package.json     # Workspace root
```

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in all values in `.env` (see [Environment Variables](#environment-variables) below).

### 3. Start both client and server

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

Run them individually:

```bash
npm run dev:client
npm run dev:server
```

### 4. Build for production

```bash
npm run build        # builds client only (static SPA)
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values.

| Variable              | Description                                                         |
| --------------------- | ------------------------------------------------------------------- |
| `VITE_GEMINI_API_KEY` | Google Gemini API key (AI assistant feature)                        |
| `SERVER_PORT`         | Port for the Express server (default: `3001`)                       |
| `ALLOWED_ORIGIN`      | CORS allowed origin — set to your Vercel frontend URL in production |
| `ADMIN_EMAIL`         | Admin panel login email                                             |
| `ADMIN_PASSWORD`      | Admin panel login password                                          |
| `ADMIN_TOKEN_SECRET`  | Secret used to sign the admin HMAC token                            |
| `TURSO_DATABASE_URL`  | Turso database URL (`libsql://...`)                                 |
| `TURSO_AUTH_TOKEN`    | Turso auth token                                                    |

---

## Deploying the Client to Vercel

The frontend is a static SPA (React Router with `ssr: false`).

### Steps

1. Push the repo to GitHub.

2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.

3. On the **Configure Project** screen set:

   | Setting              | Value                                   |
   | -------------------- | --------------------------------------- |
   | **Root Directory**   | `client`                                |
   | **Framework Preset** | Vite                                    |
   | **Build Command**    | `cd .. && npm install && npm run build` |
   | **Output Directory** | `build/client`                          |

4. Under **Environment Variables** add:

   | Key                   | Value               |
   | --------------------- | ------------------- |
   | `VITE_GEMINI_API_KEY` | your Gemini API key |

   > `VITE_` prefixed vars are the only ones baked into the static build. Server-side vars are not needed here.

5. Click **Deploy**.

### Subsequent deploys

Push to `main` — Vercel redeploys automatically.

---

## Deploying the Server to Render

The backend is a Node.js Express app (`server/index.cjs`).

### Steps

1. Go to [render.com](https://render.com) → **New** → **Web Service** → connect the repo.

2. Configure the service:

   | Setting            | Value                  |
   | ------------------ | ---------------------- |
   | **Root Directory** | `server`               |
   | **Environment**    | Node                   |
   | **Build Command**  | `cd .. && npm install` |
   | **Start Command**  | `node index.cjs`       |
   | **Instance Type**  | Free (or as needed)    |

3. Under **Environment Variables** add all server-side vars:

   | Key                  | Value                                                               |
   | -------------------- | ------------------------------------------------------------------- |
   | `SERVER_PORT`        | `3001` (Render also injects `PORT` automatically)                   |
   | `ALLOWED_ORIGIN`     | Your Vercel deployment URL e.g. `https://your-portfolio.vercel.app` |
   | `ADMIN_EMAIL`        | your admin email                                                    |
   | `ADMIN_PASSWORD`     | your admin password                                                 |
   | `ADMIN_TOKEN_SECRET` | your token secret                                                   |
   | `TURSO_DATABASE_URL` | your Turso database URL                                             |
   | `TURSO_AUTH_TOKEN`   | your Turso auth token                                               |

4. Click **Create Web Service**.

### Connecting client to server

In your Vercel project, set an additional env var pointing to the Render service URL:

> The frontend calls the API relative to the current origin in dev. For production you need to make sure API calls in the client use the absolute Render URL.  
> Check `client/app/` for any `fetch('/api/...')` calls and update them to use an env var like `VITE_API_URL=https://your-server.onrender.com` if they are not already domain-relative behind a proxy.

---

## Admin Panel

Available at `/admin` on the deployed frontend.

Login with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` credentials. The panel shows all contact form submissions and exit-popup leads stored in Turso.

---

## Tech Stack

| Layer      | Tech                                                            |
| ---------- | --------------------------------------------------------------- |
| Frontend   | React Router v7, React 19, Three.js, Framer Motion, TailwindCSS |
| Backend    | Express v5, Node.js                                             |
| Database   | Turso (libSQL cloud) via `@libsql/client`                       |
| 3D         | `@react-three/fiber`, `@react-three/drei`                       |
| Deployment | Vercel (client) + Render (server)                               |

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
