import { combineReducers } from 'redux'
import appState from './reducers/appStateReducer'
import navigation from './reducers/navigationReducer'

export default combineReducers({
	appState,
	navigation
});