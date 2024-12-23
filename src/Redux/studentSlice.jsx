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
    students:  [],
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
