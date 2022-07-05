import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('/auth/fetchAuth', async (params) => {
	const { data } = await axios.post('/auth/login', params)
	return data
})

export const fetchRegister = createAsyncThunk(
	'/auth/fetchRegister',
	async (params) => {
		const { data } = await axios.post('/auth/register', params)
		return data
	}
)

export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async () => {
	const { data } = await axios.get('/auth/profile')
	return data
})
