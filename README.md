# Readme

Please read this document to understand the technical details of the Antler Interview Twitter Application.

If you're new, please read the `Getting Started` section.

For more details, please read the `Further Reading` section.

## Demo

Live Demo: https://antler-twitter-app.web.app/

## Getting Started

### Running locally
```
npm install

npm run start
```
**`Note:`** Connects to firebase backend, see .env files for more details

### Deploying Demo
```
npm run deploy # installs, builds and calls firebase deploy
```

## Further Reading

### Project Structure
`src/config/` &#8594; firebase and webpack configuration

`src/config/configureWebpackOverrides` &#8594; hook to configure CRA without ejecting

`src/index.tsx/` &#8594; app Entry point

`src/api/` &#8594; API integration logic

`src/common/` &#8594; shared logic among features, including hooks and components

`src/features/` &#8594; major features of the app

`public/` &#8594; assets such as index.html, images

`build/` &#8594; app distributable will be avaliable here after building


### Known Issues

**Notes on Twitter API**

Currently our twitter api can only access v2 api. To support media uploads (v1.1 Twitter API required) an elevated api authorization must be applied and approved.

After successful approval please toggle the feature flag in .env to turn on media upload feature.

### Technology Stack
* [Ant Design System](https://ant.design/)
* [Axios](https://axios-http.com/)
* [CRA](https://github.com/facebook/create-react-app)
* [Emotion](https://emotion.sh/)
* [Firebase](https://firebase.google.com/)
* [React](https://reactjs.org/)
* [Rowy](https://www.rowy.io/)
* [Typescript](https://typescriptlang.org/)

## Supported Languages
- English (en)
