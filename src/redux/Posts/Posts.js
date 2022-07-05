import { createSlice } from '@reduxjs/toolkit'
import {
	fetchPosts,
	fetchPostsByTags,
	fetchRemovePost,
	fetchTags,
	fetchPost
} from './asyncActions'

const initialState = {
	post: {
		item: null,
		status: 'loading'
	},
	posts: {
		items: [],
		status: 'loading'
	},
	tags: {
		items: [],
		status: 'loading'
	}
}

const PostsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		sortPostsBySortType: (state, action) => {
			if (action.payload === 'rating') {
				state.posts.items = state.posts.items
					.sort((a, b) => {
						return a.viewsCount - b.viewsCount
					})
					.reverse()
			}
			if (action.payload === 'new') {
				state.posts.items = state.posts.items
					.sort((a, b) => {
						return new Date(a.createdAt) - new Date(b.createdAt)
					})
					.reverse()
			}
		}
	},
	extraReducers: {
		//Пост
		[fetchPost.pending]: (state) => {
			state.post.status = 'loading'
		},
		[fetchPost.fulfilled]: (state, action) => {
			state.post.item = action.payload
			state.post.status = 'success'
		},
		[fetchPost.rejected]: (state) => {
			state.post.item = null
			state.post.status = 'error'
		},
		//Посты
		[fetchPosts.pending]: (state) => {
			state.posts.status = 'loading'
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'success'
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.items = []
			state.posts.status = 'error'
		},
		//Посты по тегам
		[fetchPostsByTags.pending]: (state) => {
			state.posts.status = 'loading'
		},
		[fetchPostsByTags.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'success'
		},
		[fetchPostsByTags.rejected]: (state) => {
			state.posts.items = []
			state.posts.status = 'error'
		},
		//Теги
		[fetchTags.pending]: (state) => {
			state.tags.status = 'loading'
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload
			state.tags.status = 'success'
		},
		[fetchTags.rejected]: (state) => {
			state.tags.items = []
			state.tags.status = 'error'
		},
		//Удаление
		[fetchRemovePost.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter(
				(item) => item._id !== action.meta.arg
			)
		}
	}
})

export const { sortPostsBySortType } = PostsSlice.actions

export const PostReducer = PostsSlice.reducer
