import { getRooms, setRooms } from '../state/rooms'

export default ({
  socket
}) => {
  socket.on(`ui:movePaddle`, ({ id, mouse, username }) => {
    let rooms = getRooms()
    let room = rooms.filter(x => x.id === id)[0]
    let user = room.users.filter(x => x.username === username)[0]

    user.mouse = mouse

    room.users = [
      ...room.users.filter(x => x.username !== username),
      user
    ]

    rooms = [
      ...rooms.filter(x => x.id !== id),
      room
    ]

    socket.broadcast.emit(`api:updateRooms`, { rooms })
    setRooms({ rooms })
  })
}
