# Lyrite - a tool to format lyrics
[![Build Status](https://travis-ci.org/kevinkace/lyrite.svg?branch=master)](https://travis-ci.org/kevinkace/lyrite)


## What is Lyrite?

A simple web-app to style song lyrics so they are easier to read when jamming. :guitar: :microphone:

## Adding custom lyrics

1. paste lyrics into the text field.
2. click "load song"

## Editing & styling lyrics

1. tools are accessible by clicking the quill icon in the top right
2. directly adjust the font size or number of columns
3. click the `edit` button edit lyrics
4. color the lyrics by clicking one of the colors, then clicking a section of lyrics

## Why?

The need for this app came from a real-world scenario; jamming with friends and needing an easy to read lyric sheet. Most sites display lyrics in a single column often taking up more than a full page.

With Lyrite you can easily have all lyrics on a single page with columns and font size adjustment. You can also color sections of lyrics making them easier to track visually.

## Technology

A single page application built with [Mithril](https://mithril.js.org/) & [Modular-CSS](https://github.com/tivac/modular-css), bundled with [Webpack](https://webpack.js.org/), and hosted on [Github Pages](https://pages.github.com/). It uses [localstorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for saving [custom songs](https://github.com/kevinkace/lyrite/blob/master/src/state/db.js).

## How to pronounce?

It's a portmanteau of "lyrics" and "write"; Lyrite.

## Contributors & Thanks

Kevin Cameron - Most things (dev, design, features)  
Neil Hagar - jamming buddy, and sounding board  
Eli Scheer - logo, and fonts

<details>
<summary>
Video of styling a song
</summary>

![demo](https://rawgit.com/kevinkace/lyrite/master/demo-imgs/demo-SLTS.gif)

</details>

<details>
<summary>
Video of adding a custom song
</summary>

![demo](https://rawgit.com/kevinkace/lyrite/master/demo-imgs/demo-custom.gif)

</details>
