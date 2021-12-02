import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { Loader, Sidebar } from '../../components'
import { useAuthState } from '../../context'
import { getPost, deletePost } from '../../requests'
import './styles.css'

const View = () => {

	const { user: { username, token } } = useAuthState()
	const { id } = useParams()
	const [post, setPost] = useState()
	const { state } = useLocation() 
	const history = useHistory()
	
	useEffect(async () => {
		if (state?.post) return setPost(state.post)
		if (state?.update) return setPost(state.update)
		const data = await getPost(id)
		setPost(data)
	}, [id])

	const editClick = () => {
		history.push(`/edit/${post._id}`, { post })
	}

	const deleteClick = async () => {
		const result = await deletePost(id, token)
		toast.success(result)
		history.push('/')
	}

	if (!post) return <Loader />

	return (
		<div className='view'>
			<div className='view-post'>
				<div className='view-wrapper'>
					<img src={`http://localhost:5000/${post.cover}`} alt=''/>
					<h1>
						{post.title}
						{post.username === username && (
							<div className="edit">
								<i onClick={editClick} className="far fa-edit" />
								<i onClick={deleteClick} className="far fa-trash-alt" />
							</div>
						)}	
					</h1>
					<div className='view-info'>
						<span>Author:<b>{post.username}</b></span>
						<span>{new Date(post.createdAt).toDateString()}.</span>
					</div>
					<p>
						{post.body}
					</p>
				</div>
			</div>
			<Sidebar />
		</div>
	)
}

export default View