import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { getPost, updatePost } from '../../requests'
import { useAuthState } from '../../context'
import './styles.css'

const Edit = () => {

	const { user: { token } } = useAuthState()
	const { id } = useParams()
	const { state } = useLocation()
	const [post, setPost] = useState({})
	const [file, setFile] = useState('')
	const history = useHistory()

	useEffect(async () => {
		if (state?.post) return setPost(state.post)
		const data = await getPost(id)
		setPost(data)
	}, [id])

	const onSubmit = async e => {
		e.preventDefault()
		const formData = new FormData(document.forms[0])
		if (!file) {
			formData.delete('cover')
		}
		const update = await updatePost(id, formData, token)
		history.push(`/view/${post._id}`, { update })
	}

	return (
		<div className='write'>
			<img
				src={file && URL.createObjectURL(file) || `http://localhost:5000/${post.cover}`}
				alt=''
			/>
			<form onSubmit={onSubmit}>
				<div className='group'>
					<label>
						<i className='fas fa-plus' />
						<input type='file' name='cover' onChange={e => setFile(e.target.files[0])} />
					</label>
					<input type='text' name='title' placeholder='Title' autoFocus={true} defaultValue={post.title} />
				</div>
				<div className='group'>
					<textarea name='body' placeholder='Fairy Tale...' defaultValue={post.body} />
				</div>
				<button className='share-button'>Edit</button>
			</form>
		</div>
	)
}

export default Edit