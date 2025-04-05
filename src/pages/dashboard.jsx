import { useEffect, useState, useContext } from 'react';
import { FaUser, FaPlus, FaTrash } from 'react-icons/fa';
import { FaGraduationCap } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/ContexApi';

function Dashboard() {
  const { isToken, userId } = useContext(AppContext);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isToken) {
      navigate('/login'); 
    } else if (userId) {
      axios
        .get(`https://nt-devconnector.onrender.com/api/profile/user/${userId}`)
        .then((data) => {
          setUserName(data.name);
        })
        .catch((err) => {
          console.error('User data fetch error:', err);
        });
    }
  }, [isToken, userId, navigate]);

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg">
        <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
        <p className="mt-2 text-lg flex items-center gap-2">
          <FaUser className="text-gray-700" /> Welcome Muhammaddiyor
        </p>

        <div className="flex gap-4 mt-4">
            <Link to="/edit-profile">
              <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 text-primary rounded-md shadow hover:bg-gray-300">
                <FaUser /> Edit Profile
              </button>
            </Link>

            <Link to="/add-experience">
              <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 text-primary rounded-md shadow hover:bg-gray-300">
                <FaPlus /> Add Experience
              </button>
            </Link>

            <Link to="/add-education">
              <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 text-primary rounded-md shadow hover:bg-gray-300">
                <FaGraduationCap /> Add Education
              </button>
            </Link>

        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Experience Credentials</h2>
          <div className="border rounded-md mt-2 p-4 bg-gray-50">
            <p className="text-gray-600">No experience added yet.</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Education Credentials</h2>
          <div className="border rounded-md mt-2 p-4 bg-gray-50">
            <p className="text-gray-600">No education added yet.</p>
          </div>
        </div>

        <div className="mt-6">
          <Link to="/registration"><button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700">
            <FaTrash /> Delete My Account
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
