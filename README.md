# Zackexplosion Vuetify Admin Template

This is created from the official scaffolding tool for Vuetify, designed to give you a head start in building your new Vuetify application with some basic admin function. It sets up a base template with all the necessary configurations and standard directory structure, enabling you to begin development without the hassle of setting up the project from scratch.

## ❗️ Important Links

- 📄 [Docs](https://vuetifyjs.com/)
- 🚨 [Issues](https://issues.vuetifyjs.com/)
- 🏬 [Store](https://store.vuetifyjs.com/)
- 🎮 [Playground](https://play.vuetifyjs.com/)
- 💬 [Discord](https://community.vuetifyjs.com)

## 💿 Install

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [bun](https://bun.sh/#getting-started)                        | `bun install`  |

After completing the installation, your environment is ready for Vuetify development.


## 💡 Usage

This section covers how to start the development server and build your project for production.

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3333](http://localhost:3333):

```bash
bun run dev
```

### Building for Production

To build your project for production, use:

```bash
bun run build
```

## Setup default Environment variables

Change file `.env.development` to your own setting or create a `.env.local` file to override it.

```sh
VITE_APP_TITLE=YOUR_APP_NAME
VITE_APP_LOGO_URL=https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo.svg
VITE_API_BASE_URL=YOUR_API_BASE_URL
```

## Make sure your api is implemented with following endpoints

* /auth/login
  > Body Parameters

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
* /auth/renew-tokens
  > Body Parameters
  ```json
  {
    "refreshToken": "TOKEN",
  }
  ```
  > With 200 Response

  ```json
  {
    "accessToken": "TOKEN",
    "refreshToken": "TOKEN"
  }
  ```
* /users/me
  > no params
