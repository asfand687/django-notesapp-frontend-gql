import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	ApolloClient,
	InMemoryCache,
	gql,
	useMutation,
	useQuery,
} from '@apollo/client'

const Register = () => {
	const navigate = useNavigate()
	const [userData, setUserData] = useState({
		username: '',
		password1: '',
		password2: '',
		email: '',
	})

	const REGISTER = gql`
		mutation register(
			$email: String!
			$username: String!
			$password1: String!
			$password2: String!
		) {
			register(
				email: $email
				username: $username
				password1: $password1
				password2: $password2
			) {
				success
				errors
				token
				refreshToken
			}
		}
	`

	const [register, { data, loading, error }] = useMutation(REGISTER)

	const registerUser = async (e) => {
		e.preventDefault()
		register({
			variables: {
				email: userData.email,
				username: userData.username,
				password1: userData.password1,
				password2: userData.password2,
			},
		})
	}

	return (
		<div className='container mt-6' style={{ width: '660px' }}>
			<div className='card'>
				<header className='card-header'>
					<p className='card-header-title'>Register</p>
				</header>
				<div className='card-content'>
					<div className='content'>
						<form onSubmit={registerUser}>
							<div className='field'>
								<label className='label'>Email</label>
								<div className='control has-icons-left '>
									<input
										value={userData.email}
										onChange={({ target }) =>
											setUserData({ ...userData, email: target.value })
										}
										className='input is-info'
										type='text'
										placeholder='Email Address'
									/>
									<span className='icon is-small is-left'>
										<i className='fas fa-envelope'></i>
									</span>
								</div>
							</div>

							<div className='field'>
								<label className='label'>Username</label>
								<div className='control has-icons-left '>
									<input
										value={userData.username}
										onChange={({ target }) =>
											setUserData({ ...userData, username: target.value })
										}
										className='input is-info'
										type='text'
										placeholder='Username'
									/>
									<span className='icon is-small is-left'>
										<i className='fas fa-user'></i>
									</span>
								</div>
							</div>

							<div className='field'>
								<label className='label'>Password</label>
								<div className='control has-icons-left '>
									<input
										value={userData.password}
										onChange={({ target }) =>
											setUserData({ ...userData, password1: target.value })
										}
										className='input is-info'
										type='password'
										placeholder='Password'
									/>
									<span className='icon is-small is-left'>
										<i className='fas fa-key'></i>
									</span>
								</div>
							</div>

							<div className='field'>
								<label className='label'>Confirm Password</label>
								<div className='control has-icons-left '>
									<input
										value={userData.password}
										onChange={({ target }) =>
											setUserData({ ...userData, password2: target.value })
										}
										className='input is-info'
										type='password'
										placeholder='Password'
									/>
									<span className='icon is-small is-left'>
										<i className='fas fa-key'></i>
									</span>
								</div>
							</div>
							<div className='field is-grouped'>
								<div className='control'>
									<button className='button is-link'>Signup</button>
								</div>
								<div className='control'>
									<button className='button is-link is-light'>Cancel</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
