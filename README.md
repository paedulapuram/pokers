# Poker Room

A standalone full-stack Texas Hold'em poker project.

## What It Includes

- Guest, Player, Host, Admin, and dealer system roles.
- File-backed player signup and sign-in with securely hashed passwords.
- Temporary guest play without creating an account.
- Saved Host, Player, and Admin account roles with server-enforced table permissions.
- Reserved `Admin` superuser with registered-user activation controls and bulk status updates.
- Host/Admin test password protection.
- Masked mode to hide opponent cards and Unmasked mode to reveal them for learning.
- 2 to 9 seats with bot opponents.
- Virtual chips, blinds, betting actions, community cards, showdown evaluation, and next-hand flow.
- Basic win-chance estimates as the hand progresses.
- Shareable six-character room codes for joining from another browser.
- Server-issued player sessions, private card views, and turn authorization.
- One-second table synchronization between connected browsers.

## Online Multiplayer Roadmap

1. Room codes, private player views, and authorized actions. Complete.
2. Replace polling with WebSocket updates and connection presence.
3. Add waiting-room seat selection, ready states, and host start controls.
4. Move file-backed accounts, tables, and reconnect tokens to Postgres.
5. Deploy behind HTTPS with production session security and rate limiting.

## Run

```bash
npm run dev
```

Open `http://localhost:3000/poker/`.

### Open From A Phone On The Same Wi-Fi

Do not use `127.0.0.1` or `localhost` on the phone. Those addresses point back
to the phone itself. Use the Mac's Wi-Fi IP address instead:

```bash
ipconfig getifaddr en0
```

Start the server in LAN mode:

```bash
PORT=3002 npm run dev:lan
```

If that prints `192.168.1.25` and the poker server is running on port `3002`,
open this on the phone:

```text
http://192.168.1.25:3002/poker/
```

Keep the Mac and phone on the same Wi-Fi network, and allow the browser through
the macOS firewall if macOS asks.

Registered accounts are stored in `data/users.json`. Passwords are stored as salted
`scrypt` hashes, never as readable text. The data file is ignored by Git and cannot
be served by the web server.

The reserved Host account is created with user ID `Host`, password `Host`, and the
Host role. Only this Host role can create tables. Player, Admin, and Guest identities
can join tables.

The reserved Admin superuser is created automatically with user ID `Admin` and
password `Admin`. Admin can view registered accounts, activate or deactivate users
individually, or select multiple users for a bulk status update. Inactive accounts
cannot sign in until Admin reactivates them.

Guest identities last for the current browser tab. Registered sign-in is remembered
in the browser, but server sessions are currently in memory and require signing in
again after a server restart.

Host/Admin testing uses the password `poker-test` by default, or set
`POKER_ROLE_PASSWORD` to override it.

To use another port:

```bash
PORT=4000 npm run dev
```

## Deploy Online With Render

Render can run this project directly from GitHub. Use this for the first online
version before adding Postgres persistence.

### 1. Confirm The GitHub Repo

Use the repo:

```text
https://github.com/paedulapuram/pokers
```

The app is expected to live at the root of the repo, with `package.json`,
`server.js`, `index.html`, and `render.yaml` all in the top-level folder.

### 2. Create The Web Service

1. Open `https://dashboard.render.com`.
2. Click `New`.
3. Choose `Web Service`.
4. Connect GitHub if Render asks for access.
5. Select `paedulapuram/pokers`.
6. Use the `main` branch.

Render can read `render.yaml`, but if you enter the settings manually, use:

```text
Runtime: Node
Build Command: npm install
Start Command: npm start
Health Check Path: /api/health
```

### 3. Environment Variables

Add these environment variables in Render if they are not created from
`render.yaml` automatically:

```text
NODE_ENV=production
HOST=0.0.0.0
POKER_ROLE_PASSWORD=<choose a private value>
```

Do not set `PORT` manually on Render. Render provides it automatically.

### 4. Open The Online App

After deploy succeeds, Render gives a public URL like:

```text
https://your-service-name.onrender.com
```

Open the Poker app at:

```text
https://your-service-name.onrender.com/poker/
```

Check server health at:

```text
https://your-service-name.onrender.com/api/health
```

### 5. Current Online Limitation

This first deployment is good for testing from multiple browsers and devices, but
it still stores active rooms and sessions in server memory. If Render restarts the
service, active rooms and sign-in sessions can reset. The next production step is
to move users, sessions, tables, and rankings to Postgres.

## Add Render Postgres

The app supports Postgres for registered users when `DATABASE_URL` is set. If
`DATABASE_URL` is empty, the app keeps using the local file `data/users.json`.

### 1. Create A Database

1. Open `https://dashboard.render.com`.
2. Click `New`.
3. Choose `PostgreSQL`.
4. Name it `pokers-db`.
5. Pick the same region as the web service.
6. Create the database.

### 2. Connect The Database To The Web Service

1. Open the `pokers` web service in Render.
2. Go to `Environment`.
3. Add or update:

```text
DATABASE_URL=<the Render Postgres internal database URL>
PGSSLMODE=require
```

Render shows the database URLs on the Postgres database page. Use the internal
database URL when the web service and database are in the same Render region.

### 3. Deploy Again

Click `Manual Deploy` on the web service. On startup, the app creates the
`poker_users` table automatically and provisions the reserved `Host` and `Admin`
accounts.

### 4. What Is Stored In Postgres Now

Postgres currently stores registered accounts:

- user IDs
- display names
- password hashes
- roles
- active/inactive status
- profile photos
- reserved Host/Admin accounts

Active tables, seats, current hands, sessions, and rankings are still stored in
server memory. Those should move to Postgres or Redis in the next database step.

## Test

```bash
npm test
```

## Project Layout

- `index.html`, `styles.css`, and `app.js` contain the browser UI.
- `server.js` serves the Poker UI and exposes the Poker API.
- `src/pokerEngine.js` contains deck creation, table roles, betting rounds, bot turns, hand evaluation, and serialization.
- `src/userStore.js` validates accounts, hashes passwords, and persists users to a JSON file.
- `tests/pokerEngine.test.js` covers the core Poker rules and table behavior.
