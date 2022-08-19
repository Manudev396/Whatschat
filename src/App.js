import './App.css';
import io from 'socket.io-client';
import {useState} from 'react';
import Chat from '../src/Chat'
const socket=io.connect("https://whats-up-msg.herokuapp.com/");

function App() {

  const  [username,setUsername] = useState("");
  const  [room,setRoom] = useState("");
  const  [showChat,setShowchat] = useState(false);

  const joinRoom = ()=>{
    if(username !== "" && room !== "")
    {
      socket.emit("join_room",room);
      setShowchat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? 
      <div className='joinChatContainer'>
      <h3 style={{color:"white"}}> Chat Now</h3>
    <input type="text" placeholder="Name" onChange={(event)=>{
      setUsername(event.target.value);
    }} />
    <input type="text" placeholder="Room ID"  onChange={(event)=>{
      setRoom(event.target.value);
    }} />
    <button onClick={joinRoom}>Join Chat</button>
      </div>
      :
      <Chat socket={socket} username={username} room={room} />
      }
    </div>
  );
}

export default App;

