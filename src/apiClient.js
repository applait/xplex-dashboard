import axios from 'axios'

/**
 * APIClient provides a simple interface for dashboard to talk to `rig`.
 *
 * @see https://github.com/applait/xplex-rig/blob/master/HTTP-API-v1.md
 * @param {object} [config={}] - Configuration object for the API client.
 * @param {string} [config.baseUrl='https://rig.xplex.me'] - Base URL of rig's HTTP Server.
 * @param {string} [config.token] - Pass an authorization token if there is one already.
 * @constructor
 * @example
 * var client = new APIClient({ baseURL: 'https://rig-dev.xplex.online' })
 * client.login('foobar', 'fluffy123').then(loginSuccess).catch(loginError)
 */
function APIClient (config = {}) {
  this._token = config.token || ''
  this._httpClient = axios.create({
    baseURL: config.baseUrl || 'https://rig.xplex.me',
    timeout: 3000,
    headers: {
      'Content-type': 'application/json'
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
 * @param {boolean} [authRequired=true] - If true, sets the `Authorization` header with the available token.
 * @return {Promise} - Promise that resolves to payload sent from rig.
 */
APIClient.prototype.request = function request (url, method, data, authRequired = true) {
  if (authRequired && !this._token) {
    const needAuthErr = new Error('Need to log in first')
    return Promise.reject(needAuthErr)
  }
  return this._httpClient({
    url,
    method,
    data,
    headers: {
      'Authorization': `Bearer ${this._token}`
    }
  })
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
APIClient.prototype.login = function login (username, password) {
  return this.request('/accounts/auth/local', 'post', { username, password }, false)
    .then(payload => {
      this._token = payload.token
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
APIClient.prototype.register = function register (username, password, email) {
  return this.request('/accounts/', 'post', { username, password, email }, false)
}

/**
 * Get list of streams configured for current user. Requires authentication.
 *
 * @return {Promise} Resolves to streams info, if available
 */
APIClient.prototype.streamList = function streamsList () {
  return this.request('/streams/', 'get')
}

/**
 * Get detail of a specific stream. Requires authentication
 *
 * @param {string} streamId - ID of the stream
 * @return {Promise} Resolves to streams info, if available
 */
APIClient.prototype.streamDetail = function streamDetail (streamId) {
  return this.request(`/streams/${streamId}`, 'get')
}

/**
 * Create a new stream for current users. Requires authentication.
 *
 * @return {Promise} Resolves to streams info
 */
APIClient.prototype.streamCreate = function streamCreate () {
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
APIClient.prototype.streamAddDestination = function streamAddDestination (streamId, service, streamKey) {
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
APIClient.prototype.streamChangeKey = function streamChangeKey (streamId) {
  return this.request(`/streams/${streamId}/changeKey`, 'post')
}

// export the APIClient
module.exports = APIClient
