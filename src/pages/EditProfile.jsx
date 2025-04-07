import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import axios from '../axios/axios'; 

const EditProfile = () => {
    const [career, setCareer] = useState('');
    const [company, setCompany] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState('');
    const [githubUsername, setGithubUsername] = useState('');
    const [bio, setBio] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [twitter, setTwitter] = useState('');
    const [youtube, setYoutube] = useState('');

    const token = localStorage.getItem('token'); 

    const handleSubmit = (event) => {
        event.preventDefault();

        const profileData = {
            career,
            company,
            website,
            location,
            skills,
            githubUsername,
            bio,
            facebook,
            instagram,
            linkedin,
            twitter,
            youtube,
        };

        axios
            .post('/api/profile', profileData, {
                headers: {
                    'x-auth-token': token
                }
            })
            .catch((err) => {
                console.error('Error updating profile:', err);
                alert('Failed to update profile. Please try again.');
            });
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg">
                <h1 className="text-4xl font-bold text-primary">Edit Your Profile</h1>
                <p className="mt-2 text-lg flex items-center gap-2">
                    <FaUser className="text-gray-700" /> Add some changes to your profile
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 py-5">
                    <div>
                        <label htmlFor="career" className="block text-sm font-medium text-gray-700">
                            Professional Status
                        </label>
                        <select
                            id="career"
                            name="career"
                            value={career}
                            onChange={(e) => setCareer(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">* Select Professional Status</option>
                            <option value="Developer">Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Manager">Manager</option>
                            <option value="Student or Learning">Student or Learning</option>
                            <option value="Instructor or Teacher">Instructor or Teacher</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        <p className="text-sm text-gray-500 mt-2">
                            Give us an idea of where you are at in your career
                        </p>
                    </div>

                    <div>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Company"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            Could be your own company or one you work for
                        </p>
                    </div>

                    <div>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Website"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            Could be your own or a company website
                        </p>
                    </div>

                    <div>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="location"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            City & state suggested (e.g., Boston, MA)
                        </p>
                    </div>

                    <div>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Skills"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            Please use comma separated values (e.g., HTML, CSS, JavaScript, PHP)
                        </p>
                    </div>

                    <div>
                        <input
                            type="text"
                            id="githubUsername"
                            name="githubUsername"
                            value={githubUsername}
                            onChange={(e) => setGithubUsername(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="GitHub Username"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            If you want your latest repos and a GitHub link, include your username
                        </p>
                    </div>

                    <div>
                        <textarea
                            id="bio"
                            name="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Tell us a little about yourself"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            A short bio of yourself
                        </p>
                    </div>
    
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="py-3 px-6 bg-primary border border-primary text-white rounded-md hover:bg-white hover:text-primary focus:ring-4 focus:ring-indigo-300 w-full"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="py-3 px-6 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 w-full"
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
