import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import './SidebarChat.css'
import db from '../firebase';
import { Link } from 'react-router-dom';

function SidebarChat({id, name, addNewChat}) {
    const [messages,setMessages] = useState([])
    const createChat = ()=>{
        const roomName = prompt("Enter Room Name?")
        if(roomName){
            db.collection('rooms').add({name:roomName})
        }
    }
    const [seed, setSeed] = useState('');
    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').
            onSnapshot(snapshot => (setMessages(snapshot.docs.map((doc) => doc.data())))
        )
        }
    },[])
    useEffect(() => {
        Math.floor(
            setSeed(Math.random() * 5000)
        )
       
    }, [])
    
    
    return !addNewChat?(
        <Link to={`/rooms/${id}`}>
         <div className='sidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>
                   {name['name']}
                </h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
        
    ):(
        <div  onClick={createChat} className='sidebarChat newchat'>
            <IconButton>
                <AddCircleOutlineRoundedIcon/>
            </IconButton>
            <h2> Add new chat</h2>
        </div>

    )
}

export default SidebarChat