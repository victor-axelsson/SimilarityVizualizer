import { getData, saveData, delData } from './persistentStorage'
import { ENV } from './env'

const LOG = ENV.LOG.NETWORK;

var buildURI = function(url) {
    if (url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1) {
        return url;
    } else {
        return ENV.BASE_URL + url;
    }
}

/**
* @author Victor Axelsson
* Validate errors
*/
const onApiError = (method, url, status, data, callback) => {
    let err;
    if (data instanceof Error) {
        err = data;
    } else {
        err = new Error();
        err.data = data;
    }
    err.method = method;
    err.url = url;
    err.status = err.status || status;

    var message = `${method} ${url} => ${status}`;
    if (data.message) {
        message += `: ${data.message}`;
    } else if (typeof (data) === 'string') {
        message += `: ${data}`;
    }
    err.message = message;
    let additionalData = data && data.data;
    err.errors = (additionalData && additionalData.errors) || (data && data.errors) || {};
    LOG && warn('[API ERROR]', err);
    callback && callback(err);
    callback = null;
};

/**
* @author Victor Axelsson
*
*/
const request = (url, method, body, callback, token) => {
    let BASE_URL = ENV.BASE_URL;
    if (true) {
        if (!!body) {
            console.log('[API REQUEST]', method + ':', BASE_URL + url, body);
        } else {
            console.log('[API REQUEST]', method + ':', BASE_URL + url);
        }
    }

    let options = {
        method: method,
        headers: getHeaders(token),
        mode: 'no-cors'
    };

    if (!!body) {
        options.body = JSON.stringify(body);
    }

    let finalUrl = BASE_URL + url;

    var responseObject = null;
    return fetch(finalUrl, options)
        .then(response => {
            responseObject = response;
            return response.text();
        })
        .catch(err => {
            onApiError(method, url, 0, err, callback);
        })
        .then(responseText => {
            var returnData = null;
            var contentType = responseObject ? responseObject.headers.get('content-type') : [];
            if (responseText && contentType != null && contentType.indexOf('json') >= 0) {
                try {
                    returnData = JSON.parse(responseText);
                } catch ( e ) {
                    return onApiError(method, url, responseObject.status,
                        `JSON error: ${e} \nResponse text: ${responseText}`, callback);
                }
            } else {
                returnData = {
                    contentType: contentType,
                    data: responseText
                };
            }
            LOG && console.log('[API RESPONSE]', method + ':', BASE_URL + url, '=>', responseObject.status, returnData);
            if (!responseObject.ok) {
                return onApiError(method, url, responseObject.status, returnData, callback);
            }
            callback && callback(null, returnData);
        });
}

/**
* @author Victor Axelsson
* Get the http headers
*/
var getHeaders = function() {
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
}

/**
* @author Victor Axelsson
* performs a HTTP Get
*/
export function get(url, callback, skipParsing) {
    fetch(buildURI(url), {
        method: 'get',
        headers: getHeaders(),
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        callback(null, json);
    }).catch(function(err) {
        callback(err, null);
    });
}

/**
* @author Victor Axelsson
* performs a HTTP Put
*/
export function put(url, payload, callback) {
    fetch(buildURI(url), {
        method: 'put',
        headers: getHeaders(),
        body: JSON.stringify(payload)
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        callback(null, json);
    }).catch(function(err) {
        callback(err, null);
    });
}

/**
* @author Victor Axelsson
* performs a HTTP Post
*/
export function post(url, payload, callback) {
    fetch(buildURI(url), {
        method: 'post',
        headers: getHeaders(),
        body: JSON.stringify(payload)
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        callback(null, json);
    }).catch(function(err) {
        callback(err, null);
    });
}

/**
* @author Victor Axelsson
* performs a HTTP Delete
*/
export function del(url, callback) {
    fetch(buildURI(url), {
        method: 'delete',
        headers: getHeaders()
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        callback(null, json);
    }).catch(function(err) {
        callback(err, null);
    });
}
