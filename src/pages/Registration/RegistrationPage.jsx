import styles from './Registration.module.scss'

import { Typography, TextField, Paper, Button, Avatar } from '@mui/material'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/Auth/selectors'
import { fetchRegister } from '../../redux/Auth/asyncActions'
import { Navigate } from 'react-router-dom'

export const Registration = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			avatarUrl: ''
		},
		mode: 'onChange'
	})

	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)

	const onSubmit = async (values) => {
		try {
			const data = await dispatch(fetchRegister(values))

			if (!data.payload) {
				return alert('Не удалось зарегестрироваться')
			}

			if ('token' in data.payload) {
				localStorage.setItem('token', data.payload.token)
			} else {
				alert('Не удалось зарегестрироваться')
			}
		} catch (e) {
			console.error(e)
		}
	}

	if (isAuth) {
		return <Navigate to={'/'} />
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Создание аккаунта
			</Typography>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.avatar}>
					<Avatar sx={{ width: 100, height: 100 }} />
				</div>
				<TextField
					className={styles.field}
					label="Полное имя"
					fullWidth
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					{...register('fullName', { required: 'Укажите имя' })}
				/>
				<TextField
					className={styles.field}
					label="E-Mail"
					fullWidth
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					{...register('email', { required: 'Укажите почту' })}
				/>
				<TextField
					className={styles.field}
					label="Пароль"
					fullWidth
					type={'password'}
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', { required: 'Укажите пароль' })}
				/>
				<TextField
					className={styles.field}
					label="Вставьте ссылку на картинку"
					fullWidth
					{...register('avatarUrl')}
				/>
				<Button
					disabled={!isValid}
					type={'submit'}
					size="large"
					variant="contained"
					fullWidth
				>
					Зарегистрироваться
				</Button>
			</form>
		</Paper>
	)
}
