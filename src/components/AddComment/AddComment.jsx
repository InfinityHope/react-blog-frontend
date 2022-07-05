import styles from './AddComment.module.scss'

import { TextField, Avatar, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddComment } from '../../redux/Comments/asyncActions'
import { useForm } from 'react-hook-form'
import { selectAuthData } from '../../redux/Auth/selectors'

export const AddComment = ({ post }) => {
	const authData = useSelector(selectAuthData)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid }
	} = useForm({
		defaultValues: {
			text: ''
		},
		mode: 'onChange'
	})

	const dispatch = useDispatch()

	const onSubmit = (values) => {
		try {
			dispatch(fetchAddComment({ ...values, post }))
		} catch (e) {}
		reset()
	}

	return (
		<>
			<div className={styles.root}>
				<Avatar classes={{ root: styles.avatar }} src={authData.avatarUrl} />
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<TextField
						label="Написать комментарий"
						variant="outlined"
						maxRows={10}
						error={Boolean(errors.text?.message)}
						helperText={errors.text?.message}
						{...register('text', {
							required: 'Пожалуйста, наберите текст для комментария'
						})}
						multiline
						fullWidth
					/>
					<Button disabled={!isValid} type={'submit'} variant="contained">
						Отправить
					</Button>
				</form>
			</div>
		</>
	)
}
