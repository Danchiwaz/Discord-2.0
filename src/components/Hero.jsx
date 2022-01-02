
import React from 'react'
import hero  from '../images/hero.png'
import hero1 from '../images/hero1.png'

const Hero = () => {
    return (
        <div className='bg-discord_blue pb-8  md:pb- scrollbar-hide'>
            <div className="p-7 py-9 h-screen sm:h-screen md:h-screen md:flex relative">
                <div className='flex flex-col gap-7 md:max-w-md lg:max-w-none md:justify-center'>
                    <h1 className='text-white text-5xl font-bold'>Your Place to talk</h1>
                    <h2 className="text-white font-light text-lg tracking-wide lg:max-w-3xl w-full">Whether you are part of a school club,
                        gaming group,worldwide art community, 
                        or just a handful of friends
                        that want to spend time together.Discord 
                        Makes it easy to talk every day and hang out more often.
                    </h2>
                    <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row md:items-start sm:items-center gap-6 scrollbar-hide'>
                        <button className='bg-white w-60 font-medium text-center rounded-full p-4 text-lg hover:shadow-2xl 
                        hover:text-discord_blurple transition duration-200 ease-in-out' type='button'>  Download for Mac</button>
                        
                        <button className='
                            bg-gray-900 text-white text-center 
                            text-lg font-medium 
                            p-4 
                            rounded-full 
                            w-72 
                            hover:shadow-2xl 
                            hover:text-discord_blurple 
                            transition 
                            duration-200 
                            ease-in-out 
                            hover:bg-gray-800'>
                            Open Discord in your Browser
                        </button>

                    </div>
                </div>

                <div className='flex-grow scrollbar-hide'>
                    <img src={ hero } alt="img1" className='absolute -left-36 mt-16  sm:-left-20 md:hidden' />
                    <img src={ hero1 } alt="img2" className='hidden md:inline absolute' />
                </div>

            </div>
        </div>
    )
}

export default Hero
