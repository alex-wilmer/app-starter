import chalk from 'chalk'
import { getRooms, setRooms } from '../state/rooms'

export default ({
  io, socket
}) => {
  socket.on(`ui:joinRoom`, ({ id, username }) => {
    let rooms = getRooms()
    let room = rooms.filter(x => x.id === id)[0]

    room.users = [
      ...room.users,
      { username }
    ]

    rooms = [
      ...rooms.filter(x => x.id !== id),
      room
    ]

    io.emit(`api:updateRooms`, { rooms })

    console.log(chalk.green(
      `${username} has joined room ${id}.`
    ))

    setRooms({ rooms })
  })
}
