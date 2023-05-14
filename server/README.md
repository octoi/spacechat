# SERVER

> Server code for spacechat

## Functionality

- Realtime communication using `socket.io`
- Handling Users, Rooms using `postgres`

## Setup

1. Create `.env` file by checking `.env.example`
2. Install packages
   ```bash
   $ pnpm install
   ```
3. Run server
   ```bash
   $ pnpm start
   ## dev version
   $ pnpm dev
   ```

## TODO
[ ] Setup socket.io
[ ] Setup redis for realtime user status update
