import { createSlice } from '@reduxjs/toolkit'
import { fetchAuth, fetchAuthMe, fetchRegister } from './asyncActions'

const initialState = {
	data: null,
	status: 'loading'
}

const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null
		}
	},
	extraReducers: {
		[fetchAuth.pending]: (state) => {
			state.status = 'loading'
			state.data = null
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.status = 'success'
			state.data = action.payload
		},
		[fetchAuth.rejected]: (state) => {
			state.status = 'error'
			state.data = null
		},
		[fetchAuthMe.pending]: (state) => {
			state.status = 'loading'
			state.data = null
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.status = 'success'
			state.data = action.payload
		},
		[fetchAuthMe.rejected]: (state) => {
			state.status = 'error'
			state.data = null
		},
		[fetchRegister.pending]: (state) => {
			state.status = 'loading'
			state.data = null
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.status = 'success'
			state.data = action.payload
		},
		[fetchRegister.rejected]: (state) => {
			state.status = 'error'
			state.data = null
		}
	}
})

export const AuthReducer = AuthSlice.reducer
export const { logout } = AuthSlice.actions
