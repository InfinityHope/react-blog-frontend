import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAddComment = createAsyncThunk(
	'/comments/fetchAddComment',
	async (fields) => {
		const { data } = await axios.post('/comments/add-comment', fields)
		return data
	}
)

export const fetchDeleteComment = createAsyncThunk(
	'/comments/fetchDeleteComment',
	async (id) => await axios.delete(`/comments/delete/${id}`)
)

export const fetchComments = createAsyncThunk(
	'/comments/fetchComments',
	async (id) => {
		const { data } = await axios.get(`/comments/${id}`)
		return data
	}
)

export const fetchAllComments = createAsyncThunk(
	'/comments/fetchAllComments',
	async () => {
		const { data } = await axios.get(`/comments`)
		return data
	}
)
