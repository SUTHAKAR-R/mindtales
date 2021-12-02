import React from 'react'
import { useHistory } from 'react-router-dom'

import './styles.css'

const Post = ({ post }) => {

	const history = useHistory()
	
	return (
		<div className="post" onClick={() => history.push(`/view/${post._id}`)}>
			<img src={`http://localhost:5000/${post.cover}`} alt="" />
			<div className="info">
				<div>
					<span>Music</span>
					<span>Life</span>
				</div>
				<span className='title'>{post.title}</span>
				<hr />
				<span className='date'>{new Date(post.createdAt).toDateString()}</span>
				<p>
					{post.body}
				</p>
			</div>
		</div>
	)
}

export default Post