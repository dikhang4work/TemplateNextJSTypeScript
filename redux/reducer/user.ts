import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state: any, action: PayloadAction<any>) {
      state.userData = action.payload;
    },
    resetCommon(state: any) {
      Object.assign(state, initialState);
    },
  },
});
export const { setUserData } = userSlice.actions;

export const getUserData = (state: any) => state.user.userData;

export default userSlice.reducer;
