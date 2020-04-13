# zaproxy-node-forwarder

Forward OWASP ZAP HTTP requests through a Node server to bypass limitations in setting the Host header.

## Why does this exist?

According to [this zaproxy issue](https://github.com/zaproxy/zaproxy/issues/1318), it is not currently possible to override the Host header using the ZAP Scripting engine. This is apparently a non-trivial fix due to a dependency on an old Apache HTTP client. By running traffic through this Node server, this limitation can be bypassed.

## Usage

* Replace `<YOUR_TARGET_DOMAIN>` in `httpSenderScript.js` with the domain for which requests should be sent to the forwarder.
* Add `httpSenderScript.js` as an [HTTP Sender script in ZAP](https://github.com/zaproxy/community-scripts/tree/master/httpsender), and enable it. This will result in all requests to `<YOUR_TARGET_DOMAIN>` getting sent to `http://localhost:3000`.
* `TARGET_HOST=<HOST_TO_FORWARD_THROUGH_TO> TARGET_PROTOCOL=<http OR https, DEFAULTS TO http> HOST_HEADER_OVERRIDE<VALUE_OF_THE_Host_HEADER, DEFAULTS TO NOT BEING OVERRIDDEN> PORT=<FORWARDER PORT, DEFAULS TO 3000> npm start`
* Run an [Active Scan](https://www.zaproxy.org/docs/desktop/start/features/ascan/) through ZAP on `<YOUR_TARGET_DOMAIN>`
