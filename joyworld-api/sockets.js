import { Server } from 'socket.io';

const io = new Server(8900,{
  cors:{
    origin:process.env.CLIENT_URL
  }
});

// io.on('connection', socket => {
//   console.log(socket.id + ' ==== connected');
// })

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log(socket.id + ' ==== connected');

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ receiverId,sender,text}) => {
    const user = getUser(receiverId);
    // const senderId = sender._id
    if(user){
      io.to(user.socketId).emit("getMessage",{
        receiverId,
        sender,
        text
      });
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log(socket.id + ' ==== disconnected');
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
//   // creating a room name that's unique using both user's unique username

//   socket.on('join', roomName => {
//   let split = roomName.split('--with--'); // ['username2', 'username1']

//   let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']

//   let updatedRoomName = `${unique[0]}--with--${unique[1]}`; // 'username1--with--username2'

//    Array.from(socket.rooms)
//         .filter(it => it !== socket.id)
//         .forEach(id => {
//           socket.leave(id);
//           socket.removeAllListeners(`emitMessage`);
//         });

//    socket.join(updatedRoomName);

//    socket.on(`emitMessage`, message => {
//       Array.from(socket.rooms)
//            .filter(it => it !== socket.id)
//            .forEach(id => {
//               socket.to(id).emit('onMessage', message);
//            });
//         });
//       });

//     socket.on('disconnect', () => {
//       console.log(socket.id + ' ==== disconnected');
//       socket.removeAllListeners();
//      });
//    });

export default io;