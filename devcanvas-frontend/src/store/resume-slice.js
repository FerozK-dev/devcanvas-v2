// resumeSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import pythonApi from './../pythonApi';

export const generateResume = createAsyncThunk(
  'resume/generate',
  async (_, { rejectWithValue }) => {
    try {
      const authToken = JSON.parse(localStorage.getItem('auth_token'));
      const response = await pythonApi.post(
        '/agent/create-resume',
        {}, // request body (if needed)
        {
          headers: {
            auth_token: authToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue('Session expired. Please login again.');
      }
      return rejectWithValue(error.response?.data?.detail || 'Generation failed');
    }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    content: null,
    loading: false,
    error: null,
    saveStatus: 'idle'
  },
  reducers: {
    clearResume: (state) => {
      state.content = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateResume.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(generateResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { clearResume } = resumeSlice.actions;
export default resumeSlice.reducer;
