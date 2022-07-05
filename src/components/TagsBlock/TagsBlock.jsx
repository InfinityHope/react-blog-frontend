import TagIcon from '@mui/icons-material/Tag'
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Skeleton
} from '@mui/material'

import { SideBlock } from '../SideBlock/SideBlock.jsx'
import { Link } from 'react-router-dom'
import { fetchPostsByTags } from '../../redux/Posts/asyncActions'
import { useDispatch } from 'react-redux'

export const TagsBlock = ({ items, isLoading = true }) => {
	const dispatch = useDispatch()

	const selectTag = (tagName) => {
		dispatch(fetchPostsByTags(tagName))
	}

	return (
		<SideBlock title="Тэги">
			<List>
				{(isLoading ? [...Array(5)] : items).map((name, i) => (
					<Link
						style={{ textDecoration: 'none', color: 'black' }}
						to={`/tags/${name}`}
					>
						<ListItem key={i} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<TagIcon />
								</ListItemIcon>
								{isLoading ? (
									<Skeleton width={100} />
								) : (
									<ListItemText
										primary={name}
										onClick={() => selectTag(name)}
									/>
								)}
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</SideBlock>
	)
}
