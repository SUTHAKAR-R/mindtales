import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { createPost } from '../../requests'
import { useAuthState } from '../../context'
import './styles.css'
import toast, { Toaster } from 'react-hot-toast'

const Write = () => {

	const { user: { username, token } } = useAuthState()
	const [file, setFile] = useState('')
	const history = useHistory()

	const onSubmit = async e => {
		e.preventDefault()
		const formData = new FormData(document.forms[0])
		if (!file) { return toast.error('Choose a cover.') }
		formData.append('username', username)
		const post = await createPost(formData, token)
		history.push(`/view/${post._id}`, { post })
	}
 
 	return (
		<div className='write'>
			<img 
				src = {file && URL.createObjectURL(file) || "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" }
				alt="" 
			/>
			<form onSubmit={onSubmit}>
				<div className='group'>
					<label>
						<i className='fas fa-plus' />
						<input type='file' name='cover' onChange={e => setFile(e.target.files[0])} />
					</label>
					<input required type='text' name='title' placeholder='Title' autoFocus={true} />
				</div>
				<div className='group'>
					<textarea required name='body' placeholder='Fairy Tale...' />
				</div>
				<button className='share-button'>Share</button>
			</form>
			<Toaster />
		</div>
	)
}

export default Write