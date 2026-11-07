# My Demon Slayer Productivity Tracker

A Demon Slayer themed to-do list for your desktop. Plan your day's missions, tag them by category and priority, tick them off as you go, and finish the day with a result screen that reflects how well you trained.

The look is inspired by Tanjiro's green and black checkered haori, with Nezuko pink as the accent colour.

> **Screenshots:** add your own screenshots here, for example `docs/home.png` and `docs/dashboard.png`.

## Features

- **Saved tasks**: your task list is still there when you close and reopen the app
- **Categories**: Work, Study, Home, Health or Other
- **Priorities**: High, Medium or Low, with high priority tasks listed first
- **Progress bar**: updates as you complete tasks
- **Quick entry**: press Enter to add a task, click a task to cross it off, click × to delete it
- **Finish Day screen**: shows your final progress, then clears the list for a fresh start
- **Custom themed UI**: checkered background, pink accents and an elegant serif title style

## Built with

- HTML
- CSS
- JavaScript
- [Electron](https://www.electronjs.org/) (with Electron Forge for packaging)

## Getting started

You need [Node.js](https://nodejs.org/) installed.

1. Open a terminal in the project folder
2. Install the packages:
   ```
   npm install
   ```
3. Start the app:
   ```
   npm start
   ```

An internet connection is needed for the fonts and icons, which load from Google Fonts and unpkg.

## How to use

1. Press **START** on the home screen.
2. Type a task, choose a category and a priority, then press **+** or Enter. You can add up to 7 tasks.
3. Click a task to mark it as done. Click **×** to delete it.
4. Press **FINISH DAY** to see your result. Pressing **BACK HOME** clears the task list so tomorrow starts fresh.

## Project structure

```
index.html        Home screen
dashboard.html    Task dashboard
dashboard.js      Task logic: add, save, complete, delete, progress
finishDay.html    Result screen
finishDay.js      Result logic
styles.css        All styling and the colour palette (see :root at the top)
main.js           Electron window setup
preload.js        Safe bridge between the window and the app
assets/           Images used by the app
```

## Credits

This project is built on the foundation of **GreenProductive** by Joanne Andriamahandry ([Btelgeuse](https://github.com/Btelgeuse)), originally a plain green to-do list app: <https://github.com/Btelgeuse/GreenProductive>. The original is licensed under ISC. The Demon Slayer theme, saved tasks, categories, priorities and new title design were added in this version.

## Disclaimer

This is an unofficial, non-commercial fan project. It is not affiliated with or endorsed by Koyoharu Gotouge, Shueisha, Aniplex or Ufotable. Demon Slayer: Kimetsu no Yaiba and its characters belong to their respective owners. The character images in `assets/` are not covered by this project's licence.
