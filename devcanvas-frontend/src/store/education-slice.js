import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import canvasApi from "../api";

const initialEducationState = {
  description: "",
  school: "",
  degree: "",
  field: "",
  startYear: "",
  endYear: "",
  grade: "",
  activities: "",
  allEducations: [],
  error: null,
};


const fetchEducations = createAsyncThunk("fetctEducation/educationSlice", async () => {
  try {
    const educations = await canvasApi.get("/api/v1/educations", {
      headers: {
        auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
      },
    });
    return [...educations.data];
  } catch (error) {}
});

const updateEducation = createAsyncThunk(
  "updateEducation/educationSlice",
  async (
    { description, start_year, end_year, school, degree, field, grade, activities, id },
    { rejectWithValue }
  ) => {
    try {
      const education = await canvasApi.patch(
        `/api/v1/educations/${id}`,
        { description, start_year, end_year, school, degree, field, grade, activities },
        {
          headers: {
            auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
          },
        }
      );
      return education.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addEducation = createAsyncThunk(
  "addEducation/educationSlice",
  async (
    { description, start_year, end_year, school, degree, field, grade, activities },
    { rejectWithValue }
  ) => {
    try {
      const education = await canvasApi.post(
        "/api/v1/educations/",
        { description, start_year, end_year, school, degree, field, grade, activities },
        {
          headers: {
            auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
          },
        }
      );
      return education.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteEducation = createAsyncThunk(
  "deleteEducation/educationSlice",
  async ({ id }, { rejectWithValue }) => {
    try {
      const education = await canvasApi.delete(`/api/v1/educations/${id}`, {
        headers: {
          auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
        },
      });
      return education.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const educationSlice = createSlice({
  name: "education",
  initialState: initialEducationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducations.pending, (state) => {})
      .addCase(fetchEducations.fulfilled, (state, action) => {
        state.allEducations = action.payload;
      })
      .addCase(fetchEducations.rejected, (state, action) => {}) 
      .addCase(updateEducation.pending, (state) => {})
      .addCase(updateEducation.fulfilled, (state, action) => {})
      .addCase(updateEducation.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(addEducation.pending, (state) => {})
      .addCase(addEducation.fulfilled, (state, action) => {})
      .addCase(addEducation.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(deleteEducation.pending, (state) => {})
      .addCase(deleteEducation.fulfilled, (state, action) => {})
      .addCase(deleteEducation.rejected, (state, action) => {
        state.error = action.payload.message;
      }) 
    }
});

export { fetchEducations, updateEducation, addEducation, deleteEducation };

export default educationSlice.reducer;
