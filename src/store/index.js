/* eslint-disable no-undef */
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

import rootReducer from '../reducers'

let middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
	middleware = [...middleware, logger]
} else {
	middleware = [...middleware]
}

const store = createStore(
	rootReducer,
	applyMiddleware(...middleware)
)

export const configureStore = () => {
	const persistor = persistStore(store)

	return { persistor, store }
}
