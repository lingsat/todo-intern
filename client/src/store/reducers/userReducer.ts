import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { RootState } from "@Store/store";
import { loginUser, registerUser } from "@Store/thunk/user";
import { IUser } from "@Types/user";

export interface IUserState {
  user: IUser | null;
  isLoading: boolean;
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      toast.success(`User ${action.payload.email} registered successfully!`);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      toast.warn(action.payload as string);
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      toast.success(`User ${action.payload.email} logged in successfully!`);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      toast.warn(action.payload as string);
    });
  },
});

export const { logIn, logOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
