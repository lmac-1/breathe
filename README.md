# Breathe

## Why I Built This

Since starting freediving, I have discovered the importance and power of breathing exercises. Controlled breathing not only helps with relaxation and focus, but also improves lung capacity and overall wellbeing.

I wanted to create a simple application that would allow me to easily practice different breathing techniques and configure breath lengths to suit my needs.

## About the Project

This is a simple application to practice the following breathwork exercises:

- Resonant breathing – Inhaling 5.5 seconds, exhaling 5.5 seconds
- Equal breathing – Inhaling and exhaling for the same count with no break
- Box breathing – Inhaling, holding, exhaling, and holding for the same count
- 4-7-8 breathing – 5 rounds of inhaling for 4 seconds, holding for 7 seconds, and exhaling for 8 seconds

The application also has the following configurable settings:

- Length of session (all breathing exercises apart from 4-7-8 breathing)
- Length of breath phase (box breathing and equal breathing)
- Guided audio (on or off)

## How to run the project

First clone the repository and navigate to the project folder.

Next, run:

`npm install`

Start the development server:

`npm run dev`

This will start the app, usually at https://localhost:3000

## Tech stack

- React + Next.js: UI and Routing
- [`use-sound`](https://github.com/joshwcomeau/use-sound): Audio playback
- TailwindCSS: Styling

## Features

- Guided breathwork with breathing animation
- Optional narration
- Customisable options for different breathing exercises

Please note that on mobile your phone must be on "loud" in order to hear the narration.

## Deployment

This app is currently live at http://breathe-lime.vercel.app/
