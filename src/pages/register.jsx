import React, { useContext, useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios/axios';
import { AppContext } from '../context/ContexApi';

function Registration() {
	const { langth, isTokenSet, them, isToken } = useContext(AppContext);

	const [name, nameSet] = useState('');
	const [email, emailSet] = useState('');
	const [password, passwordSet] = useState('');
	const [confirmPassword, confirmPasswordSet] = useState('');
	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const navigate = useNavigate();

	setTimeout(() => {
		if (isToken) {
			return navigate('/');
		}
	}, 0);

	function Submit(event) {
		event.preventDefault();
		axios
			.post('/api/users', {
				name,
				email,
				password,
			})
			.then((res) => {
				const apiData = res.data;
				console.log(apiData);

				if (apiData.token && apiData.token !== '') {
					localStorage.setItem('token', apiData.token);
					isTokenSet(true);
					navigate('/dashboard');
				}
			})
			.catch(function (error) {
				if (error.response) {
					setError(error.response.data.errors[0].msg);
				}
			})
			.finally(() => {
				console.log('ok');
			});
	}

	return (
		<div className='max-w-7xl mx-auto px-[50px]'>
			<div
				style={{
					backgroundColor: them ? 'white' : '#293133',
					color: them ? 'black' : 'white',
				}}
				className='bg-white md:px-[60px] h-[calc(100vh-70px)] pt-[30px]'
			>
				<h1>{error}</h1>
				<form action='' onSubmit={Submit}>
					<h2 className='text-primary text-[48px] font-bold mb-[16px]'>
						{langth ? 'Sign Up' : 'Roʻyxatdan oʻtish'}
					</h2>
					<h2 className='flex gap-[10px] items-center text-[24px] mb-[16px]'>
						<FaUser /> {langth ? 'Create Your Account' : 'Hisobingizni yarating'}
					</h2>

					<label>
						<input
							type='text'
							placeholder='Name'
							className='border-[1px] border-solid text-black border-gray-400 w-full p-[7px] text-[20px] mb-[20px]'
							onChange={(e) => nameSet(e.target.value)}
						/>
					</label>

					<label>
						<input
							type='email'
							placeholder='Email Address'
							className='border-[1px] border-solid text-black border-gray-400 w-full p-[7px] text-[20px]'
							onChange={(e) => emailSet(e.target.value)}
						/>
						<span className='text-[15px] mb-[20px] block'>
							{langth
								? `This site uses Gravatar so if you want a profile image, use a Gravatar email`
								: `Ushbu sayt Gravatar dasturidan foydalanadi, shuning uchun agar siz profil tasvirini olishni istasangiz, Gravatar elektron pochta`}
						</span>
					</label>

					<label className='relative'>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							className='border-[1px] border-solid text-black border-gray-400 w-full p-[7px] text-[20px] my-[10px]'
							onChange={(e) => passwordSet(e.target.value)}
						/>
						<span
							className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600'
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</label>

					<label className='relative'>
						<input
							type={showConfirmPassword ? 'text' : 'password'}
							placeholder='Confirm Password'
							className='border-[1px] border-solid text-black border-gray-400 w-full p-[7px] text-[20px] my-[20px]'
							onChange={(e) => confirmPasswordSet(e.target.value)}
						/>
						<span
							className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600'
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						>
							{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</label>

					<button className='px-[21px] py-[7px] bg-primary text-[16px] text-white mb-[20px]'>
						{langth ? 'Register' : `Ro'yxatdan o'tish`}
					</button>

					<p className='text-[16px]'>
						{langth ? 'Already have an account?' : `Hisobingiz bormi?`}{' '}
						<Link to='/login' className='text-primary '>
							{langth ? 'Sign In' : `Tizimga kirish`}
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Registration;
