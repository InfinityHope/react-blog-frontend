import { Post, AddComment, Comments } from '../../components'
import ReactMarkDown from 'react-markdown'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectComments } from '../../redux/Comments/selectors'
import { fetchComments } from '../../redux/Comments/asyncActions'
import { selectIsAuth } from '../../redux/Auth/selectors'
import { fetchPost } from '../../redux/Posts/asyncActions'
import { selectPosts } from '../../redux/Posts/selectors'

export const SinglePostPage = () => {
	const { comments } = useSelector(selectComments)
	const { post } = useSelector(selectPosts)
	const isAuth = useSelector(selectIsAuth)
	const { id } = useParams()

	const isCommentsLoading = comments.status === 'loading'
	const isPostLoading = post.status === 'loading'

	const dispatch = useDispatch()

	useEffect(() => {
		try {
			dispatch(fetchPost(id))
		} catch (e) {
			alert('Ошибка при получении поста')
		}
	}, [])

	useEffect(() => {
		try {
			dispatch(fetchComments(id))
		} catch (e) {
			alert('Ошибка при получении комментариев')
		}
	}, [])

	if (isPostLoading) {
		return <Post isLoading={true} />
	}

	return (
		<>
			<Post
				id={post.item._id}
				title={post.item.title}
				imageUrl={
					post.item.imageUrl
						? `${process.env.REACT_APP_API_URL}${post.item.imageUrl}`
						: ''
				}
				user={{
					avatarUrl: post.item.user.avatarUrl,
					fullName: post.item.user.fullName
				}}
				createdAt={new Date(post.item.createdAt).toLocaleString()}
				viewsCount={post.item.viewsCount}
				commentsCount={comments.items.length}
				tags={post.item.tags}
				isFullPost
			>
				<ReactMarkDown children={post.item.text} />
			</Post>
			<Comments items={comments.items} isLoading={isCommentsLoading}>
				{isAuth ? <AddComment post={id} /> : ''}
			</Comments>
		</>
	)
}
