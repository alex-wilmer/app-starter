import chalk from 'chalk'
import { getRooms } from '../state/rooms'
import { getUsers, setUsers } from '../state/users'

export default ({
  socket
}) => {
  socket.on(`ui:createUser`, ({ username }) => {
    let users = getUsers()

    if (users.some(x => x.username === username)) {
      socket.emit(`api:userExists`)
    }
    else {
      users = [
        ...users.filter(x => x.id !== socket.id),
        {
          id: socket.id,
          username
        }
      ]

      socket.emit(`api:login`)
      socket.emit(`api:updateRooms`, ({ rooms: getRooms() }))

      console.log(chalk.cyan(
        `New user, ${username}, has logged in. Number of users: ${users.length}`
      ))

      setUsers({ users })
    }
  })
}
