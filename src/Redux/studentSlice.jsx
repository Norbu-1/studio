import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/students';

// Fetch students
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add a new student
export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
  const response = await axios.post(API_URL, student);
  return response.data;
});

// Update an existing student
export const updateStudent = createAsyncThunk('students/updateStudent', async (student) => {
  const response = await axios.put(`${API_URL}/${student.id}`, student);
  return response.data; 
});

// Delete a student
export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students:  [
    {
      name: "Anshuman Katiyar",
      cohort: "AY 2024-25",
      courses: ["CBSE 9 Science", "CBSE 9 Math"],
      dateJoined: new Date("2024-11-17 10:15:00"),
      lastLogin: new Date("2024-11-17 16:30:00"),
      status: "Active",
    },
    {
      name: "Bansi Dalsaniya",
      cohort: "AY 2024-25",
      courses: ["CBSE 9 Science", "CBSE 9 Math"],
      dateJoined: new Date("2024-11-17 10:20:00"),
      lastLogin: new Date("2024-11-17 16:25:00"),
      status: "Active",
    },
    {
      name: "Chandrika Wadke",
      cohort: "AY 2024-25",
      courses: ["CBSE 9 Science", "CBSE 9 Math"],
      dateJoined: new Date("2024-11-17 10:25:00"),
      lastLogin: new Date("2024-11-17 16:15:00"),
      status: "Active",
    },
    {
      name: "Devang Dave",
      cohort: "AY 2024-25",
      courses: ["CBSE 9 Science", "CBSE 9 Math"],
      dateJoined: new Date("2024-11-17 10:30:00"),
      lastLogin: new Date("2024-11-17 16:10:00"),
      status: "Active",
    },
    {
      name: "Forum Bhatt",
      cohort: "AY 2024-25",
      courses: ["CBSE 9 Science", "CBSE 9 Math"],
      dateJoined: new Date("2024-11-17 10:35:00"),
      lastLogin: new Date("2024-11-17 16:05:00"),
      status: "Active",
    },
    {
      name: "Esha Patel",
      cohort: "AY 2024-25",
      courses: ["CBSE 10 Math", "CBSE 10 Science"],
      dateJoined: new Date("2024-11-18 09:00:00"),
      lastLogin: new Date("2024-11-19 17:00:00"),
      status: "Active",
    },
    {
      name: "Farhan Qureshi",
      cohort: "AY 2024-25",
      courses: ["CBSE 9 English", "CBSE 9 Science"],
      dateJoined: new Date("2024-11-18 09:15:00"),
      lastLogin: new Date("2024-11-19 17:15:00"),
      status: "Inactive",
    },
    {
      name: "Geetanjali Mehra",
      cohort: "AY 2024-25",
      courses: ["CBSE 10 Science", "CBSE 10 Math"],
      dateJoined: new Date("2024-11-18 09:30:00"),
      lastLogin: new Date("2024-11-19 17:30:00"),
      status: "Active",
    },
    {
      name: "Harshit Roy",
      cohort: "AY 2024-25",
      courses: ["CBSE 9 Math", "CBSE 9 History"],
      dateJoined: new Date("2024-11-18 09:45:00"),
      lastLogin: new Date("2024-11-19 17:45:00"),
      status: "Active",
    },
    {
      name: "Ishita Sharma",
      cohort: "AY 2023-24",
      courses: ["CBSE 10 English", "CBSE 10 History"],
      dateJoined: new Date("2024-11-18 10:00:00"),
      lastLogin: new Date("2024-11-19 18:00:00"),
      status: "Inactive",
    },
    {
      name: "Jayesh Desai",
      cohort: "AY 2023-24",
      courses: ["CBSE 10 Math", "CBSE 10 Science"],
      dateJoined: new Date("2024-11-18 10:15:00"),
      lastLogin: new Date("2024-11-19 18:15:00"),
      status: "Active",
    },
    {
      name: "Kriti Singh",
      cohort: "AY 2023-24",
      courses: ["CBSE 9 Science", "CBSE 9 History"],
      dateJoined: new Date("2024-11-18 10:30:00"),
      lastLogin: new Date("2024-11-19 18:30:00"),
      status: "Active",
    },
    {
      name: "Lakshay Kapoor",
      cohort: "AY 2023-24",
      courses: ["CBSE 10 Math", "CBSE 10 English"],
      dateJoined: new Date("2024-11-18 10:45:00"),
      lastLogin: new Date("2024-11-19 18:45:00"),
      status: "Inactive",
    },
    {
      name: "Meera Nair",
      cohort: "AY 2024-25",
      courses: ["CBSE 9 Science", "CBSE 9 English"],
      dateJoined: new Date("2024-11-18 11:00:00"),
      lastLogin: new Date("2024-11-19 19:00:00"),
      status: "Active",
    },
    {
      name: "Nikhil Kumar",
      cohort: "AY 2024-25",
      courses: ["CBSE 10 History", "CBSE 10 English"],
      dateJoined: new Date("2024-11-18 11:15:00"),
      lastLogin: new Date("2024-11-19 19:15:00"),
      status: "Active",
    },
  ],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch students
    builder.addCase(fetchStudents.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false;
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Add a student
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });

    builder.addCase(updateStudent.fulfilled, (state, action) => {
      const updatedStudent = action.payload;
    
      // Ensure 'courses' is an array
      if (typeof updatedStudent.courses === 'string') {
        updatedStudent.courses = updatedStudent.courses.split(',').map((course) => course.trim());
      }
    
      const index = state.students.findIndex((student) => student.id === updatedStudent.id);
      if (index >= 0) {
        state.students[index] = updatedStudent; // Update student data in state
      }
    });
    
    

    // Delete a student
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.students = state.students.filter((student) => student.id !== action.payload);
    });
  },
});

export default studentSlice.reducer;
