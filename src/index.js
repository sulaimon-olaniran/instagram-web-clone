import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {  getFirestore, createFirestoreInstance } from 'redux-firestore'
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase'


import RootReducer from './store/reducers/RootReducer'
import firebase from './firebase/Firebase'




const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
  // enableClaims: true // Get custom claims along with the profile
}

const middlewares = [
  thunk.withExtraArgument(getFirebase, getFirestore)
]


const initialState = {}

const store = createStore(
  RootReducer, 
  initialState, 
  compose(
  applyMiddleware(...middlewares),
))

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance 
}



// const store = createStore(
//   RootReducer,
//   compose(
//     applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
//     reduxFirestore(firebase),
//     reactReduxFirebase(firebase, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true })
//   )
// )


  ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
  );





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
