# Dcard 2024 Frontend Intern Homework

💻 A web app built with Next.js that connects to the GitHub REST API to increase the visibility of articles written in GitHub issues!

⭐ 3 main functions:

-   list issues of specific repo with `Infinite Scroll` from GitHub REST API
-   read issue's detail (title, content, labels, comments) from GitHub REST API
-   Implement creating, editing, and deleting articles using the GitHub REST API

## DEMO

## Overview

## How To Use

### On GitHub Page

⭐ This Project had deployed on Vercel, you could try it on [**https://dcard-2024-frontend-intern-homework.vercel.app/**](https://dcard-2024-frontend-intern-homework.vercel.app/)！

### On Your Computer

1. Download this repository via `git clone`

```shell
git clone https://github.com/tsaichiehhuang/BlogHub.git
```

2. Change directories to this repository via `cd` or drag this folder and drop in terminal

```shell
cd BlogHub
```

3. Register an OAuth app on GitHub, and paste your client id , client secret in and call back URL .env file.

```shell
NEXT_PUBLIC_CLIENT_ID=
NEXT_PUBLIC_CLIENT_SECRET=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GITHUB_OWER_NAME=
NEXT_PUBLIC_GITHUB_REPO_NAME=
```

4.  Run this React app

```shell
npm install
npm start
```

and open [**http://localhost:3000**](http://localhost:3000) on your computer.

## Project Architecture

### Packages

This project uses three main packages:

-   **Next.js (App router):** for building react app
-   **TypeScript:** supplementing the weak typing of JavaScript
-   **TailwindCSS + NextUI:** for styling the website

### Pages

-   every page will have [Header](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/header/Header.tsx)
-   [Home](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/app/page.tsx)：route at `/`
-   [Article](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/app/article/%5Bid%5D/page.tsx)：route at `/article/{issueNumber}`

#### Home

home page to show Dainel's intro and articles

#### Article

show issues details

### Components

#### [Header](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/header/Header.tsx)

The header contains a logo that serves as a link to the homepage, as well as a [login](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/header/LoginButton.tsx)/logout button.

#### [Error](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/Error.tsx)

When the API response contains an error, display the corresponding error messages on the page.

#### [IsLogin](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/IsLogin.tsx)

Check if the user is logged in and display the relevant content (e.g., create article button, edit article button).

## Learn More

### Responsive Web Design

Thanks to the combination of TailwindCSS and NextUI, our React app can seamlessly adapt to various devices, providing an enhanced user experience!

### Better User Experience on small Devices

-   Change the display of articles from three per row to one per row.
-   Omit the self-introduction image.
-   Replace the edit/delete buttons for articles with icons.
