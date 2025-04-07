import { useState } from 'react'
import { Link } from 'react-router-dom'
import useUpdateDataBez from '../hooks/putId'

function AddExperience() {
	const [title, titleSet] = useState('')
	const [company, companySet] = useState('')
	const [location, locationSet] = useState('')
	const [from, fromSet] = useState('')
	const [to, toSet] = useState('')
	const [description, descriptionSet] = useState('')

	const { updateDataBez, error  , setError} = useUpdateDataBez(
		'/profile/experience'
	)
	const handleUpdate = async () => {
		await updateDataBez({
			title,
			company,
			location,
			from,
			to,
			description,
		})
	}

	return (
		<div className=' relative '>
			<div className='lg:max-w-[1000px] mx-auto px-[20px] py-[30px]'>
				<h2 className='text-primary text-[48px] font-bold'>
					Add An Experience
				</h2>
				<p className='text-[24px]'>
					Add any developer/programming positions that you have had in the past{' '}
				</p>
			</div>

			<div
				className={`${
					error ? 'scale-1' : 'scale-0'
				} flex justify-center flex-col gap-[10px] items-center rounded-[4px] duration-[1s] absolute top-[50px] right-[50px] bg-transparent text-white font-bold w-[250px] min-h-[100px] py-[10px] px-[10px]`}
			>
				{error?.map(({ msg } ) => {
					return (
						<div className='w-[200px] bg-red-500 mx-auto px-[10px] py-[10px] flex justify-center items-center h-[80px] relative rounded-[8px]'>
							<h1 className='text-[12px]'>{msg}</h1>
							<div className=' absolute top-[3px] right-[3px]'>
								<X onClick={setError(null)} />
							</div>
						</div>
					)
				})}
			</div>

			<form
				onSubmit={event => {
					event.preventDefault()
					handleUpdate()
				}}
				action=''
				className='lg:max-w-[1000px] mx-auto px-[20px]'
			>
				<label htmlFor=''>
					<input
						type='text'
						placeholder='* Job Title'
						className='w-full outline-none py-[5px] px-[10px] border-gray-400 border-[1px] border-solid rounded-[4px] mb-[20px]'
						onChange={e => titleSet(e.target.value)}
					/>
				</label>

				<label htmlFor=''>
					<input
						type='text'
						placeholder='* Company'
						className='w-full outline-none py-[5px] px-[10px] border-gray-400 border-[1px] border-solid rounded-[4px] mb-[20px]'
						onChange={e => companySet(e.target.value)}
					/>
				</label>

				<label htmlFor=''>
					<input
						type='text'
						placeholder='Location'
						className='w-full outline-none py-[5px] px-[10px] border-gray-400 border-[1px] border-solid rounded-[4px] mb-[20px]'
						onChange={e => locationSet(e.target.value)}
					/>
				</label>

				<label htmlFor=''>
					<p className='font-bold'>From Date</p>
					<input
						type='date'
						className='w-full outline-none py-[5px] px-[10px] border-gray-400 border-[1px] border-solid rounded-[4px] mb-[20px]'
						onChange={e => fromSet(e.target.value)}
					/>
				</label>

				<label htmlFor=''>
					<p className='font-bold'>To Date</p>
					<input
						type='date'
						className='w-full outline-none py-[5px] px-[10px] border-gray-400 border-[1px] border-solid rounded-[4px] mb-[20px]'
						onChange={e => toSet(e.target.value)}
					/>
				</label>

				<label htmlFor=''>
					<input
						type='text'
						placeholder='Job Description'
						className='w-full outline-none py-[5px] px-[10px] border-gray-400 border-[1px] border-solid rounded-[4px] mb-[20px]'
						onChange={e => descriptionSet(e.target.value)}
					/>
				</label>

				<button className='px-[21px] py-[7px] bg-primary text-white rounded-[4px] mr-[20px]'>
					Save
				</button>
				<Link
					className='px-[21px] py-[8px] bg-gray-300 text-white rounded-[4px]'
					to='/dashboard'
				>
					Go Back
				</Link>
			</form>
		</div>
	)
}

export default AddExperience
