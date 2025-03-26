import { useEffect, useState } from 'react'
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'
import axios from '../axios/axios'

function PostData() {
	const { id } = useParams()
	const [user, userSet] = useState([])
	const token = localStorage.getItem('token')
	const [text, textSet] = useState('')
 	const [comment , commentSet] =useState([])

	function SubmitText(event) {
		event.preventDefault()
		axios
			.post(
				`/api/posts/comment/${id}`,
				{ text: text },
				{
					headers: {
						'x-auth-token': token,
					},
				}
			)
			.then(res => {
				Read()	
			})
			.catch(error => {
				console.log(error)
			})
	}

	useEffect(() => {
		
		Read()
		
	}, [])

	function Read(){
		axios
		.get(`/api/posts/${id}`, {
			headers: {
				'x-auth-token': token,
			},
		})
		.then(res => {
			const apiData = res.data
			commentSet(res.data.comments)
			userSet(apiData)
		})
	}

	return (
		<>
			<div className='md:px-[50px] px-[20px] py-[30px] mx-auto max-w-[1000px]'>
				<Link
					to='/post'
					className='bg-[#f4f4f4] px-[21px] py-[7px] font-medium text-[16px]'
				>
					Back To Posts
				</Link>

				<div className='flex flex-col md:flex-row gap-[50px] items-center border-gray-300 border-[1px] rounded-[4px] px-[20px] py-[10px] mx-auto max-w-[1000px] mb-[20px] mt-[30px]'>
					<div className='avatar flex justify-center items-center flex-col'>
						<div className='max-w-[170px] min-w-[170px] mx-auto'>
							<img
								src={user.avatar}
								alt=''
								className='w-full h-full rounded-[50%]'
							/>
						</div>
						<h2>{user.name}</h2>
					</div>

					<div className=''>
						<h2 className='text-[16px] mb-[10px]'>{user.text}</h2>
						<p className='text-[12.5px] text-[#AAAA] mb-[10px]'>{user.date}</p>
						<div className='flex items-center gap-[10px]'>
							<button className='h-[38px] w-[57px] bg-[#f4f4f4] flex justify-center items-center text-[20px]'>
								<BiSolidLike />
							</button>
							<button className='h-[38px] w-[57px] bg-[#f4f4f4] flex justify-center items-center text-[20px]'>
								<BiSolidDislike />
							</button>
							<button
								to={`/post/${user._id}`}
								className='px-[21px] py-[7px] bg-primary text-white rounded-[4px]'
							>
								Discussion
							</button>
						</div>
					</div>
				</div>

				<div className='w-full bg-primary px-[10px] py-[10px] font-medium text-white mb-[20px]'>
					<h2>Leave a Comment</h2>
				</div>

				<form
					onSubmit={SubmitText}
					className='max-w-[1000px] mx-auto mb-[30px]'
				>
					<textarea
						onChange={e => {
							textSet(e.target.value)
						}}
						name=''
						id=''
						className='border-gray-300 border-[1px] w-full max-h-[126px] min-h-[126px] mb-[10px] px-[20px] py-[10px] outline-none'
					></textarea>
					<button className='text-[16px] px-[21px] py-[7px] bg-[#343a40] text-white rounded-[4px]'>
						submit
					</button>
				</form>

				<div className=''>
					{
						comment.map((data, index)=>{
							return (
								<div
								 	key={index}
									className='flex flex-col md:flex-row gap-[50px] items-center border-gray-300 border-[1px] rounded-[4px] md:px-[20px] py-[10px] mx-auto max-w-[1000px] mb-[20px]'
								>
									<div className='avatar flex justify-center items-center flex-col'>
										<div className='max-w-[170px] min-w-[170px] mx-auto'>
											<img
												src={data.avatar}
												alt=''
												className='w-full h-full rounded-[50%]'
											/>
										</div>
										<h2>{data.name}</h2>
									</div>
		
									<div className=''>
										<h2 className='text-[16px] mb-[10px]'>{data.text}</h2>
										<p className='text-[12.5px] text-[#AAAA] mb-[10px]'>
											{data.date}
										</p>
									
									</div>
								</div>
							)
						})
						
					}
				</div>
			</div>
		</>
	)
}

export default PostData
