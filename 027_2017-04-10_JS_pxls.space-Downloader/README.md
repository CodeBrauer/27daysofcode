# #027 2017-04-10: pxls.space

This downloads the current canvas in original size as PNG to your computer from pxls.space. If you don't know what it is, here is the TL;DR:
You can set one colored pixel on a 2000x2000px canvas every 3 minutes. The progress is synced and thousands of people color the canvas to create some art.
This was seen first on reddit /r/place but it has ended, so there is pxls.space as alternative.

## What it does

Litte node script that downloads the current canvas and saves it as PNG-file. Great as automation for desktop backgrounds, magic-mirror modules or anything else.

## Install

Install node of cause. I used node v6.5. `npm install` or `yarn install`

## Usage

```bash
node app
```
That's it. It takes a short time and saves it to `savedImages/`.