import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	ApolloClient,
	InMemoryCache,
	gql,
	useMutation,
	useQuery,
} from '@apollo/client'

const Login = () => {
	const navigate = useNavigate()
	const [userData, setUserData] = useState({ email: '', password: '' })
	const [userInfo, setUserInfo] = useState({
		pk: '',
		id: '',
		username: '',
	})

	const LOGIN = gql`
		mutation login($email: String!, $password: String!) {
			tokenAuth(email: $email, password: $password) {
				success
				errors
				token
				refreshToken
				user {
					pk
					id
					username
				}
			}
		}
	`

	const [login, { data, loading, error }] = useMutation(LOGIN)

	const loginUser = (e) => {
		e.preventDefault()
		login({
			variables: {
				email: userData.email,
				password: userData.password,
			},
		})
			.then((response) => {
				const { pk, id, username } = response?.data?.tokenAuth?.user
				setUserInfo({ pk, id, username })
				localStorage.setItem('token', response?.data?.tokenAuth?.token)
				localStorage.setItem(
					'refresh-token',
					response?.data?.tokenAuth?.refreshToken
				)
				navigate('/', { replace: true })
			})
			.catch((err) => console.log(err))
	}

	return (
		<div className='container mt-6' style={{ width: '660px' }}>
			<div className='card'>
				<header className='card-header'>
					<p className='card-header-title'>Login</p>
				</header>
				<div className='card-content'>
					<div className='content'>
						<form onSubmit={loginUser}>
							<div class='field'>
								<label class='label'>Email</label>
								<div class='control has-icons-left '>
									<input
										value={userData.email}
										onChange={({ target }) =>
											setUserData({ ...userData, email: target.value })
										}
										class='input is-info'
										type='text'
										placeholder='Email'
									/>
									<span class='icon is-small is-left'>
										<i class='fas fa-user'></i>
									</span>
								</div>
							</div>
							<div class='field'>
								<label class='label'>Password</label>
								<div class='control has-icons-left '>
									<input
										value={userData.password}
										onChange={({ target }) =>
											setUserData({ ...userData, password: target.value })
										}
										class='input is-info'
										type='password'
										placeholder='Password'
									/>
									<span class='icon is-small is-left'>
										<i class='fas fa-key'></i>
									</span>
								</div>
							</div>
							<div class='field is-grouped'>
								<div class='control'>
									<button class='button is-link'>Submit</button>
								</div>
								<div class='control'>
									<button class='button is-link is-light'>Cancel</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
