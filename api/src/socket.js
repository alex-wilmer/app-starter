import chalk from 'chalk'
import { getUsers, setUsers } from './state/users'

// Socket Events

import {
  createRoom,
  createUser,
  disconnect,
  joinRoom,
  leaveRoom,
  logout,
  makeMove,
  movePaddle,
  sendMessage,
  setGame,
  startGame
} from './events'

export default ({ io }) => {
  io.on(`connection`, (socket) => {

    setUsers({
      users: [
        ...getUsers(),
        {
          id: socket.id
        }
      ]
    })

    console.log(chalk.yellow(
      `⚡ New connection!`
    ))

    createRoom({ io, socket })
    createUser({ socket })
    disconnect({ socket })
    joinRoom({ io, socket })
    leaveRoom({ io, socket })
    logout({ socket })
    makeMove({ io, socket })
    movePaddle({ socket })
    sendMessage({ io, socket })
    setGame({ io, socket })
    startGame({ io, socket })
  })
}
