This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:


### `yarn serve`

Starts the node server with the express app that connects to the twitter api.<br />

<b>In order to get access to the Twitter API, set local node env variables by running</b>
REACT_APP_CONSUMER_KEY=yourOwnConsumerKey REACT_APP_CONSUMER_SECRET=yourOwnConsumerSecret REACT_APP_ACCESS_TOKEN=yourOwnToken REACT_APP_ACCESS_TOKEN_SECRET=yourOwnTokenSecret yarn serve

### `yarn start`

Runs the app in the development mode. Run this in a new tab after running `yarn serve`<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The api request will only work on server 3000.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
