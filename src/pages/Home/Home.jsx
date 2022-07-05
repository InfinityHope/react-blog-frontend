//components
import { Tabs, Tab, Grid } from '@mui/material'
import { Post, TagsBlock, Comments } from '../../components'
import { useEffect, useState } from 'react'
import { fetchPosts, fetchTags } from '../../redux/Posts/asyncActions'
import { useDispatch, useSelector } from 'react-redux'
import { selectPosts } from '../../redux/Posts/selectors'
import { selectAuthData } from '../../redux/Auth/selectors'
import { sortPostsBySortType } from '../../redux/Posts/Posts'
import { selectComments } from '../../redux/Comments/selectors'
import { fetchAllComments } from '../../redux/Comments/asyncActions'
import { useCountComment } from '../../hooks/useCountComment'

const tabs = [
	{
		sortType: 'rating',
		title: 'Популярности'
	},
	{
		sortType: 'new',
		title: 'Новые'
	}
]

export const Home = () => {
	const [tabIndex, setTabIndex] = useState(0)

	const dispatch = useDispatch()
	const { posts, tags } = useSelector(selectPosts)
	const { comments } = useSelector(selectComments)
	const countComments = useCountComment()
	const authData = useSelector(selectAuthData)

	const isPostsLoading = posts.status === 'loading'
	const isTagsLoading = tags.status === 'loading'
	const isCommentsLoading = comments.status === 'loading'

	const lastFive = comments.items.slice(comments.items.slice.length - 7)

	useEffect(() => {
		try {
			dispatch(fetchPosts())
			dispatch(fetchAllComments())
			dispatch(fetchTags())
		} catch (e) {}
	}, [])

	useEffect(() => {
		try {
			if (window.location.pathname === '/') {
				dispatch(fetchPosts())
			}
		} catch (e) {}
	}, [window.location.pathname])

	const sortPosts = (index, sortType) => {
		setTabIndex(index)
		dispatch(sortPostsBySortType(sortType))
	}

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={tabIndex}
				aria-label="basic tabs example"
			>
				{tabs.map((item, index) => (
					<Tab
						label={item.title}
						key={index}
						onClick={() => sortPosts(index, item.sortType)}
					/>
				))}
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{isPostsLoading
						? [...Array(5)]
						: posts.items.map((item, index) =>
								isPostsLoading ? (
									<Post key={index} isLoading={true} />
								) : (
									<Post
										id={item._id}
										title={item.title}
										imageUrl={
											item.imageUrl
												? `${process.env.REACT_APP_API_URL}${item.imageUrl}`
												: ''
										}
										user={{
											avatarUrl: item.user.avatarUrl,
											fullName: item.user.fullName
										}}
										createdAt={new Date(item.createdAt).toLocaleString()}
										viewsCount={item.viewsCount}
										tags={item.tags}
										commentsCount={countComments(comments, item)}
										isEditable={authData?._id === item.user._id}
									/>
								)
						  )}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags.items} isLoading={isTagsLoading} />
					<Comments items={lastFive} isLoading={isCommentsLoading} />
				</Grid>
			</Grid>
		</>
	)
}
