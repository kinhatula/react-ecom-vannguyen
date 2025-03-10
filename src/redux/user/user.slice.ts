import { createSlice } from '@reduxjs/toolkit';

interface IUserPayload {
    user: IUserData;
    isAuthenticated: boolean;
}
const initialState: IUserPayload = {
    user: {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        avatar: '',
        role: 'USER'
    },
    isAuthenticated: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user.id = action.payload.id;
            state.user.firstName = action.payload.firstName;
            state.user.lastName = action.payload.lastName;
            state.user.email = action.payload.email;
            state.user.avatar = action.payload.avatar;
            state.user.role = action.payload.role;
            state.isAuthenticated = true;
        },
        changeUser: (state, action) => {
            state.user.firstName = action.payload.firstName;
            state.user.lastName = action.payload.lastName;
        },
        clearUser: (state) => {
            state.user = {
                id: 0,
                email: '',
                firstName: '',
                lastName: '',
                avatar: '',
                role: 'USER'
            };
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, clearUser,changeUser } = userSlice.actions;

export default userSlice.reducer;
