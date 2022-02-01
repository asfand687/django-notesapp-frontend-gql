import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoteDetail from './components/NoteDetail'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	HttpLink,
	ApolloLink,
	concat,
} from '@apollo/client'

const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql/' })

const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			Authorization: `JWT ${localStorage.getItem('token')}` || null,
		},
	}))

	return forward(operation)
})

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: concat(authMiddleware, httpLink),
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/note/:id/' element={<NoteDetail />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<ProtectedRoute component={App} />} />
			</Routes>
		</BrowserRouter>
	</ApolloProvider>,
	document.getElementById('root')
)
