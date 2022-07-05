import styles from './Comments.module.scss'

import { Fragment } from 'react'

import { SideBlock } from '../SideBlock/SideBlock.jsx'
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider,
	List,
	Skeleton
} from '@mui/material'

import { Close } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthData } from '../../redux/Auth/selectors'
import { fetchDeleteComment } from '../../redux/Comments/asyncActions'

export const Comments = ({ items, children, isLoading }) => {
	const authData = useSelector(selectAuthData)
	const dispatch = useDispatch()

	const deleteComment = (id) => {
		try {
			if (window.confirm('Вы действительно хотите удалить комментарий?')) {
				dispatch(fetchDeleteComment(id))
			}
		} catch (e) {
			alert('Не удалось удалить комментарий')
		}
	}

	const noComments =
		items.length === 0 ? 'Пока никто не оставлял комментарии' : ''

	return (
		<SideBlock title="Комментарии">
			<List>
				<ListItem alignItems="flex-start">{noComments}</ListItem>
				{isLoading
					? [...Array(5)]
					: items.map((obj, index) => (
							<Fragment key={index}>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										{isLoading ? (
											<Skeleton variant="circular" width={40} height={40} />
										) : (
											<Avatar
												alt={obj.user.fullName}
												src={obj.user.avatarUrl}
											/>
										)}
									</ListItemAvatar>
									{isLoading ? (
										<div style={{ display: 'flex', flexDirection: 'column' }}>
											<Skeleton variant="text" height={25} width={120} />
											<Skeleton variant="text" height={18} width={230} />
										</div>
									) : (
										<>
											<ListItemText
												primary={obj.user.fullName}
												secondary={obj.text}
											/>
											{authData?._id === obj.user._id &&
											window.location.pathname !== '/' ? (
												<ListItemText
													className={styles.commentDelete}
													primary={
														<Close onClick={() => deleteComment(obj._id)} />
													}
												/>
											) : (
												''
											)}
										</>
									)}
								</ListItem>
								<Divider variant="inset" component="li" />
							</Fragment>
					  ))}
			</List>
			{children}
		</SideBlock>
	)
}
