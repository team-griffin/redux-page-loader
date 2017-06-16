# redux-page-loader

```sh
npm install --save @team-griffin/redux-page-loader
```

```sh
yarn add @team-griffin/redux-page-loader
```

This module allows you to embed static html into your page, and then
when the page is ready to be shown easily remove it.

## Requirements
- redux
- redux-most

## Usage

### Static HTML
Your static html and css should live within your own project, and how you put it into
the page is your own choice. We recommend using webpack with the html plugin.

For example:
```javascript
// static.js
module.exports = {
  html: () => {
    return `
      <div class="page-loader">
        <div class="fancy-spinner"></div>
      </div>
    `;
  },

  css: () => {
    return `
      <style>
        .page-loader > .fancy-spinner {
          background: red;
        }
      </style>
    `;
  }
};

// webpack.config
const HtmlWebpackPlugin = require('html-webpack-plugin');
const staticPageLoader = require('../somelocation/static');

new HtmlWebpackPlugin({
  ...
  pageLoader: {
    css: staticPageLoader.css(),
    html: staticPageLoader.html(),
  }
})

// index.ejs
<head>
  ...
  <%= htmlWebpackPlugin.options.pageLoader.css %>
</head>
<body>
  <div id="root"></div>
  <%= htmlWebpackPlugin.options.pageLoader.html %>
</body>

```

### Static Page Destroyer
You obviously want to remove the static html from the page at some point.
This package takes care of actually removing the element from the DOM, but it gives you a chance to handle how to tranisition it out before it is removed.

### Page Guard
We provide a component which will not render your component until the page is ready.
Once it has determined the page is ready it will render your component behind the static page until the static page is removed.

This is a connected component.

```jsx
<PageGuard
  pageComponent={() => {
    return (
      <MyComponent/> // <-- This is your application
    );
  }}
  destroyerProps={{
    component: StaticPageDestroy, // <-- This is your transition component
    propsToPass,
    morePropsToPass,
  }}
/>
```

### Setup
This module uses epics to handle business logic, and reducers to handle state.

```javascript
// Reducer
import { reducer as pageLoader } from '@team-griffin/redux-page-loader';

combineReducers({
  pageLoader,
});

// Epics
import { createEpicMiddleware, combineEpics } from 'redux-most';
import { pageLoaderEpics } from '@team-griffin/redux-page-loader';

createEpicMiddleware(combineEpics([
  pageLoaderEpics,
]));
```

### Loaded and Configuration
There is a signal to update the module configuration.

*The default config is:*
```javascript
{
  delay: 2000, // How long the transition takes (before being removed)
  domSelector: '.page-loader', // How to find the element to remove
}
```

*Changing the config*
```javascript
import { signals } from '@team-griffin/redux-page-loader';

store.dispatch(signals.configure({
  delay: 1000,
}));
```

Somewhere in your logic your application will have determined it is ready.
You can signal that your application is loaded via:
```
import { messages } from '@team-griffin/redux-page-loader';

store.dispatch(messages.loaded());
```