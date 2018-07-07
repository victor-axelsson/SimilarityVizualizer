import { post, del, get, put } from 'core/http'
import { CONSTANTS } from 'core/constants'
import { delData, saveData } from 'core/persistentStorage'

/**
* @author Eduard Hallberg
* @param dispatch The dispatcher that will tell the store that we have new stuff
* Logout user
*/
export function logoutUser(dispatch) {
    console.log('# logout #');

    //Clear the user from the persistent storage
    delData('user');

    //Dispatch logout event
    dispatch({
        type: CONSTANTS.LOGOUT
    });

    //Go back to the home page
    dispatch({
        type: CONSTANTS.NAVIGATE_TO_PAGE, 
        payload: {
            name: CONSTANTS.LOGIN,
            title: "Home"
        }
    }); 
}

/**
* @author Victor Axelsson
* @param dispatch The dispatcher that will tell the store that we have new stuff
* @param payload the user credentials
* @param callback Optional callback when the request is done 
* Login user
*/
export function loginUser(dispatch, payload, callback) {
    console.log('# login #');

    post('/user/login', payload, (err, res) => {
        if (!err) {

            // Check if we actually got a user back.
            if (res.user) {
                saveData('user', JSON.stringify(res.user));

                dispatch({
                    type: CONSTANTS.LOGIN,
                    payload: res.user
                });

                //Go back to the home page
                dispatch({
                    type: CONSTANTS.NAVIGATE_TO_PAGE, 
                    payload: {
                        name: CONSTANTS.HOME,
                        title: "Home"
                    }
                }); 
            }
        }


        if (!!callback) {
            callback(err, res);
        }
    });
}
