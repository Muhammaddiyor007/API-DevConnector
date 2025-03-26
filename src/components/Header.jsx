import React, { useContext, useState } from 'react'
import { FaCode, FaMoon, FaUser } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { MdLightMode } from "react-icons/md";
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdLogout } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/ContexApi'

function Header() {
    const { langth, langhtSet, isToken, isTokenSet, them, themSet } =
        useContext(AppContext)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    function Logout() {
        isTokenSet(false)
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <header className='fixed top-0 left-0 w-full z-40'>
            <div className='bg-grayBg w-full h-[65px] flex items-center text-white px-[40px] border-b-solid border-b-[1px] border-b-primary justify-between'>
                <Link
                    className='flex items-center gap-2 text-2xl font-bold hover:text-primary transition duration-300'
                    to='/'
                >
                    <FaCode />
                    <span>DevConnector</span>
                </Link>

                <nav className='hidden md:flex items-center gap-6 text-lg'>
                    <button onClick={() => themSet(!them)} className='hover:text-primary transition duration-300'>
                        {them ? <FaMoon /> : <MdLightMode />}
                    </button>
                    <button onClick={() => langhtSet(!langth)} className='hover:text-primary transition duration-300'>
                        {langth ? 'En' : 'Uz'}
                    </button>
                    <Link to='/developers' className='hover:text-primary transition duration-300'>Developers</Link>

                    {!isToken && (
                        <>
                            <Link to='/registration' className='hover:text-primary transition duration-300'>Register</Link>
                            <Link to='/login' className='hover:text-primary transition duration-300'>Login</Link>
                        </>
                    )}

                    {isToken && (
                        <>
                            <Link to='/post' className='hover:text-primary transition duration-300'>Posts</Link>
                            <Link to='/dashboard' className='flex items-center gap-2 hover:text-primary transition duration-300'>
                                <FaUser />
                                Dashboard
                            </Link>
                            <button onClick={Logout} className='flex items-center gap-2 hover:text-primary transition duration-300'>
                                <MdLogout />
                                Logout
                            </button>
                        </>
                    )}
                </nav>

                <button onClick={() => setOpen(!open)} className='md:hidden text-2xl hover:text-primary transition duration-300'>
                    <GiHamburgerMenu />
                </button>
            </div>

            <div className={`fixed top-0 right-0 w-[75%] h-full bg-gray-900 text-white flex flex-col items-center justify-center shadow-lg transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={() => setOpen(false)} className='absolute top-5 right-5 text-3xl hover:text-primary transition duration-300'>
                    <FaXmark />
                </button>
                <nav className='flex flex-col items-center gap-6 text-lg'>
                    <Link to='/developers' className='hover:text-primary transition duration-300' onClick={() => setOpen(false)}>Developers</Link>

                    {!isToken && (
                        <>
                            <Link to='/registration' className='hover:text-primary transition duration-300' onClick={() => setOpen(false)}>Register</Link>
                            <Link to='/login' className='hover:text-primary transition duration-300' onClick={() => setOpen(false)}>Login</Link>
                        </>
                    )}

                    {isToken && (
                        <>
                            <Link to='/post' className='hover:text-primary transition duration-300' onClick={() => setOpen(false)}>Posts</Link>
                            <Link to='/dashboard' className='flex items-center gap-2 hover:text-primary transition duration-300' onClick={() => setOpen(false)}>
                                <FaUser />
                                Dashboard
                            </Link>
                            <button onClick={Logout} className='flex items-center gap-2 hover:text-primary transition duration-300'>
                                <MdLogout />
                                Logout
                            </button>
                        </>
                    )}

                    <div className='flex items-center gap-6 mt-5 text-lg'>
                        <button onClick={() => themSet(!them)} className='hover:text-primary transition duration-300'>
                            {them ? <FaMoon /> : <MdLightMode />}
                        </button>
                        <button onClick={() => langhtSet(!langth)} className='hover:text-primary transition duration-300'>
                            {langth ? 'En' : 'Uz'}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
