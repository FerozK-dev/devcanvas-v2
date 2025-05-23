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


const fetchEducations = createAsyncThunk("fetchEducation/educationSlice", async () => {
  try {
    const educations = await canvasApi.get("/api/v1/educations", {
      headers: {
        auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
      },
    });
    if (educations.status === 200) {
      return [...educations.data];
    } else { return [] }  // Otherwise there are lots of NaN instead on the page when only frontend is running
  } catch (error) {}
});

const updateEducation = createAsyncThunk(
  "updateEducation/educationSlice",
  async (
    { description, startYear, endYear, school, degree, field, grade, activities, id },
    { rejectWithValue }
  ) => {
    try {
      const education = await canvasApi.put(
        `/api/v1/educations/${id}`,
        { description, startYear, endYear, school, degree, field, grade, activities },
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
    { description, startYear, endYear, school, degree, field, grade, activities },
    { rejectWithValue }
  ) => {
    try {
      const education = await canvasApi.post(
        "/api/v1/educations/",
        { description, startYear, endYear, school, degree, field, grade, activities },
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
