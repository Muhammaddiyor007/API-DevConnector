import { useCallback, useState } from 'react'
import apiClient from '../api/Client'

const useUpdateDataBez = url => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const token = localStorage.getItem('token')

	const updateDataBez = useCallback(
		async updatedData => {
			setLoading(true)
			setError(null)
			try {
				const response = await apiClient.put(url, updatedData, {
					headers: {
						'x-auth-token': token,
					},
				})
				return response.data
			} catch (err) {
				setError(err.response.data.errors|| 'Something went wrong')
				return null
			} finally {
				setLoading(false)
			}
		},
		[url, token]
	)

	return { updateDataBez, loading, error  , setError}
}

export default useUpdateDataBez
