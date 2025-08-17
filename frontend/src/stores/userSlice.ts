import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TokenPayloadDto } from '@/stores/api/baseApi';

export interface UserState {
	user: TokenPayloadDto | null;
}

const initialState: UserState = {
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<TokenPayloadDto>) {
			state.user = action.payload;
		},
		clearUser(state) {
			state.user = null;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
