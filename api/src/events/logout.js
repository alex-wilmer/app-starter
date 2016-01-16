import chalk from 'chalk'
import { getRooms, setRooms } from '../state/rooms'

export default ({
  socket
}) => {
  socket.on(`ui:logout`, ({ username }) => {
    let rooms = getRooms()

    rooms.forEach(
      x => x.users = x.users.filter(x => x.username !== username)
    )

    rooms = rooms.filter(x => x.users.length)

    socket.broadcast.emit(`api:updateRooms`, { rooms })

    console.log(chalk.magenta(
      `${username} has logged out. Number of rooms: ${rooms.length}`
    ))

    setRooms({ rooms })
  })
}
