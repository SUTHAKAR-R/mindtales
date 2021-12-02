import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

import Input from '../../components/Input'
import { useAuthDispatch } from '../../context'
import { loginUser } from '../../requests'
import './styles.css'

const Login = () => {

	const [usename, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState({})
	const dispatch = useAuthDispatch()

	const onSubmit = async e  => {
		e.preventDefault()
		try {
			const user = await loginUser(usename, password)
			if (user.success) toast.success(user.success, { duration: 4000 })
			if (user.success) return dispatch({ type: 'LOGIN', payload: user.body })
			setError(user)
		} catch (e) {
			console.log({ message: e.message })
		}
	}

	return (
		<div className='login'>
			<span>Login</span>
			<form onSubmit={onSubmit}>
				<Input
					label='Username'
					type='text'
					placeholder='Username'
					setValue={setUsername}
					error={error.username}
				/>
				{error.username && <small>{error.username}</small>}
				<Input 
					label='Password'
					type='password'
					placeholder='Password'
					setValue={setPassword}
					error={error.password}
				/>
				{error.password && <small>{error.password}</small>}
				<button type='submit' className='login-button'>Login</button>
			</form>
			<Link to='/register' className='link'>
				<button type='submit' className='register-button'>Register</button>
			</Link>
			<Toaster />
		</div>
	)
}

export default Login