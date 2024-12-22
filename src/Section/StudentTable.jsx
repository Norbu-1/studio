import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, deleteStudent } from "../Redux/studentSlice";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import AddStudent from "./addStudent";
import image from "../assets/image.png";
import image1 from "../assets/image1.png";

const StudentTable = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);

  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (loading) {
    return <p className="p-4">Loading students...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Error: {error}</p>;
  }

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowAddStudentForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <div className="p-4 rounded-t-md max-h-full bg-white mx-4 mt-1">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 font-semibold text-gray-500">
        <div className="flex space-x-2 mb-4 md:mb-0">
          <select className="rounded-md px-3 py-1 bg-gray-100">
            <option>AY 2024-25</option>
            <option>AY 2023-24</option>
          </select>
          <select className="rounded-md px-3 py-2 bg-gray-100">
            <option>CBSE 9</option>
            <option>CBSE 10</option>
          </select>
        </div>
        <button
          onClick={() => {
            setEditingStudent(null);
            setShowAddStudentForm(true);
          }}
          className="bg-gray-100 text-gray-500 px-5 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus />
          <span>Add new Student</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg text-sm">
          <thead>
            <tr className="bg-white text-left font-medium border-b">
              <th className="p-4">Student Name</th>
              <th className="p-4">Cohort</th>
              <th className="p-4">Courses</th>
              <th className="p-4">Date Joined</th>
              <th className="p-4">Last Login</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b text-sm">
                <td className="p-4 text-gray-700">{student.name}</td>
                <td className="p-4 text-center text-gray-700">
                  {student.cohort}
                </td>
                <td className="p-4 text-center text-gray-700">
                  <div className="flex overflow-x-auto gap-2">
                    {Array.isArray(student.courses) &&
                    student.courses.length > 0 ? (
                      student.courses.map((course, index) => {
                        const courseImages = {
                          "CBSE 9 Science": image,
                          "CBSE 9 Math": image1,
                          "CBSE 10 Science": image,
                          "CBSE 10 Math": image1,
                        };
                        const courseImage = courseImages[course] || image;
                        return (
                          <div
                            key={index}
                            className="inline-flex items-center gap-2 bg-gray-100 px-1 py-1 rounded-md text-sm whitespace-nowrap"
                          >
                            <img
                              src={courseImage}
                              alt={course}
                              className="w-5 h-5"
                            />
                            {course}
                          </div>
                        );
                      })
                    ) : (
                      <p>No courses available</p>
                    )}
                  </div>
                </td>

                <td className="p-4 text-center text-gray-700">
                  {format(new Date(student.dateJoined), "dd.MMM.yyyy")}
                </td>
                <td className="p-4 text-center text-gray-700">
                  {format(new Date(student.lastLogin), "dd.MMM.yyyy h:mm a")}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      student.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-blue-500 hover:text-blue-700 mx-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-500 hover:text-red-700 mx-2"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddStudentForm && (
        <AddStudent
          student={editingStudent}
          onClose={() => setShowAddStudentForm(false)}
        />
      )}
    </div>
  );
};

export default StudentTable;
