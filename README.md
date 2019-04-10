# Spotify-Friends

_An app for building playlists that both you AND your friend will love!_

## To run this app

Clone this repo to any location you like, then run the following commands:

- `npm install`
- `npm run build`
- `npm run start`

This will install dependencies, create the necessary CSS files from SASS, and call webpack to bundle everything.

## About

This is an application for building a playlist incorporating two Spotify users' music, using the [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

This app was made in React, using an Express back-end. It uses `node-sass-chokidar` to build CSS files from SASS, and Webpack bundles the JavaScript and CSS, using a Babel precompiler.

## Dependencies

- express: `^4.16.4`,
- querystring: `^0.2.0`,
- react: `^16.8.6`,
- react-dom: `^16.8.6`,
- request: `^2.88.0`,
- spotify-web-api-js: `^1.2.0`

### Development Dependencies

- @babel/core: `^7.4.3`,
- @babel/preset-env: `^7.4.3`,
- @babel/preset-react: `^7.0.0`,
- babel-loader: `^8.0.5`,
- css-loader: `^2.1.1`,
- node-sass-chokidar:`^1.3.4`,
- nodemon: `^1.18.11`,
- style-loader: `^0.23.1`,
- webpack: `^4.29.6`,
- webpack-cli: `^3.3.0`
