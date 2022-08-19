import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({socket,username,room}) {

    const [currentMessage,setCurrentmessage] =useState("");
    const [messageList,setmessageList] =useState([])

    const sendMessage = async () =>{
        if(currentMessage !== "")
        {
            const messageData ={
                room:room,
                author:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message",messageData);
            setmessageList((list)=>[...list,messageData]);
            setCurrentmessage("");
        };
    };

     useEffect(()=>{
        socket.on("recieve_message",(data)=>{
            setmessageList((list)=>[...list,data]);
        });
    }, [socket]);

    

  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live chat- Welcome {username}!</p>
        </div>
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
            {messageList.map((content)=>{
                return (
                    <div className='message' id={username === content.author ? "other" : "you"}>
                        <div>
                            <div className='message-content'>
                                <p>{content.message}</p>
                            </div>
                            <div className='message-meta'>
                                <p id='time'>{content.time}</p>
                                <p id="author">{content.author}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type='text' value={currentMessage} placeholder="Type here.." onChange={(event)=>{
      setCurrentmessage(event.target.value);
    }} onKeyPress={(event) => {
      event.key === "Enter" && sendMessage();
    }} ></input>
            <button style={{backgroundColor:"white"}} onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat

