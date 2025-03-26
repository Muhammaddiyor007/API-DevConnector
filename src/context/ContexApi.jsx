import { useEffect, useState } from 'react'
import { createContext } from 'react'





export const AppContext = createContext();

export function ContextBody({children}){
		const [langth , langhtSet] = useState(true)
		const [isToken , isTokenSet] = useState(false)
		const [them , themSet] = useState(true);
		
		useEffect(() => {
			const token = localStorage.getItem('token') 

			isTokenSet(!!token);
		}, []);


		return(
			<AppContext.Provider  value={{langth , langhtSet , isToken , isTokenSet , them , themSet }} >
				{children}
			</AppContext.Provider>

		);
}