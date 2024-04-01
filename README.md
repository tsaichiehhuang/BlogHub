# BlogHub: Elevating GitHub Issues Visibility

> **Using Next.js to integrate with the GitHub REST API, this blog web app combines a tech-forward, personalized, and professional visual design, along with providing an excellent user experience, all aimed at enhancing the visibility of GitHub issues articles!**

⭐ 3 main functions:

-   List issues with `Infinite Scroll` from GitHub REST API
-   Show details of an issue (including title, content, labels, and comments) from the GitHub REST API.
-   Implement article and comment creation, editing, and deletion using the GitHub REST API

<img width="600" alt="demo" src="https://github.com/tsaichiehhuang/BlogHub/blob/main/public/DEMO.gif">

## Overview

1. [**How To Use**](https://github.com/tsaichiehhuang/BlogHub?tab=readme-ov-file#1-how-to-use)
    - On GitHub Page
    - On Your Computer
2. [**Project Architecture**](https://github.com/tsaichiehhuang/BlogHub?tab=readme-ov-file#2-project-architecture)
    - Packages
    - Pages
        - Home
        - Article
    - Components：used not only on one page
        - Header
        - Error
        - IsLogin
3. [**Learn More**](https://github.com/tsaichiehhuang/BlogHub?tab=readme-ov-file#3-learn-more)
    - Responsive Web Design
    - Error Handling
    - Skeleton Screen Loading

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
-   list issues with `Infinite Scroll` from GitHub REST API

|                                                                                                                                        |                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| <img width="600" alt="home-gif" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/82f57486-2fe8-4c83-8ce7-cd583b74de86"> | <img width="300" alt="image" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/8bb72405-8ad7-41c2-a5a3-06b4bcd58d98"> |

-   After logging in, the system will determine whether the user is the author of the post, if yes, the user can create posts.

    #### 📌 Create Post

    <img width="600" alt="發布文章" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/2f02ea62-02fc-457d-8a43-d34fb107566a">

#### (2) Article

-   show issues details including tilte, blody, labels, create date and comments.
    <img width="500" alt="image" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/3c33d65b-6ecd-401f-9c34-d2c85df809ac">

-   After logging in, the system will determine whether the user is the author of the post.

    - If yes (author): The user has the ability to create, edit, and delete both articles and comments.
    - If not (common user): Users are only able to create, edit, or delete their own comments.

    ### Post
    #### 📌 Edit Post

    <img width="600" alt="編輯文章" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/19f93155-3a9f-4871-9248-5d6fc54da95a">

    #### 📌 Delete Post

    <img width="600" alt="刪除文章" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/ccf1fedb-06f3-4d6b-b48c-7c85a0d59a9e">

    ### Comment

    Implement **Optimistic UI updates** to immediately display comments after creating, editing, or deleting them.
       
    #### 📌 Create Comment

    <img width="600" alt="創建留言" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/d6128dff-8769-4257-a475-fb6b49ee278b">

    #### 📌 Edit Comment

    <img width="600" alt="編輯留言" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/0cd7c0e7-9364-4688-a676-bebd61552512">

    #### 📌 Delete Comment

    <img width="600" alt="刪除留言" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/2caebe3b-dd40-4253-995a-f95a62ea9d71">

### 【Components】

#### (1) [Header](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/header/Header.tsx)

-   The header contains a logo that serves as a link to the homepage, as well as a [login](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/header/LoginButton.tsx)/logout button.
-   Show user's name after login

#### (2) [Error](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/Error.tsx)

-   When the API response contains an error, display the corresponding error messages on the page.

#### (3) [IsLogin](https://github.com/tsaichiehhuang/BlogHub/blob/main/src/components/IsLogin.tsx)

-   Check if the user is logged in and display the relevant content (e.g., create article button, edit article button).
-   Also check if the user is author or common user

## 3. Learn More

### ✅ Responsive Web Design

Thanks to the combination of TailwindCSS and NextUI, our React app can seamlessly adapt to various devices, providing an enhanced user experience!

#### Better User Experience on small Devices

-   Change the display of articles from three per row to one per row.
-   Omit the self-introduction image.
-   Replace the edit/delete buttons for articles with icons.

    <img width="150" alt="手機rwd" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/487652ec-1797-4d06-9c8b-d00a5ff69920">

### ✅ Error Handling

-   When fetch API, display the corresponding icon and information if there is an error response.
-   Functions such as publishing and editing articles will also provide error responses when there are API call errors.

    <img width="600" alt="錯誤訊息" src="https://github.com/tsaichiehhuang/BlogHub/assets/112929952/6a36806c-5ec7-4bfc-9510-01a56759f31c">

### ✅ Skeleton Screen Loading

-   Before data loading, utilize placeholders in the form of colored blocks to present the page structure and data positions to the user.
-   Create an anticipation of content "about to appear" rather than focusing entirely on "waiting time", **optimizing the user experience**!
