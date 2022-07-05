import styles from './AddPost.module.scss'
import 'easymde/dist/easymde.min.css'

import SimpleMDE from 'react-simplemde-editor'

import { TextField, Paper, Button, Box, InputLabel } from '@mui/material'

import { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'

export const AddPost = () => {
	const [imageUrl, setImageUrl] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [text, setText] = useState('')
	const [title, setTitle] = useState('')
	const [tags, setTags] = useState('')
	const inputFileRef = useRef(null)
	const { id } = useParams()
	const navigate = useNavigate()

	const isEditing = Boolean(id)

	useEffect(() => {
		if (id) {
			axios
				.get(`posts/${id}`)
				.then(({ data }) => {
					setTitle(data.title)
					setText(data.text)
					setImageUrl(data.imageUrl)
					setTags(data.tags)
				})
				.catch((err) => {
					console.log(err)
					alert('Ошибка при получении поста')
				})
		}
	}, [])

	const handleChangeFile = async (e) => {
		try {
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
			const { data } = await axios.post('/upload', formData)
			setImageUrl(data.url)
		} catch (e) {
			console.error(e)
			alert('Произошла ошибка при загрузке файла')
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl('')
	}

	const onChange = useCallback((value) => {
		setText(value)
	}, [])

	const onSubmit = async (e) => {
		e.preventDefault()
		try {
			setIsLoading(true)

			const fields = {
				title,
				imageUrl,
				text,
				tags: tags
					.split(',')
					.map((item) => item.trim())
					.join(',')
			}

			const { data } = isEditing
				? await axios.patch(`posts/update/${id}`, fields)
				: await axios.post('/posts/create', fields)

			const _id = isEditing ? id : data._id

			navigate(`/posts/${_id}`)
		} catch (e) {
			console.error(e)
			isEditing
				? alert('Произошла ошибка при обновлении поста')
				: alert('Произошла ошибка при создании поста')
		}
	}

	const options = useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autoSave: {
				enabled: true,
				delay: 1000
			}
		}),
		[]
	)

	return (
		<Paper style={{ padding: 30 }}>
			<form onSubmit={onSubmit}>
				<Box>
					<Button
						onClick={() => inputFileRef.current.click()}
						variant="outlined"
						size="large"
					>
						Загрузить превью
					</Button>
					<input
						ref={inputFileRef}
						type="file"
						onChange={handleChangeFile}
						hidden
					/>
					{imageUrl && (
						<Button
							variant="contained"
							color="error"
							onClick={onClickRemoveImage}
							className={styles.removeButton}
						>
							Удалить
						</Button>
					)}
				</Box>
				{imageUrl && (
					<img
						className={styles.image}
						src={`http://localhost:4444${imageUrl}`}
						alt="Uploaded"
					/>
				)}
				<br />
				<br />
				<TextField
					classes={{ root: styles.title }}
					variant="standard"
					placeholder="Заголовок статьи..."
					fullWidth
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<InputLabel classes={{ root: styles.tagsLabel }}>
					Введите теги через запятую
				</InputLabel>
				<TextField
					classes={{ root: styles.tags }}
					variant="standard"
					placeholder="Тэги"
					value={tags}
					onChange={(e) => setTags(e.target.value)}
				/>

				<SimpleMDE
					className={styles.editor}
					value={text}
					onChange={onChange}
					options={options}
				/>
				<div className={styles.buttons}>
					<Button type={'submit'} size="large" variant="contained">
						{isEditing ? 'Сохранить' : 'Опубликовать'}
					</Button>
					<Link to={'/'}>
						<Button size="large">Отмена</Button>
					</Link>
				</div>
			</form>
		</Paper>
	)
}
