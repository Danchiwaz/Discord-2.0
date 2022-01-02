import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { PlusIcon, ChevronDownIcon, MicrophoneIcon, PhoneIcon, CogIcon } from '@heroicons/react/outline'
import { useCollection } from 'react-firebase-hooks/firestore';
import {auth, db} from '../firebase'
import ServerIcon from './ServerIcon'
import Channel from './Channel'
import Chat from './Chat';

const Home = () => {

    const [ user ] = useAuthState(auth)
    const [channels] = useCollection(db.collection("channels"))

    const handleAddChannel = () =>{
        const channelName = prompt("Enter a new Channel name")

        if(channelName){
            db.collection("channels").add({
                channelName:channelName
            })
        }
    }


    return (
        <>
        {
            !user && <Navigate to='/' />
        }
        <div className="flex h-screen">
            <div className="flex flex-col space-y-3 bg-[#202225] p-3 min-w-max">
                <div className="server-default hover:bg-discord_purple">
                    <img src="https://rb.gy/kuaslg" alt="img"  className="h-5" />
                </div>
                <hr className="border-gray-700 border w-8 mx-auto" />
                <ServerIcon image="https://rb.gy/qidcpp" />
                <ServerIcon image="https://rb.gy/zxo0lz" />
                <ServerIcon image="https://rb.gy/qidcpp" />
                <ServerIcon image="https://rb.gy/zxo0lz" />
                <div className='server-default hover:bg-discord_green group'>
                    <PlusIcon className='text-discord_green h-7 group-hover:text-white' />
                </div>
                
            </div>

            <div className='bg-[#2f3136] flex flex-col min-w-max '>
                <h2 className='flex text-white text-bold text-sm border-b border-gray-800 p-4 hover:bg-[#34373c] cursor-pointer justify-between items-center' >
                    Official Danchi server...<ChevronDownIcon className='h-5 ml-2' />
                </h2>

                <div className='text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide'>
                    <div className="flex items-center p-2 mb-2">
                        <ChevronDownIcon className='h-3 ml-2' />
                        <h4 className="font-semibold">Channels</h4>
                        <PlusIcon className="h-6 ml-auto cursor-pointer hover:text-white" onClick={handleAddChannel} />
                    </div>

                    <div className="flex flex-col space-y-2 mb-4 px-2">
                        {
                            channels?.docs.map((doc) => {
                                return(
                                    <Channel key={doc.id} id={doc.id} channelName={ doc.data().channelName } />
                                )
                            })
                        }
                    </div>
                </div>

                <div className='bg-[#292b2f] flex p-2 justify-between items-center space-x-8'>
                    <div className='flex items-center space-x-1'>
                        <img src={ user?.photoURL } alt="" className='h-10 rounded-full cursor-pointer' onClick={() => auth.signOut()} />
                        <h4 className="text-white text-sm font-medium">
                            { user?.displayName }
                            <span className="text-[#b9bbbe] block">
                                #{ user?.uid.substring(0, 4) }
                            </span>
                        </h4>
                    </div>

                    <div className='text-gray-400 flex items-center'>
                        <div className='icon-def'>
                            <MicrophoneIcon className='h-5 icon' />
                        </div>
                        <div className='icon-def'>
                            <PhoneIcon className='h-5 icon' />
                        </div>
                        <div className='icon-def'>
                            <CogIcon className='h-5 icon' />
                        </div>
                    </div>

                </div>
            </div>
            
            {/* message section */}

            <div className='bg-[#36393f] flex-grow'>
                <Chat />
            </div>

        </div>
            
        </>
    )
}

export default Home
