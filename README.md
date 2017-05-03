# react-firebase-hoc
React [Higher Order Components](https://facebook.github.io/react/docs/higher-order-components.html) for Firebase. Compatible with React and React Native.

[![npm version](https://badge.fury.io/js/react-firebase-hoc.svg)](https://badge.fury.io/js/react-firebase-hoc)


## Requirements
- Bundler that supports ES7 Async/await (Both [CRA](https://github.com/facebookincubator/create-react-app) and [CRNA](https://github.com/react-community/create-react-native-app) supported it)

## How to use
1. Install the package
   ```sh
   npm install react-firebase-hoc
   ```

2. Use them on your component
   ```js
   import * as firebase from 'firebase';
   import { FetchOnce } from 'react-firebase-hoc';

   const firebaseConfig = {...};
   const firebaseApp = firebase.initializeApp(firebaseConfig);

   /**
    * later after component declaration...
    * 1st param is the firebaseApp instance
    * 2nd param is the namespace for the fetched data
    * 3rd param is the callback, (db, props, state)
    */
   const MyComponentWithData = FetchOnce(firebaseApp, 'users',
    (db) => db.ref('users'))(MyComponent)

   // or you can use it as decorator too
   @FetchOnce(firebaseApp, 'users', (db) => db.ref('users'))
   class MyComponent extends React.Component {...}
   ```

3. You'll get the injected props on your component
   ```js
   // users is the namespace specified on the first param of HOC
   console.log(this.props.users.loading) // true/false
   console.log(this.props.users.error) // null/object
   console.log(this.props.users.data) // null/object
   ```

## Callback parameters
You also have access to the props and state on the callback HOC

```js
@FetchOnce(firebaseApp, 'users', (db, props, state) => db.ref(`users/${props.userId}`))
```

## Tips
You can re-wrap the HOC if you always use one firebaseApp instance, for example:
```js
import * as firebase from 'firebase';
import { FetchOnce as FetchOnceOrig } from 'react-firebase-hoc';

const firebaseConfig = {...};
const firebaseApp = firebase.initializeApp(firebaseConfig);

function FetchOnce(propName, callback) {
  return FetchOnceOrig(firebaseApp, propName, callback);
}
```

## License
MIT
