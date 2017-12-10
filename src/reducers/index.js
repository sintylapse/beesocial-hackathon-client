import { persistCombineReducers, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createFilter from 'redux-persist-transform-filter'

import globalReducer from './globalReducer.js'

const saveSubsetFilterDiaries = createFilter('globalReducer', ['projects', 'user', 'competition'])

const config = {
    key: 'BeeSocial',
    whitelist: ['globalReducer'],
    storage,
    transforms: [
        saveSubsetFilterDiaries,
    ],
}

const rootReducer = persistCombineReducers(config, {
    globalReducer,
})

export default rootReducer
