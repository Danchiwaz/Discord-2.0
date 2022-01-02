import { BellIcon, ChatIcon, EmojiHappyIcon, GiftIcon, HashtagIcon, InboxIcon, PlusCircleIcon, QuestionMarkCircleIcon, SearchIcon, UsersIcon } from '@heroicons/react/outline'
import React, { useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { selectChannelId, selectChannelName } from '../features/channelSlice'
import { auth, db } from '../firebase'
import firebase from 'firebase/compat/app'
import Message from './Message'

const Chat = () => {
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [user] = useAuthState(auth)
    const inputRef = useRef("")
    const chatRef = useRef(null)
    const [messages] = useCollection(channelId && 
        db.collection("channels")
        .doc(channelId).
        collection("messages")
        .orderBy("timestamp", "asc"))

    const scrollToBottom = () =>{
        inputRef.current.scrollIntoView({
            behavior:"smooth",
            block:"start"
        })
    }

    const sendMessage = (e) =>{
        e.preventDefault()
        if(inputRef.current.value !== ""){
            db.collection("channels").doc(channelId).collection("messages").add({
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                message:inputRef.current.value,
                name:user?.displayName,
                photoURL:user?.photoURL,
                email:user?.email
            })
        }
        inputRef.current.value ="";
        scrollToBottom();
    }

    

    return (
        <div className='flex flex-col h-screen'>
            <header className='flex items-center justify-between space-x-5 border-b-2 -mt-1 p-4 border-gray-800'>
                <div className="flex items-center space-x-1">
                    <HashtagIcon className='h-6 text-[#72767d]' />
                    <h4 className='text-white font-semibold' >{ channelName }</h4>
                </div>
                <div className='flex space-x-5 items-center'>
                    <BellIcon className='icon' />
                    <ChatIcon className='icon' />
                    <UsersIcon className='icon' />
                    <div className='flex bg-[#202225] p-1 rounded-md text-xs'>
                        <input type="text" placeholder='Search' className='bg-transparent focus:outline-none pl-1 placeholder-[#72767d] text-white' />
                        <SearchIcon className='h-4 mr-1 text-gray-100' />
                    </div>
                    <InboxIcon className='icon' />
                    <QuestionMarkCircleIcon className='icon' />
                </div>
                
            </header>

            <main className='flex-grow overflow-y-scroll scrollbar-hide'>
                {
                    messages?.docs.map((doc) => {
                        const { message, name, timestamp, photoURL, email } = doc.data()
                        return (
                            <Message  key={doc.id} id={doc.id} message={message} timestamp={timestamp} photoURL ={photoURL} email ={ email } name={name} />
                        )
                    })
                }
                <div ref={chatRef} pb-16 />
            </main>
            <div className='flex bg-[#40444b] items-center mx-5 mb-7 rounded-lg p-4'>
                <PlusCircleIcon className='icon mr-4' />
                <form className='flex-grow'>
                    <input 
                     type="text" 
                     disabled={!channelId} 
                     placeholder={!channelId ? 'Select Channel' : `Message ${channelName}`}  
                     className='bg-transparent focus:outline-none text-[#dcddde] w-full text-sm placeholder-[#72767d]' 
                     ref={inputRef}
                    />
                    <button hidden type='submit' onClick={sendMessage} >Send</button>
                    
                </form>
                <GiftIcon className='icon mr-2'/>
                    <EmojiHappyIcon className='icon' />
            </div>



        </div>
    )
}

export default Chat


