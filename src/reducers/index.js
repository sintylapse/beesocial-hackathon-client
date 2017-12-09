import { persistCombineReducers, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createFilter from 'redux-persist-transform-filter'

import authReducer from './authReducer.js'

const saveSubsetFilterDiaries = createFilter('authReducer', [])

const config = {
    key: 'BeeSocial',
    whitelist: ['authReducer'],
    storage,
    transforms: [
        saveSubsetFilterDiaries,
    ],
}

const rootReducer = persistCombineReducers(config, {
    authReducer,
})

export default rootReducer
