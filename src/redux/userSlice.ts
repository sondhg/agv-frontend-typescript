import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  jwt: string;
  // refresh_token: string;
  name: string;
  // role: string;
  email: string;
}

interface UserState {
  account: AccountState;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  account: {
    jwt: "",
    // refresh_token: "",
    name: "",
    // role: "",
    email: "",
  },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    doLogin(state, action: PayloadAction<AccountState>) {
      state.account = action.payload;
      state.isAuthenticated = true;
    },
    doLogout(state) {
      state.account = {
        jwt: "",
        // refresh_token: "",
        name: "",
        // role: "",
        email: "",
      };
      state.isAuthenticated = false;
    },
  },
});

export const { doLogin, doLogout } = userSlice.actions;
export default userSlice.reducer;