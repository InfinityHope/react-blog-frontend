import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.scss'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@mui/material'
import { theme } from './theme.js'

import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<BrowserRouter>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</BrowserRouter>
)
