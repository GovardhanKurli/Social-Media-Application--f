
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.others;
            state.token = action.payload.token;
        },
        register: (state, action) => {
            state.user = action.payload.others;
            state.token = action.payload.token;
        },
        updateUserProfile: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            //localStorage.clear();
        }
    }
});

export const { login, register, updateUserProfile, logout } = authSlice.actions;

export default authSlice.reducer;
