import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'

const Navbar = () => {
	const isAuthenticated = localStorage.getItem('token')
	const logout = async () => {
		localStorage.removeItem('token')
		window.location.href = 'http://localhost:3000'
	}
	return (
		<nav
			className='navbar is-light'
			role='navigation'
			aria-label='main navigation'
		>
			<div className='navbar-brand'>
				<Link className='navbar-item' to='/'>
					<img src={Logo} />
				</Link>
			</div>

			<div className='navbar-menu'>
				<div className='navbar-start'>
					<Link className='navbar-item' to='/'>
						Home
					</Link>
				</div>

				<div className='navbar-end'>
					<div className='navbar-item'>
						{isAuthenticated ? (
							<button onClick={logout} className='button is-warning'>
								Logout
							</button>
						) : (
							<Link to='/login' className='button is-info'>
								Login
							</Link>
						)}
					</div>
					<div className='navbar-item'>
						{!isAuthenticated && (
							<Link to='/register' className='button is-primary is-outlined'>
								Signup
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
