import { Avatar } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import { SearchOutlined, AttachFile, MoreVert } from '@mui/icons-material'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';

import { useState, useEffect } from 'react';
import React from 'react'
import './Chat.css'
import db from '../firebase';
import { useStateValue } from '../StateProvider';


function Chat() {
  const [input, setpInput] = useState('');
  const [seed, setSeed] = useState('');
  const [roomName, setRoomName] = useState('');
  const { roomId } = useParams()
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot((snapshot) => (
        setRoomName(snapshot.data().name)
      ))
      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').
        onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data())))
        )
    }
  }, [roomId])
  useEffect(() => {
    Math.floor(
      setSeed(Math.floor(Math.random() * 5000))
    )
  }, [roomId])
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add(
      {
        message:input,
        name: user.displayName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      }
    )
    setpInput("")
  }
  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p> last seen {
              new Date(
                messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
              }</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>

      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p className={`chat__message ${user.displayName===message.name?'chat__reciever':''}`}>
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
          </p>


        ))}

      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form >
          <input value={input} onChange={(e) => setpInput(e.target.value)} type="text" placeholder='Type a message' />
          <button data="extra data" onClick={sendMessage} type='submit'>Send message</button>
        </form>
        <MicIcon />
      </div>

    </div>
  )
}

export default Chat