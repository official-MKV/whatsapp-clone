import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import db from '../firebase'
import './Sidebar.css'
import SidebarChat from './SidebarChat'

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot) => {
            setRooms(snapshot.docs.map(doc => {
                return ({
                    id: doc.id,
                    data: doc.data()
                })
            }))
        })
    }, [])
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar />
                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>

                </div>

            </div>
            <div className='sidebar__search'>
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder='search or start new chat '></input>
                </div>
            </div>
            <div className='sidebar__chats'>
                <SidebarChat addNewChat />
                {rooms.map(room => {
                    return (<SidebarChat key={room.id} id={room.id} name={room.data} />)
                })}

            </div>

        </div>
    )
}

export default Sidebar