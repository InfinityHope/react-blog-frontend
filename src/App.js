import { Routes, Route, Navigate } from 'react-router-dom'

import Container from '@mui/material/Container'

import { Header } from './components'
import { Home, SinglePostPage, Registration, AddPost, Login } from './pages'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchAuthMe } from './redux/Auth/asyncActions'
import { selectIsAuth } from './redux/Auth/selectors'

function App() {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)

	useEffect(() => {
		;(() => {
			try {
				dispatch(fetchAuthMe())
			} catch (e) {
				alert('Ошибка авторизации')
			}
		})()
	}, [])

	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Routes>
					<Route path={'/'} element={<Home />} />
					{!isAuth && !localStorage.getItem('token') ? (
						<Route path={'posts/add-post'} element={<Navigate to={'/'} />} />
					) : (
						<>
							<Route path={'posts/add-post'} element={<AddPost />} />
							<Route path={'posts/edit/:id'} element={<AddPost />} />
						</>
					)}
					<Route path={'posts/:id'} element={<SinglePostPage />} />
					<Route path={'tags/:tag'} element={<Home />} />
					<Route path={'auth/login'} element={<Login />} />
					<Route path={'auth/register'} element={<Registration />} />
				</Routes>
			</Container>
		</>
	)
}

export default App
