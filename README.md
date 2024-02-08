## Frontend Knowledge Nest

Link to the deployed app [Here](https://knowledge-nest.vercel.app/)

## Summary

Knowledge Nest is a platform for people to connect over services provided/needed with an instant messaging service and posts to explore what type of skillset users are looking for. The front-end is built using VUE.js, Tailwind and Typescript. It uses Firebase authentication to login and the messaging is also connected to Firebase.

## Backend

The link to the backend can be found here https://github.com/TomMirfin/knowledge-nest-BE

## Installation & Setup

To clone the repo use the command git clone https://github.com/TomMirfin/knowledge-nest-FE

Next, install the dependencies and devDependencies by using the command npm install

Run the development server with the command npm run dev

## Installation & Setup

To begin, create an environment variable file called .env at the root level, and replace the default with your own SDKs provided by firebase.

In this file add the following lines and replace the SDKs with your own:
<br>VUE_APP_FIREBASE_API_KEY=<your_firebase_SDKS>
<br>VUE_APP_FIREBASE_AUTH_DOMAIN=<your_firebase_SDKS>
<br>VUE_APP_FIREBASE_PROJECT_ID=<your_firebase_SDKS>
<br>VUE_APP_FIREBASE_STORAGE_BUCKET=<your_firebase_SDKS>
<br>VUE_APP_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_SDKS>
<br>VUE_APP_FIREBASE_APP_ID=<your_firebase_SDKS>
<br>VUE_APP_FIREBASE_MEASUREMENT_ID=<your_firebase_SDKS>
<br>VUE_APP_PUBLISHABLEKEY=<your_firebase_SDKS>

## Versions

This is supported with Node v20.10.0 and VUE v3.4.3
