import { configureStore } from '@reduxjs/toolkit'
import { PostReducer } from './Posts/Posts'
import { AuthReducer } from './Auth/Auth'
import { CommentReducer } from './Comments/Comments'

const store = configureStore({
	reducer: { posts: PostReducer, auth: AuthReducer, comments: CommentReducer }
})

export default store
