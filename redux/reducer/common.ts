import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  test: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setTest(state: any, action: PayloadAction<any>) {
      state.test = action.payload;
    },
    resetCommon(state: any) {
      Object.assign(state, initialState);
    },
  },
});
export const { setTest } = commonSlice.actions;

export const getTest = (state: any) => state.common.test;

export default commonSlice.reducer;
