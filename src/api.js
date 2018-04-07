import axios from 'axios'

/**
 * API provides a simple interface for dashboard to talk to `rig`.
 *
 * @see https://github.com/applait/xplex-rig/blob/master/HTTP-API-v1.md
 * @constructor
 * @example
 * var client = new API()
 * client.method(...params).then(success).catch(error)
 */
function API () {
  this._httpClient = axios.create({
    baseURL: 'https://rig-dev.xplex.online',
    timeout: 3000,
    headers: {
      'Content-type': 'application/json',
      'Authorization': (localStorage.authToken ? ('Bearer ' + localStorage.authToken) : '')
    }
  })
}

/**
 * Prepares HTTP request for API client
 *
 * @private
 * @param {string} url - The resource URL on rig. e.g., `/streams/`
 * @param {string} method - HTTP method for this request. e.g, `get`, `post`, `delete`, `patch` etc.
 * @param {object} [jsonBody] - Optional JSON seriazable object that will be sent as JSON in request body.
 * @param {object} [headers] - Custom header(s) for the particular request (OPTIONAL).
 * @return {Promise} - Promise that resolves to payload sent from rig.
 */
API.prototype.request = function request (url, method, data, headers) {
  headers = Object.assign(this._httpClient.defaults.headers, headers)
  return this._httpClient({ url, method, data, headers })
    .then(function (res) {
      if (res.data && res.data.payload) {
        return Promise.resolve(res.data.payload)
      }
      return Promise.resolve(null)
    })
    .catch(function (err) {
      return Promise.reject(err.response ? err.response.data : err.message)
    })
}

/**
 * Send a login request to rig using username and password
 *
 * @param {string} username - Username of the user
 * @param {string} password - Password of the user
 * @return {Promise} Resolves to user information if login was successful
 */
API.prototype.login = function login (username, password) {
  return this.request('/accounts/auth/local', 'post', { username, password })
    .then(payload => {
      localStorage.setItem('authToken', payload.token)
      localStorage.setItem('currentUser', payload.username)
      return Promise.resolve(payload)
    })
}

/**
 * Send a request to register for an account
 *
 * @param {string} username - Username of the user
 * @param {string} password - Password of the user
 * @param {string} email - Email of the user
 * @return {Promise} Resolves to user information if account was created successfully
 */
API.prototype.register = function register (username, password, email) {
  return this.request('/accounts/', 'post', { username, password, email })
}

/**
 * Change a logged in user's password. This is not the forgot password method.
 *
 * @param {string} oldPassword - Current password of the user
 * @param {string} newPassword - New password to replace with.
 * @return {Promise} Resolves to user information if password was successfully changed
 */
API.prototype.changePassword = function register (oldPassword, newPassword) {
  return this.request('/accounts/password', 'post', { oldPassword, newPassword })
}

/**
 * Get list of streams configured for current user. Requires authentication.
 *
 * @return {Promise} Resolves to streams info, if available
 */
API.prototype.streamList = function streamsList () {
  return this.request('/streams/', 'get')
}

/**
 * Get detail of a specific stream. Requires authentication
 *
 * @param {string} streamId - ID of the stream
 * @return {Promise} Resolves to streams info, if available
 */
API.prototype.streamDetail = function streamDetail (streamId) {
  return this.request(`/streams/${streamId}`, 'get')
}

/**
 * Create a new stream for current users. Requires authentication.
 *
 * @return {Promise} Resolves to streams info
 */
API.prototype.streamCreate = function streamCreate () {
  return this.request('/streams/', 'post')
}

/**
 * Add destination for a stream. Requires authentication.
 *
 * @param {string} streamId - ID of the stream.
 * @param {string} service - Service name, e.g. `YouTube` or `Twitch`.
 * @param {string} streamKey - Streaming key for that service
 * @return {Promise} Resolves to streams info, if available
 */
API.prototype.streamAddDestination = function streamAddDestination (streamId, service, streamKey) {
  return this.request(`/streams/${streamId}/destination`, 'post', {
    service,
    streamKey
  })
}

/**
 * Change streaming key for a given xplex stream. Requires authentication
 *
 * @param {string} streamId - ID of the stream
 * @return {Promise} Resolves to streams info, if available
 */
API.prototype.streamChangeKey = function streamChangeKey (streamId) {
  return this.request(`/streams/${streamId}/changeKey`, 'post')
}

// export the API
export default API
