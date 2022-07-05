import styles from './Login.module.scss'

import {
	Typography,
	TextField,
	Paper,
	Button,
	OutlinedInput,
	InputAdornment,
	FormControl,
	InputLabel
} from '@mui/material'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { fetchAuth } from '../../redux/Auth/asyncActions'
import { selectIsAuth } from '../../redux/Auth/selectors'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'

export const Login = () => {
	const [type, setType] = useState(false)

	const handleClickShowPassword = () => {
		setType(!type)
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm({
		defaultValues: {
			email: '',
			password: ''
		},
		mode: 'onChange'
	})

	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)

	const onSubmit = async (values) => {
		try {
			const data = await dispatch(fetchAuth(values))

			if (!data.payload) {
				return alert('Не удалось авторизоваться')
			}

			if ('token' in data.payload) {
				localStorage.setItem('token', data.payload.token)
			} else {
				alert('Не удалось авторизоваться')
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
				Вход в аккаунт
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					type={'email'}
					fullWidth
					{...register('email', { required: 'Укажите почту' })}
				/>
				<FormControl fullWidth>
					<InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
					<OutlinedInput
						id="outlined-adornment-password"
						className={styles.field}
						label="Пароль"
						type={type ? 'text' : 'password'}
						error={Boolean(errors.password?.message)}
						helperText={errors.password?.message}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleClickShowPassword}
									edge="end"
								>
									{type ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						{...register('password', { required: 'Укажите пароль' })}
					/>
				</FormControl>

				<Button
					disabled={!isValid}
					type={'submit'}
					size="large"
					variant="contained"
					fullWidth
				>
					Войти
				</Button>
			</form>
		</Paper>
	)
}
