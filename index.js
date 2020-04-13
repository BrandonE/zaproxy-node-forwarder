const axios = require('axios')
const express = require('express')
const https = require('https')
const app = express()

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

const PORT = process.env.PORT || 3000
const TARGET_HOST = process.env.TARGET_HOST
const TARGET_PROTOCOL = process.env.TARGET_PROTOCOL || 'http'
const HOST_HEADER_OVERRIDE = process.env.HOST_HEADER_OVERRIDE

if (!TARGET_HOST) {
  throw new Error('Must set the TARGET_HOST via environment variable.')
}

app.all('*', async (req, res) => {
  const options = {
    url: `${TARGET_PROTOCOL}://${TARGET_HOST}${req.path}`,
    method: req.method,
    headers: req.headers,
    validateStatus: false
  }

  console.log(`${options.method} ${options.url}`)

  // https://github.com/zaproxy/zaproxy/issues/1318
  if (HOST_HEADER_OVERRIDE) {
    options.headers.host = HOST_HEADER_OVERRIDE
  }

  try {
    const response = await axiosInstance(options)

    res.set(response.headers)
    res.status(response.status)
    res.send(response.data)
  } catch (err) {
    res.status(500)
    res.send({ err: err.toString() })
  }
})

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
