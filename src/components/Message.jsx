import React from 'react'
import moment from 'moment'
import { TrashIcon } from '@heroicons/react/outline'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { selectChannelId } from '../features/channelSlice'
import { useSelector } from 'react-redux'



const Message = ({ id, message, name, timestamp, photoURL, email } ) => {
    const [ user ] = useAuthState(auth)
    const channelId = useSelector(selectChannelId)
    return (
        <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-[#32353b] group">
            <img src={photoURL} className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl" alt="" />
            <div className="flex flex-col">
                <h4 className='flex items-center space-x-2 font-medium'>
                    <span className='hover:underline text-white cursor-pointer text-sm'>{ name }</span>
                    <span className='text-[#72767b] text-xs'>{ moment(timestamp?.toDate().getTime()).format("lll") }</span>
                </h4>
                <p className='text-sm text-[#dcddde]'>{ message }</p>
               
            </div>
            {
                user?.email === email && (
                    <div className="text-[crimson] hover:text-white hover:hover:bg-[crimson] p-1 ml-auto rounded-sm" 
                      onClick={() => {
                        db.collection("channels").doc(channelId).collection('messages').doc(id).delete( )
                        alert("Are you sure?")
                      }  } >
                        <TrashIcon className='h-5   hidden group-hover:inline' />
                    </div>
                )
            }
        </div>
    )
}

export default Message
