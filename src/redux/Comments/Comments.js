import { createSlice } from '@reduxjs/toolkit'
import {
	fetchAddComment,
	fetchComments,
	fetchDeleteComment,
	fetchAllComments,
	fetchLastComments
} from './asyncActions'

const initialState = {
	comments: {
		items: [],
		status: 'loading'
	}
}

const CommentsSlice = createSlice({
	name: 'comments',
	initialState,
	extraReducers: {
		//Удаление комментария
		[fetchDeleteComment.pending]: (state, action) => {
			state.comments.items = state.comments.items.filter(
				(item) => item._id !== action.meta.arg
			)
		},
		//Комментарии к посту
		[fetchComments.pending]: (state) => {
			state.comments.status = 'loading'
		},
		[fetchComments.fulfilled]: (state, action) => {
			state.comments.items = action.payload
			state.comments.status = 'success'
		},
		[fetchComments.rejected]: (state) => {
			state.comments.items = []
			state.comments.status = 'error'
		},
		//Все комментарии
		[fetchAllComments.pending]: (state) => {
			state.comments.status = 'loading'
		},
		[fetchAllComments.fulfilled]: (state, action) => {
			state.comments.items = action.payload
			state.comments.status = 'success'
		},
		[fetchAllComments.rejected]: (state) => {
			state.comments.items = []
			state.comments.status = 'error'
		},
		//Добавление комментария
		[fetchAddComment.pending]: (state) => {
			state.comments.status = 'loading'
		},
		[fetchAddComment.fulfilled]: (state, action) => {
			state.comments.items = [...state.comments.items, action.payload]
			state.comments.status = 'success'
		},
		[fetchAddComment.rejected]: (state) => {
			state.comments.items = []
			state.comments.status = 'error'
		}
	}
})

export const CommentReducer = CommentsSlice.reducer
