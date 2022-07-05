import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/posts')
	return data
})

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id) => {
	const { data } = await axios.get(`/posts/${id}`)
	return data
})

export const fetchRemovePost = createAsyncThunk(
	'posts/fetchRemovePost',
	async (id) => await axios.delete(`/posts/delete/${id}`)
)

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
	const { data } = await axios.get('/tags')
	return data
})

export const fetchPostsByTags = createAsyncThunk(
	'posts/fetchPostsByTags',
	async (tagName) => {
		const { data } = await axios.get(`tags/${tagName}`)
		return data
	}
)
