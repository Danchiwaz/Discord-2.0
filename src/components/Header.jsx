import React from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebase'


const Header = () => {

    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const signIn = (e) =>{
        e.preventDefault();

        auth.signInWithPopup(provider).then(() => navigate("/channels")).catch((error) => {
            alert(error.message)
        })

    }

    return (
        <header className='flex justify-between items-center py-4 bg-discord_blue'>
            <a href="/">
                <img src="https://rb.gy/lm7ctl" alt="logo" className='w-40 h-12 object-contain' />
            </a>
            <div className='hidden lg:flex space-x-6 text-white lg:pr-2'>
                <a className='link'>Download</a>
                <a className='link'>Why Discord?</a>
                <a className='link'>Nitro</a>
                <a className='link'>Safety</a>
                <a className='link'>Support</a>
            </div>
            <div className="flex space-x-4">
                <button className='bg-white p-2 rounded-full text-xs md:text-sm focus:outline-none px-4 hover:shadow-2xl
                 hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium' onClick={!user ? signIn : () => navigate("/channels")}>
                    {
                        !user ? "Login" : "Open Discord"
                    }
                </button>
                <MenuIcon className='text-white cursor-pointer h-9 lg:hidden' />
            </div>
        </header>
    )
}

export default Header
 