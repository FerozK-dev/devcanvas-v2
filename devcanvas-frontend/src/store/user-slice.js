import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import canvasApi from "../api";

const fetchUser = createAsyncThunk("fetchUser/profileSlice", async () => {
  try {
    const profile = await canvasApi.get("/api/v1/users/show_profile", {
      headers: {
        auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
      },
    });

    return profile.data;
  } catch (error) {}
});

const editUser = createAsyncThunk(
  "editUser/profileSlice",
  async (formData, { rejectWithValue }) => {
    try {
      const profile = await canvasApi.patch(
        "/api/v1/users/",
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
        `/api/v1/users/toggle_portfolio_status`,
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
      .addCase(fetchUser.rejected, (state, action) => {})
      .addCase(editUser.pending, (state) => {})
      .addCase(editUser.fulfilled, (state, action) => {
        state.profileData = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {});
    }
});

export { fetchUser, editUser, togglePublish };

export default profileSlice.reducer;
