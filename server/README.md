# SERVER

> Server code for spacechat

## SETUP

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

## API ROUTES

### USER `/user`

API routes user based functions

#### Register User

Create a new user account

- **URL**
  /user/register
- **Method** <br />
  `POST`
- **Body**
  ```json
  {
    "username": "<username>",
    "name": "<name>",
    "password": "<password>",
    "profile": "<profile>"
  }
  ```
- **Success Response**
  - **Code**: 200
    ```json
    {
       "id": <id>,
       "username": "<username>",
       "name": "<name>",
       "profile": "<profile>",
       "about": null,
       "token": "JWT token"
    }
    ```
- **Error Response**
  - **Code**: 400 Bad Request <br />
    **Content**: `{ message: 'Required params not provided' }`
  - **Code**: 500 Internal Server Error <br />
    **Content**: `{ message: 'Failed to register user' }`

#### Login User

Login to existing account

- **URL**
  /user/login
- **Method** <br />
  `POST`
- **Body**
  ```json
  {
    "username": "<username>",
    "password": "<password>"
  }
  ```
- **Success Response**
  - **Code**: 200
    ```json
    {
       "id": <id>,
       "username": "<username>",
       "name": "<name>",
       "profile": "<profile>",
       "about": "<about>",
       "token": "JWT token"
    }
    ```
- **Error Response**
  - **Code**: 400 Bad Request <br />
    **Content**: `{ message: 'Required params not provided' }`
  - **Code**: 500 Internal Server Error <br />
    **Content**: `{ message: 'Failed to login user' }`

#### Update User

Update user details

- **URL**
  /user/update
- **Method** <br />
  `PUT`
- **Headers** <br />
  `Authorization: Bearer <JWT token>`
- **Body**
  ```json
  {
    "username": "<username>",
    "name": "<name>",
    "password": "<password>",
    "profile": "<profile>",
    "about": "<about>"
  }
  ```
- **Success Response**
  - **Code**: 200
    ```json
    {
       "id": <id>,
       "username": "<username>",
       "name": "<name>",
       "profile": "<profile>",
       "about": null,
       "token": "JWT token"
    }
    ```
- **Error Response**
  - **Code**: 402 Bad Request <br />
    **Content**: `{ message: 'Required params not provided' }`
  - **Code**: 500 Internal Server Error <br />
    **Content**: `{ message: 'Failed to register user' }`

#### Get User Chat List

Get user chat list and mark all new messages for user as `received`

- **URL**
  /user/chat
- **Method** <br />
  `GET`
- **Headers** <br />
  `Authorization: Bearer <JWT token>`
- **Success Response**
  - **Code**: 200
    ```ts
    interface Response {
      id: number;
      name: string;
      username: string;
      profile: string;
      sent: [
        {
          id: number;
          type: 'TEXT' | 'VOICE' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
          message: string;
          createdAt: Date;
          status: 'SENT' | 'RECEIVED' | 'SEEN';
          senderId: number;
          targetId: number;
        }
      ];
    }
    [];
    ```
- **Error Response**
  - **Code**: 402 Bad Request <br />
    **Content**: `{ message: 'Required params not provided' }`
  - **Code**: 500 Internal Server Error <br />
    **Content**: `{ message: 'Failed to fetch chat list' }`

### MESSAGE `/message`

#### Get Messages With Target User

Get messages with target users

> Returns 20 messages by default

- **URL**
  /message/:targetId
- **Method** <br />
  `GET`
- **QUERY**
  `page`: pass page for cursor
- **Headers** <br />
  `Authorization: Bearer <JWT token>`
- **Success Response**
  - **Code**: 200
    ```ts
    interface Response {
      id: number;
      type: 'TEXT' | 'VOICE' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
      message: string;
      createdAt: Date;
      status: 'SENT' | 'RECEIVED' | 'SEEN';
      senderId: number;
      targetId: number;
    }
    [];
    ```
- **Error Response**
  - **Code**: 402 Bad Request <br />
    **Content**: `{ message: 'Required params not provided' }`
  - **Code**: 500 Internal Server Error <br />
    **Content**: `{ message: 'Failed to load messages' }`
