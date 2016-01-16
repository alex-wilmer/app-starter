import chalk from 'chalk'
import { getRooms, setRooms } from '../state/rooms'
import { getUsers, setUsers } from '../state/users'

export default ({
  socket,
}) => {
  socket.on(`disconnect`, () => {
    let rooms = getRooms()
    let users = getUsers()

    let { username } = users.filter(x => x.id === socket.id)[0]

    if (username) {
      rooms.forEach(
        x => x.users = x.users.filter(x => x.username !== username)
      )

      rooms = rooms.filter(x => x.users.length)
    }

    users = [
      ...users.filter(x => x.id !== socket.id)
    ]

    console.log(chalk.red(
      `⌧ User disconnected. Number of users: ${users.length}. `
    + `Number of rooms: ${rooms.length}`
    ))

    setRooms({ rooms })
    setUsers({ users })
  })
}
