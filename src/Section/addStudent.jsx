import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent } from '../Redux/studentSlice';

const AddStudent = ({ onClose, student }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students); // Get updated students state

  // Form state with pre-filled data if `student` is provided
  const [formData, setFormData] = useState({
    id: student?.id || '',
    name: student?.name || '',
    cohort: student?.cohort || '',
    courses: student?.courses?.join(', ') || '', // Display as comma-separated string
    dateJoined: student?.dateJoined || '',
    lastLogin: student?.lastLogin || '',
    status: student?.status || 'Active',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedData = {
      ...formData,
      courses: Array.isArray(formData.courses)
        ? formData.courses
        : formData.courses.split(',').map((course) => course.trim()), // Convert to array if not already
    };
  
    if (student) {
      dispatch(updateStudent(updatedData));
    } else {
      dispatch(addStudent(updatedData));
    }
  
    onClose();
  };
  
  

  // Track the updated state after the update
  useEffect(() => {
    console.log('Updated students:', students); // Log students to check if the state is updated
  }, [students]); // Runs whenever students state changes

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">
          {student ? 'Edit Student' : 'Add New Student'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Student Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Cohort */}
          <div className="mb-4">
            <label htmlFor="cohort" className="block text-sm font-medium text-gray-700">
              Cohort
            </label>
            <input
              type="text"
              id="cohort"
              name="cohort"
              value={formData.cohort}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Courses */}
          <div className="mb-4">
            <label htmlFor="courses" className="block text-sm font-medium text-gray-700">
              Courses (comma-separated)
            </label>
            <input
              type="text"
              id="courses"
              name="courses"
              value={formData.courses}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Date Joined */}
          <div className="mb-4">
            <label htmlFor="dateJoined" className="block text-sm font-medium text-gray-700">
              Date Joined
            </label>
            <input
              type="date"
              id="dateJoined"
              name="dateJoined"
              value={formData.dateJoined}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Last Login */}
          <div className="mb-4">
            <label htmlFor="lastLogin" className="block text-sm font-medium text-gray-700">
              Last Login
            </label>
            <input
              type="date"
              id="lastLogin"
              name="lastLogin"
              value={formData.lastLogin}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {student ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
