import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

import Input from '../../components/Input'
import { registerUser } from '../../requests'
import './styles.css'

const Register = () => {

	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState({})
	const history = useHistory()

	const onSubmit = async e => {
		e.preventDefault()
		try {
			const data = await registerUser(username, email, password)
			if (data.success) toast.success(data.success, { duration: 5000 })
			if (data.success) return history.push('/login')
			setError(data)
		} catch (e) {
			console.log({ message: e.message })
		}
	}

 	return (
		<div className='register'>
			<span>Register</span>
			<form onSubmit={onSubmit}>
				<Input
					label='Username'
					type='text'
					placeholder='Username'
					setValue={setUsername}
					error={error.username}
				/>
				{!!error.username && <small>{error.username}</small>}
				<Input
					label='Email'
					type='email'
					placeholder='Email'
					setValue={setEmail}
					error={error.email}
				/>
				{!!error.email && <small>{error.email}</small>}
				<Input
					label='Password'
					type='password'
					placeholder='Password'
					setValue={setPassword}
					error={error.password}
				/>
				{!!error.password && <small>{error.password}</small>}
				<button className='register-button'>Register</button>
			</form>
			<Link to='/login' className='link'>
				<button className='login-button'>Login</button>
			</Link>
			<Toaster />
		</div>
	)
}

export default Register