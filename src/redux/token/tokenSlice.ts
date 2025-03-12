import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  tokenType: string;
  tokenValue: string;
}

const initialState: TokenState = {
  tokenType: "",
  tokenValue: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken(
      state,
      action: PayloadAction<{ tokenType: string; tokenValue: string }>
    ) {
      state.tokenType = action.payload.tokenType;
      state.tokenValue = action.payload.tokenValue;
    },
    clearToken(state) {
      state.tokenType = "";
      state.tokenValue = "";
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
