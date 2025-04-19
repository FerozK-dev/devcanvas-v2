import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import canvasApi from "../api";
window.canvasApi = canvasApi;

const initialAuthState = {
  isAuthenticated: false,
  authToken: "",
  loading: false,
  error: null,
};

// Async thunk for login
const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const auth = await canvasApi.post("/api/v1/login/", { email, password });

      if (400 <= auth?.status) {
        return rejectWithValue(auth?.data?.error);
      }
      return auth.data;
    } catch (error) {
      console.error("Login failed:", error?.message);
      return rejectWithValue(error?.message || "An error occurred");
    }
  }
);

// Async thunk for signup
const signup = createAsyncThunk(
  "auth/signup",
  async (
    { email, password, firstName, lastName, passwordConfirmation },
    { rejectWithValue }
  ) => {
    try {
      const register = await canvasApi.post("/api/v1/signup", {
        email,
        password,
        firstName,
        lastName,
        passwordConfirmation,
      });

      if (304 <= register?.status) {
        return rejectWithValue(register?.data?.error);
      }
      return register.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true; // Set loading to true when the login request starts
        state.error = null; // Clear any previous errors
      })
      .addCase(login.fulfilled, (state, action) => {
        // Handle the success case for login
        state.loading = false;
        state.isAuthenticated = true;
        state.authToken = action.payload.token;
        localStorage.setItem("is_logged_in", true);
        localStorage.setItem("auth_token", JSON.stringify(action.payload.token));
      })
      .addCase(login.rejected, (state, action) => {
        // Handle the error case for login
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })

      // Handle signup
      .addCase(signup.pending, (state) => {
        state.loading = true; // Set loading to true when the signup request starts
        state.error = null; // Clear any previous errors
      })
      .addCase(signup.fulfilled, (state, action) => {
        // Handle the success case for signup
        state.loading = false;
        state.isAuthenticated = true;
        state.authToken = action.payload.token;
        localStorage.setItem("is_logged_in", true);
        localStorage.setItem("auth_token", JSON.stringify(action.payload.token));
      })
      .addCase(signup.rejected, (state, action) => {
        // Handle the error case for signup
        state.loading = false;
        state.error = action.payload || "Failed to sign up";
      });
  },
});

export const authActions = authSlice.actions;

export { login, signup };

export default authSlice.reducer;
