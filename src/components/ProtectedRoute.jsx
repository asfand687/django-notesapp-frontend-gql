import React from 'react'
import { Navigate, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: RouteComponent }) => {
	const isAuthenticated = localStorage.getItem('token')
	return isAuthenticated ? <RouteComponent /> : <Navigate to='/login' />
}

export default ProtectedRoute
