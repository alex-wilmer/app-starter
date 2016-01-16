import chalk from 'chalk'
import Sentencer from 'sentencer'
import { getRooms, setRooms } from '../state/rooms'

export default ({
  io, socket
}) => {
  socket.on(`ui:createRoom`, ({ username }) => {
    let rooms = getRooms()
    let id = Sentencer.make(`{{adjective}}-{{noun}}`)

    rooms = [
      ...rooms,
      {
        id,
        owner: username,
        users: [{ username }],
        messages: [],
      }
    ]

    socket.emit(`api:createRoom`, { id })
    io.emit(`api:updateRooms`, { rooms })

    console.log(chalk.cyan(
      `New room was created with id ${id}. Number of rooms: ${rooms.length}`
    ))

    setRooms({ rooms })
  })
}
