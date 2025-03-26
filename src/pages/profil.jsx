import axios from '../axios/axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ImSearch } from "react-icons/im";

function Profil() {
	const { id } = useParams()
	const [userData , userDataSet] = useState({})
	const token = localStorage.getItem('token')


	useEffect(()=>{
		axios.get(`/api/profile/user/${id}` , {
			headers: {
				'x-auth-token': token,
			},
		}).then((res)=>{
			userDataSet(res.data)
		})
	},[])

	
	return (
    <div className='px-[20px] py-[20px]'>
				<div className="max-w-[1000px] mx-auto ">

					<div className="my-[20px]">
						<Link
							to='/developers'
							className='bg-[#f4f4f4] px-[21px] py-[7px] font-medium text-[16px]'
						>
							Back To Profiles
						</Link>
					</div>

					<div className="w-full p-[2rem] bg-primary rounded-[4px] text-center text-white">
						<div className="md:w-[250px] md:h-[250px] w-[200px] h-[200px] mx-auto mb-[10px]">
							<img src={`${userData.user?.avatar}`} alt=""  className='rounded-[50%] w-full h-full'/>
						</div>
						<h2 className='text-[32px] font-medium'>{userData.user?.name}</h2>
						<h2 className='text-[18px]'>{userData.status}</h2>
						<h2 className='text-[18px]'>Developer at {userData.company}</h2>
						<h2 className='text-[18px]'>{userData.location}</h2>
						<a className='text-center inline-block mt-[20px] text-[40px]' href={`${userData.website}` }><ImSearch /></a>
					</div>

					<div className="bg-[#f4f4f4] py-[40px] px-[20px] border-[1px]  border-[#cccccc] mt-[20px]">

						<div className="w-[80%] mx-auto border-b-[1px] pb-[20px] border-b-[#cccccc] text-center">
							<h2 className='text-primary text-[25px] font-medium'>nos Bio</h2>
							<p className='text-[16px]'>{userData.bio}</p>
						</div>

						<div className="w-[80%] mx-auto text-center mt-[20px]">
							<h2 className='text-primary text-[25px] font-medium'>Skill Set</h2>
							<p className='text-[16px]'>{userData.skills}</p>
						</div>

					</div>

				</div>
    </div>
  )
}

export default Profil
