# AGV Control Web App (ReactJS Frontend)

> GUI: graphical user interface

## Clone my code

```bash
git clone https://github.com/sondhg/agv-frontend-typescript.git
cd agv-frontend-typescript
```

## Required installations

1. **NodeJS**: [Download here](https://nodejs.org/en).
2. **Dependency libraries**

```bash
npm i
```

## Run the app

**IMPORTANT**: Since I can't use Hoang Anh's server yet, I wrote a backend Django server. Please use it, otherwise the app won't work.

- **Run GUI**:

```bash
npm run dev
o
```

The command `o` means "open", it will redirect you to [http://localhost:5173](http://localhost:5173). Here you see the GUI.

- **Run Django Server**: Clone and follow the README instructions in my [my-django-server](https://github.com/sondhg/my-django-server) repo to have a PostgreSQL database at port 5432 and a Django server at port 8000 like I do.

## Using the GUI

1. Use the sidebar to navigate between pages.
2. Must login to access ADMIN pages (Orders, AGVs, Schedules, Dashboard)

## Important files

Use `Ctrl+P` in VSCode to search for these files.

- API functions and configs

  - Files in `services/APIs` folder
  - `axiosCustomize.tsx`

- **WebSocket for live data** (testing with Binance API):
  - Files in `src/app/admin/dashboard` folder
  - WebSocket URL: wss://stream.binance.com:9443/ws/btcusdt@aggTrade

## Learning resources

- [React Hook YouTube Playlist](https://www.youtube.com/playlist?list=PLncHg6Kn2JT7QbvdNNAmQZLqWchnJEoH5)
- [React Hook PDF](https://drive.google.com/drive/folders/1WYAyusS4m498bqCR8iyzRYmS26zGh8g-)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
