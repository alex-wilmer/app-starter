import chalk from 'chalk'
import { getRooms, setRooms } from '../state/rooms'

export default ({
  io, socket
}) => {
  socket.on(`ui:leaveRoom`, ({ id, username }) => {
    let rooms = getRooms()
    let room = rooms.filter(x => x.id === id)[0]

    if (room) {
      room.users = room.users.filter(x => x.username !== username)

      if (room.owner === username) {
        room.owner = null
      }

      rooms = [
        ...rooms.filter(x => x.id !== id),
        room
      ].filter(x => x.users.length)

      io.emit(`api:updateRooms`, { rooms })

      console.log(chalk.magenta(
        `${username} has left room ${id}. Number of rooms: ${rooms.length}`
      ))

      setRooms({ rooms })
    }
  })
}
