const axios = require('axios')
const {URLSearchParams} = require('node:url')
module.exports = {
    makeRequest({
        subUrl,
        body,
        query,
        requestType = 'GET'
    }) {
        const link = "https://api.smat-app.com"
        const test = /\/(?=\/)(?<!https:\/)/g
        let headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
        let request
        let fullURL = `${link}${subUrl}`

        // If query params are defined, add them to the end of the full url
        if (query) {
            fullURL += `?${new URLSearchParams(query).toString()}` // URLSearchParams doesn't add the beginning "?"
        }

        // Check the URL for extra forward slashes and delete them
        fullURL = fullURL.replace(test, '')

        // Check for request type
        switch (requestType.toUpperCase()) {
            case 'GET': {
                request = axios.get(fullURL, {
                    headers
                })
                break;
            }
            case 'POST': {
                request = axios.post(fullURL, body, {
                    headers
                })
                break;
            }
            case 'PUT': {
                request = axios.put(fullURL, body, {
                    headers
                })
                break;
            }
            case 'DELETE': {
                request = axios.delete(fullURL, body, {
                    headers
                })
                break;
            }
            default: {
                throw module.exports.createError(`ERROR: Request function not configured properly. Please report this error on the GitHub repository. Error:\n${e.stack}`, 'INTERNAL_ERROR', fullURL)
            }
        }

        // Return the promise request, pre set the 'then' and 'catch' clauses
        return request
            .then(response => {
                let data = {
                    headers: response.headers,
                    data: response.data
                }
                return data
            }).catch(error => {
                if (error.response) {
                    const serverError = `${error.toString()}`
                    throw module.exports.createError(serverError, `SERVER_ERROR`, fullURL)
                }
                // if its another error, just send the full error
                throw module.exports.createError(error)
            })
    },
    // currently not used outside of this file but its exported just in case
    createError(msg, code, url) {
        let error = new Error(msg)
        url ? error.url = url : false
        error.code = code ? code : 'NO_CODE_DEFINED'
        return error
    }
}