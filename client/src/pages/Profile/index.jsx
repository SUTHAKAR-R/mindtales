import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { Input, Sidebar } from '../../components'
import { useAuthDispatch, useAuthState } from '../../context'
import { updateUser } from '../../requests'
import './styles.css'

const Profle = () => {

	const { user } = useAuthState()
	const dispatch = useAuthDispatch()
	const [username, setUsername] = useState(user.username)
	const [email, setEmail] = useState(user.email)
	const [password, setPassword] = useState('')
	const [error, setError] = useState({})

	const onSubmit = async e => {
		e.preventDefault()
		try {
			const update = await updateUser(user.username, { username, email, password }, user.token)
			if (update.success) {
				toast.success(update.success, { duration: 3000 })
				setTimeout(() => {
					toast('Login again to continue.', { duration: 5000 })
					return dispatch({ type: 'LOGOUT' })
				}, 3000);
			}
			setError(update)
		} catch (e) {
			console.log({ message: e.message })
		}
	}

	return (
		<div className='profile'>
			<div className='profile-info'>
				<div className='title'>
					<span className='update'>Update Profile</span>
					<span className='delete'>Delete Account</span>
				</div>
				<form onSubmit={onSubmit}>
					<label>Profile Picture</label>
					<div className='avatar-group'>
						<img src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
						<label>
							<i className='far fa-user-circle' />
							<input type='file' name='avatar' />
						</label>
					</div>
					<Input 
						required={true}
						label='Username'
						type='text'
						placeholder='Username'
						value={username}
						setValue={setUsername}
						error={error.username}
						
					/>
					{error.username && <small>{error.username}</small>}
					<Input 
						required={true}
						label='Email'
						type='email'
						placeholder='Email'
						value={email}
						setValue={setEmail}
						error={error.email}
					/>
					{error.email && <small>{error.email}</small>}
					<Input 
						label='Password'
						type='password'
						placeholder='Change Password'
						value={password}
						setValue={setPassword}
						error={error.password}
					/>
					{error.password && <small>{error.password}</small>}
					<button className="update">Update</button>
				</form>
			</div>
			<Sidebar />
			<Toaster />
		</div>
	)
}

export default Profle