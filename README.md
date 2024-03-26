# BlogHub: Elevating GitHub Issues Visibility

> **Using Next.js to integrate with the GitHub REST API, this blog web app combines a tech-forward, personalized, and professional visual design, along with providing an excellent user experience, all aimed at enhancing the visibility of GitHub issues articles!**

⭐ 3 main functions:

-   list issues with `Infinite Scroll` from GitHub REST API
-   read issue's detail (title, content, labels, comments) from GitHub REST API
-   Implement creating, editing, and deleting articles using the GitHub REST API

## DEMO

## Overview

1. [**How To Use**](https://github.com/tsaichiehhuang/BlogHub?tab=readme-ov-file#how-to-use)
    - On GitHub Page
    - On Your Computer
2. [**Project Architecture**](https://github.com/tsaichiehhuang/BlogHub?tab=readme-ov-file#project-architecture)
    - Packages
    - Pages
        - Home
        - Article
    - Components：used not only on one page
        - Header
        - Error
        - IsLogin
3. [**Learn More**](https://github.com/tsaichiehhuang/BlogHub?tab=readme-ov-file#learn-more)
    - Responsive Web Design
    - Error Handling
    - Web Vitals

## 1. How To Use

### On GitHub Page

⭐ This Project had deployed on Vercel, you could try it on [**https://blog-hub-lime.vercel.app/**](https://blog-hub-lime.vercel.app/)！

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
NEXT_PUBLIC_GITHUB_CLIENT_ID=
NEXT_PUBLIC_GITHUB_CLIENT_SECRET=
NEXT_PUBLIC_SITE_URL=
```

4.  Run this React app

```shell
npm install
npm start
```

and open [**http://localhost:3000**](http://localhost:3000) on your computer.

## 2. Project Architecture

### 【Packages】

This project uses three main packages:

-   **Next.js (App router):** for building react app
-   **TypeScript:** supplementing the weak typing of JavaScript
-   **TailwindCSS + NextUI:** for styling the website

### 【Pages】

-   every page will have [Header](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/header/Header.tsx)
-   [Home](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/app/page.tsx)：route at `/`
-   [Article](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/app/article/%5Bid%5D/page.tsx)：route at `/article/{issueNumber}`

#### (1) Home

-   home page to show Dainel's intro and articles
-   also add `AOS scroll animate library` to add visual effect when scroll

      <img width="500" alt="image" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/924c561f-41fe-4175-b7e3-302a56a0c3eb">

-   list issues with `Infinite Scroll` from GitHub REST API
-   After logging in, the system will determine whether the user is the author of the post, if yes, the user can create posts.
    #### 📌 Create Post

#### (2) Article

-   show issues details including tilte, blody, labels, create date and comments.
    <img width="500" alt="image" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/14ff98c8-77b3-434a-b737-e314e2a78809">

-   After logging in, the system will determine whether the user is the author of the post.
    -   If yes: the user can edit, delete posts, and create comments.
    -   If not: the user can only create comments.
    #### 📌 Edit Post
    #### 📌 Delete Post
    #### 📌 Create Comment

### 【Components】

#### (1) [Header](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/header/Header.tsx)

-   The header contains a logo that serves as a link to the homepage, as well as a [login](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/header/LoginButton.tsx)/logout button.

#### (2) [Error](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/Error.tsx)

-   When the API response contains an error, display the corresponding error messages on the page.

#### (3) [IsLogin](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/IsLogin.tsx)

-   Check if the user is logged in and display the relevant content (e.g., create article button, edit article button).

## 3. Learn More

### ✅ Responsive Web Design

Thanks to the combination of TailwindCSS and NextUI, our React app can seamlessly adapt to various devices, providing an enhanced user experience!

#### Better User Experience on small Devices

-   Change the display of articles from three per row to one per row.
-   Omit the self-introduction image.
-   Replace the edit/delete buttons for articles with icons.

### ✅ Error Handling

-   When fetch API, display the corresponding icon and information if there is an error response.
-   Functions such as publishing and editing articles will also provide error responses when there are API call errors.

    <img width="300" alt="image" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/5e29c52e-cc6a-4777-a639-9a205886e7f8">

### ✅ Skeleton Screen Loading

-   Before data loading, utilize placeholders in the form of colored blocks to present the page structure and data positions to the user.
-   Create an anticipation of content "about to appear" rather than focusing entirely on "waiting time", **optimizing the user experience**!
-

### ✅ Web Vitals

-   This web app has been tested using Lighthouse, and it has received a score of 100/100.

    <img width="311" alt="image" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/eace4c53-98c6-4c49-a2df-c12a80ffdf02">
