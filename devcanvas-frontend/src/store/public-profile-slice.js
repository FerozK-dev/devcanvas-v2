// slices/publicProfileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import canvasApi from "../api";

const initialPortfolioState = {
  portfolioData: {},
  status: null,
  error: null,
}

const fetchPublicProfile = createAsyncThunk(
  "publicProfile/fetchPublicProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await canvasApi.get(`/api/v1/portfolios/${userId}/public`);
      if (response.status === 404) {
        return rejectWithValue("Portfolio not found");
      }

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Return the error message if it's a 404
        return rejectWithValue("Portfolio not found");
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const publicProfileSlice = createSlice({
  name: "publicProfile",
  initialState: initialPortfolioState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPublicProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.portfolioData = action.payload;
      })
      .addCase(fetchPublicProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export { fetchPublicProfile };

export default publicProfileSlice.reducer;
