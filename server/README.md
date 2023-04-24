# SERVER
> Server code for spacechat

## Functionality
- Realtime communication using `socket.io`
- Handling Users, Rooms using `mongoDB`

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

> WIP

## TODO
- [x] MONGODB setup
- [x] User model
  - [x] create user
  - [x] get user by `username` or `id`
  - [x] update user
  - [x] search user
- [ ] User controller
  - [ ] register user
  - [ ] login user
- [ ] Room model
  - [ ] create room
  - [ ] join room
  - [ ] update room
  - [ ] delete room
  - [ ] search rooms
  - [ ] get user rooms
  - [ ] get given room
  - [ ] get messages of a room
  - [ ] create message
  - [ ] read message
  - [ ] delete message
> More todo to add..