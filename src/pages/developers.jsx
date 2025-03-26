import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from "react-icons/fa";
import { AppContext } from '../context/ContexApi'
import Header from '../components/Header';

function Developers() {
  const { them } = useContext(AppContext)
  const [profil, profilSet] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const profilesPerPage = 6

  useEffect(() => {
    axios.get('https://nt-devconnector.onrender.com/api/profile')
      .then((res) => {
        profilSet(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const lastProfileIndex = currentPage * profilesPerPage
  const firstProfileIndex = lastProfileIndex - profilesPerPage
  const currentProfiles = profil.slice(firstProfileIndex, lastProfileIndex)
  const totalPages = Math.ceil(profil.length / profilesPerPage)

  return (
    <div style={{ backgroundColor: them ? 'white' : '#293133', color: them ? "black" : "white" }} className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-[40px] md:px-[100px]">
        <div className="py-[50px]">
          <h2 className="text-primary text-4xl md:text-5xl font-bold">Developers</h2>
          <p className="text-lg md:text-xl mt-2">Browse and connect with developers</p>
        </div>

        {loading ? (
          <div className="text-center text-xl font-semibold">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProfiles.map((obj, index) => (
                <div key={index} className="bg-[#f4f4f4] flex flex-col items-center p-6 rounded-lg border border-gray-300 shadow-md">
                  <div className="w-32 h-32 mx-auto">
                    <img src={obj.user.avatar} className="rounded-full w-full h-full" alt="avatar" />
                  </div>

                  <div className="flex flex-col gap-2 text-black text-center mt-4">
                    <h1 className="font-bold text-lg">{obj.user.name}</h1>
                    <h1 className="text-gray-600">{obj.company || 'No company listed'}</h1>
                    <h1 className="text-gray-600">{obj.location || 'Location unknown'}</h1>

                    <Link to={`/profile/${obj.user._id}`} className="bg-primary px-5 py-2 rounded-md text-white mt-2 transition duration-300 ease-in-out hover:text-primary hover:bg-white border border-primary">
                      View Profile
                    </Link>
                  </div>

                  <div className="text-primary flex gap-2 items-center mt-4">
                    <FaCheck />
                    <h1 className="text-center">{obj.skills?.join(', ') || 'No skills listed'}</h1>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2 my-5 flex-wrap">
              <button
                className={`px-4 py-2 rounded-md border text-sm sm:text-base ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-opacity-80'}`}
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md border text-sm sm:text-base ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-100 text-black hover:bg-primary hover:text-white'}`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className={`px-4 py-2 rounded-md border text-sm sm:text-base ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-opacity-80'}`}
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Developers
