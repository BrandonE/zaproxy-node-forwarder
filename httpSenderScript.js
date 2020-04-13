/*
OWASP ZAP script to forward all requests for the specified target domain to the Node forwarder.
https://github.com/zaproxy/community-scripts/tree/master/httpsender
*/

// eslint-disable-next-line no-unused-vars
function sendingRequest (msg, initiator, helper) {
  msg.getRequestHeader().setHeader('X-ZAP-Initiator', initiator)

  var targetDomain = '<YOUR_TARGET_DOMAIN>'
  var header = msg.getRequestHeader()
  var headerParts = header.toString().split(' ')
  var url = headerParts[1]
  var urlParts = url.split('https://' + targetDomain + ':443/')

  if (urlParts.length === 1) {
    urlParts = url.split('https://' + targetDomain + '/')
  }

  if (urlParts.length === 1) {
    urlParts = url.split('http://' + targetDomain + ':80/')
  }

  if (urlParts.length === 1) {
    urlParts = url.split('http://' + targetDomain + '/')
  }

  if (urlParts.length === 2) {
    msg.getRequestHeader().setHeader('X-ZAP-Forward', urlParts)
    var newUrl = urlParts.join('http://localhost:3000/')
    headerParts[1] = newUrl
    msg.setRequestHeader(headerParts.join(' '))
  }
}

// eslint-disable-next-line no-unused-vars
function responseReceived (msg, initiator, helper) {
  // Nothing to do here
}
