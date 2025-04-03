import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import canvasApi from "../api";

const initialProjectState = {
  description: "",
  title: "",
  display_image: "",
  allProjects: [],
  id: ""
};


const fetchProjects = createAsyncThunk("fetctProjects/projectsSlice", async () => {
  try {
    const projects = await canvasApi.get("/api/v1/projects", {
      headers: {
        auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
      },
    });
    return [...projects.data];
  } catch (error) {}
});

const updateProject = createAsyncThunk(
  "updateProject/projectsSlice",
  async (
    formData,
    { rejectWithValue }
  ) => {
    try {
      const project = await canvasApi.patch(
        `/api/v1/projects/${formData.getAll("id")}`,
        formData,
        {
          headers: {
            auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
          },
        }
      );
      return project.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addProject = createAsyncThunk(
  "addProject/projectsSlice",
  async (
    formData,
    { rejectWithValue }
  ) => {
    try {
      const project = await canvasApi.post(
        "/api/v1/projects/",
        formData,
        {
          headers: {
            auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
          },
        }
      );
      return project.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteProject = createAsyncThunk(
  "deleteProject/projectsSlice",
  async ({ id }, { rejectWithValue }) => {
    try {
      const project = await canvasApi.delete(`/api/v1/projects/${id}`, {
        headers: {
          auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
        },
      });
      return project.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const projectsSlice = createSlice({
  name: "project",
  initialState: initialProjectState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {})
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.allProjects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {}) 
      .addCase(updateProject.pending, (state) => {})
      .addCase(updateProject.fulfilled, (state, action) => {})
      .addCase(updateProject.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(addProject.pending, (state) => {})
      .addCase(addProject.fulfilled, (state, action) => {})
      .addCase(addProject.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(deleteProject.pending, (state) => {})
      .addCase(deleteProject.fulfilled, (state, action) => {})
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload.message;
      }) 
    }
});

export { fetchProjects, updateProject, addProject, deleteProject };

export default projectsSlice.reducer;
