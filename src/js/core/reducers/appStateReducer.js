import { CONSTANTS } from '../constants'
import { initialState } from '../initialState'

export default function appStateReducer(state = initialState.appState, action) {
    switch (action.type) {

    	case CONSTANTS.STORE_SNAPSHOT:

    		var SNAPSHOT_MEMORY = 3

    		var newSnapshots = state.snapshots.slice(); 
    		newSnapshots.push(action.payload); 
    		
    		if(newSnapshots.length > SNAPSHOT_MEMORY){
    			newSnapshots.shift(); 
    		}

    		var newState = Object.assign({}, state, {
    			snapshots: newSnapshots
    		}); 

    		return newState; 

    	case CONSTANTS.ON_SNAPSHOT_SELECT:
    		var newState = Object.assign({}, state, {
    			selectedSnapshot: action.payload.data,
    			selectedProcessTime: action.payload.processTime
    		}); 

    		return newState; 

        case CONSTANTS.GOT_SIM_GRAPH: 
            var newState = Object.assign({}, state, {
                simGraph: action.payload,
            }); 

            return newState;

        case CONSTANTS.GOT_DISTRIBUTION: 

            console.log("GOT IT")
            var newState = Object.assign({}, state, {
                distribution: action.payload,
            }); 
            return newState;

        default:
            return state;
    }
}