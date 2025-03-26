import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BackgroundImg from '../assets/bg-img.jpg'

function Home() {
	return (
		<Fragment>
			<Header />
			<div
				className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
				style={{ backgroundImage: `url(${BackgroundImg})` }}
			>
				<div className="absolute inset-0 bg-black/50"></div>

				<div className="relative z-30 text-white text-center px-5 max-w-full">	
					<h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
						Developer Connector
					</h1>
					<h2 className="text-lg md:text-xl mt-4 w-full">
						Create a developer profile/portfolio, share posts and get help from
						other developers
					</h2>

					<div className="mt-6 flex justify-center gap-5">
						<Link
							to="/registration"
							className="px-6 py-3 bg-primary  text-lg font-semibold transition"
						>
							Sign Up
						</Link>
						<Link
							to="/login"
							className="px-6 py-3 bg-white  text-lg text-black font-semibold hover:bg-gray-300 transition"
						>
							Login
						</Link>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Home
