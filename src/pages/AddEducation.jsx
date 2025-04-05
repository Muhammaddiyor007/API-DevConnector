import React from 'react'
import { FaCodeBranch } from "react-icons/fa";

const AddEducation = () => {
  return (
    <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg">
            <h1 className="text-4xl font-bold text-primary">Add Your Education</h1>
                <p className="mt-2 text-lg flex items-center gap-2">
                    <FaCodeBranch className="text-gray-700" /> Add any school or bootcamp that you have attended
                </p>
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
            </div>
        </div>
  )
}

export default AddEducation