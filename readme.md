# Lyrite - a tool to format lyrics

[![Netlify Status](https://api.netlify.com/api/v1/badges/8fc9f924-59cb-42ae-8a9e-3a16db1bccd6/deploy-status)](https://app.netlify.com/sites/effervescent-valkyrie-30f7c5/deploys)

## What is Lyrite?

A simple web-app to style song lyrics so they are easier to read when jamming. :guitar: :microphone:

![Lyrite app screenshot](https://github.com/kevinkace/lyrite/blob/v2/public/lyrite-screenshot.png?raw=true)

**[Read the v2 announcement](https://v2.lyrite.com/docs/announcing-lyrite-v2)**

**🌐 https://v2.lyrite.com**

## Why?

The need for this app came from a real-world scenario; jamming with friends and needing an easy to read lyric sheet. Most sites display lyrics in a single column often taking up more than a full page.

With Lyrite you can easily have all lyrics on a single page with columns and font size adjustment. You can also color sections of lyrics making them easier to track visually.

## Pages

- `/`
    - link to `/songs/new`
    - listing of demo songs
- `/songs`
    - anon: listing of demo songs
    - user: listing of user songs
- `/songs/new`
    - song form
        - anon: creates public song
        - user: creates song
- `/songs/{guid}`
    - public: song
    - private: 404
- `/users`
    - listing of user songs
- `/users/{userId}`
    - anon: listing of {user} public songs
    - user: listing of {user} public songs
- `/users/{userId}/{slug}`
    - anon: private: 404
    - anon: public: song
    - {user}: song
- `/login`
    - anon: login form
    - user: redirect to `/`
- `/logout`
    - anon: redirect to `/`
    - user: force logout
- `/profile`
    - anon: redirect to `/`
    - user: user profile
        - listing of songs

## Technology

- NextJS
- Supabase

## How to pronounce?

It's a portmanteau of "lyrics" and "write" - *lee-rite*.

## Contributors & Thanks

- **Kevin Cameron** - Most things (dev, design, features)
- **Neil Hagar** - jamming buddy, and sounding board
- **Eli Scheer** - logo, and fonts
