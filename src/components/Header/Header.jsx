import styles from './Header.module.scss'

import { Link } from 'react-router-dom'

import { Button, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/Auth/selectors'
import { logout } from '../../redux/Auth/Auth'

export const Header = () => {
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()

	const onClickLogout = () => {
		if (window.confirm('Вы действительно хотите выйти?')) {
			dispatch(logout())
			localStorage.removeItem('token')
		}
	}

	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link to={'/'} className={styles.logo}>
						<div>REACT BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to="posts/add-post">
									<Button variant="contained">Написать статью</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant="contained"
									color="error"
								>
									Выйти
								</Button>
							</>
						) : (
							<>
								<Link to="auth/login">
									<Button variant="outlined">Войти</Button>
								</Link>
								<Link to="auth/register">
									<Button variant="contained">Создать аккаунт</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	)
}
