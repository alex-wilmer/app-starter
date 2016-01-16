require(`babel-core/register`)

import chalk from 'chalk'
import express from 'express'
import { Server } from 'http'
import socketIO from 'socket.io'
import socket from './src/socket'

let app = express()
let http = Server(app)
let io = socketIO(http)
socket({ io })

http.listen(8000, () => {
  console.log(chalk.white(`☆ listening on localhost:8000`))
})
