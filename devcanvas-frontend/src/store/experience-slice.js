import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import canvasApi from "../api";

const initialExperienceState = {
  title: "",
  description: "",
  employment_type: "",
  company: "",
  location: "",
  industry: "",
  start_date: "",
  end_date: "",
  headline: "",
  allExperiences: [],
  error: null,
};


const fetchExperiences = createAsyncThunk("fetctExperience/experienceSlice", async () => {
  try {
    const experiences = await canvasApi.get("/api/v1/experiences", {
      headers: {
        auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
      },
    });
    return [...experiences.data];
  } catch (error) {}
});

const updateExperience = createAsyncThunk(
  "updateExperience/experienceSlice",
  async (
    { title, description, employment_type, company, location, industry, start_date, end_date, headline, id },
    { rejectWithValue }
  ) => {
    try {
      const experience = await canvasApi.patch(
        `/api/v1/experiences/${id}`,
        {   title, description, employment_type, company, location, industry, start_date, end_date, headline },
        {
          headers: {
            auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
          },
        }
      );
      return experience.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addExperience = createAsyncThunk(
  "addExperience/experienceSlice",
  async (
    { title, description, employment_type, company, location, industry, start_date, end_date, headline},
    { rejectWithValue }
  ) => {
    try {
      const experience = await canvasApi.post(
        "/api/v1/experiences/",
        { title, description, employment_type, company, location, industry, start_date, end_date, headline },
        {
          headers: {
            auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
          },
        }
      );
      return experience.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteExperience = createAsyncThunk(
  "deleteExperience/experienceSlice",
  async ({ id }, { rejectWithValue }) => {
    try {
      const experience = await canvasApi.delete(`/api/v1/experiences/${id}`, {
        headers: {
          auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
        },
      });
      return experience.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const experienceSlice = createSlice({
  name: "experience",
  initialState: initialExperienceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (state) => {})
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.allExperiences = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {})
      .addCase(updateExperience.pending, (state) => {})
      .addCase(updateExperience.fulfilled, (state, action) => {})
      .addCase(updateExperience.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(addExperience.pending, (state) => {})
      .addCase(addExperience.fulfilled, (state, action) => {})
      .addCase(addExperience.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(deleteExperience.pending, (state) => {})
      .addCase(deleteExperience.fulfilled, (state, action) => {})
      .addCase(deleteExperience.rejected, (state, action) => {
        state.error = action.payload.message;
      })
    }
});

export { fetchExperiences, updateExperience, addExperience, deleteExperience };

export default experienceSlice.reducer;
