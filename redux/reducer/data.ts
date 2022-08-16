import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  dataTest: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDataTest(state: any, action: PayloadAction<any>) {
      state.dataTest = action.payload;
    },
    resetData(state: any) {
      Object.assign(state, initialState);
    },
  },
});
export const { setDataTest } = dataSlice.actions;

export const getDataTest = (state: any) => state.data.dataTest;

export default dataSlice.reducer;
