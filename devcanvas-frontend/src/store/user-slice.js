import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import canvasApi from "../api";

const fetchUser = createAsyncThunk("fetchUser/profileSlice", async (_, { rejectWithValue }) => {
  try {
    const response = await canvasApi.get("/api/v1/user/profile", {
      headers: {
        auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
      },
    });

    if (response.status === 401 || response?.data?.error === "Invalid or expired token") {
      return rejectWithValue(response?.data?.error);
    }

    return response.data;
  } catch (error) {}
});

const editUser = createAsyncThunk(
  "editUser/profileSlice",
  async (formData, { rejectWithValue }) => {
    try {
      const profile = await canvasApi.put(
        "/api/v1/user/update",
        formData ,
        {
          headers: {
            auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
          },
        }
      );

      return profile.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const togglePublish = createAsyncThunk(
  "togglePublish/profileSlice",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await canvasApi.patch(
        `/api/v1/user/toggle-portfolio-status`,
        {},
        {
          headers: {
            auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// { first_name, last_name, location, about_me, contact, title, headline, github_url, linked_url, work_email, profile },


const initialProfileState = {
  firstName: "",
  lastName: "",
  email: "",
  location: "",
  aboutMe: "", contact: "",
  title: "",
  headline: "",
  githubUrl: "",
  linkedUrl: "",
  workEmail: "",
  profilePicture: "",
  publishPortfolio: "",
  profileData: {}
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.profileData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        localStorage.setItem("is_logged_in", false);
      })
      .addCase(editUser.pending, (state) => {})
      .addCase(editUser.fulfilled, (state, action) => {
        state.profileData = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {});
    }
});

export { fetchUser, editUser, togglePublish };

export default profileSlice.reducer;
