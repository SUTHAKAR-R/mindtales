import React, { useEffect, useState } from 'react'

import Post from '../Post'
import Loader from '../Loader'
import { getPosts } from '../../requests'
import './styles.css'

const Posts = () => {

	const [posts, setPosts] = useState()

	useEffect(async () => {
		const data = await getPosts()
		setPosts(data)
	}, [])

	if (!posts) return <Loader />

	return (
		<div className="posts">
			{posts.map(post => <Post post={post} key={post._id} />)}
		</div>
	)
}

export default Posts