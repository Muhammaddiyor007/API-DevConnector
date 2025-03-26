import React, { useContext, useState } from 'react'
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios/axios'
import { AppContext } from '../context/ContexApi'

function Login() {
	const { langth, isTokenSet, them, isToken } = useContext(AppContext)
	const [isError, isErrorSet] = useState(false)
	const [email, emailSet] = useState('')
	const [password, passwordSet] = useState('')
	const [error, setError] = useState(null)
	const [loading , loadingSet] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()

	setTimeout(() => {
		if (isToken) {
			return navigate('/')
		}
	}, 0)

	function Submit(event) {
		event.preventDefault()
		loadingSet(true)
		axios
			.post('/api/auth', {
				email,
				password,
			})
			.then(res => {
				const apiData = res.data
				if (apiData.token && apiData.token.trim() !== '') {
					localStorage.setItem('token', apiData.token)
					isTokenSet(true)
					navigate('/dashboard')
				}
			})
			.catch(error => {
				setError(error.response.data.errors[0].msg)
				isErrorSet(true)
				loadingSet(false)
			})
	}

	return (
		<div className='relative max-w-7xl mx-auto px-[50px]'>
			<div
				style={{ backgroundColor: them ? 'white' : '#293133', color: them ? 'black' : 'white' }}
				className='bg-white w-full px-[20px] md:px-[60px] h-[calc(100vh-70px)] pt-[30px] relative'
			>
				<form onSubmit={Submit}>
					<h2 className='text-primary text-[48px] font-bold mb-[16px]'>
						{langth ? 'Sign In' : `Tizimga kirish`}
					</h2>
					<h2 className='flex gap-[10px] items-center text-[24px] mb-[16px]'>
						<FaUser /> {langth ? 'Sign Into Your Account' : `Hisobingizga kiring`}
					</h2>

					<label>
						<input
							type='email'
							placeholder='Email'
							className='border-[1px] border-solid border-gray-400 text-black w-full p-[7px] text-[20px]'
							onChange={e => emailSet(e.target.value)}
						/>
					</label>

					<label className='relative block'>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							className='border-[1px] border-solid border-gray-400 text-black w-full p-[7px] text-[20px] my-[20px]'
							onChange={e => passwordSet(e.target.value)}
						/>
						<span
							onClick={() => setShowPassword(!showPassword)}
							className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600'
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</label>

					<button className='px-[21px] py-[7px] bg-primary text-[16px] text-white mb-[20px]'>
						{langth ? 'Login' : `Tizimga kirish`}
					</button>

					<p className='text-[16px]'>
						{langth ? `Don't have an account?` : `Hisobingiz yo'qmi?`}{' '}
						<Link to='/registration' className='text-primary'>
							{langth ? 'Sign Up' : `Ro'yxatdan o'tish`}
						</Link>
					</p>
				</form>

				<div className={`${isError ? 'scale-1' : 'scale-0'} flex justify-center items-center rounded-[4px] duration-[1s] absolute top-[50px] right-[50px] bg-red-600 text-white font-bold w-[200px] h-[80px]`}>
					<h1>{error}</h1>
				</div>
			</div>

			<div className={`${loading ? 'flex' : 'hidden'} items-center justify-center h-screen fixed inset-0 bg-slate-400/75 text-[20px]`}>
				<h1>Loading...</h1>
			</div>
		</div>
	)
}

export default Login
