import Post from '../models/Post'

export const createPost = async (req, res, next) => {
	try {
		const post = await new Post(req).create()
		res.status(201).json(post)
		if (req.files) next()
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}

export const getPost = async (req, res) => {
	try {
		const post = await Post.getPost(req.params.id)
		res.status(200).json(post)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}

export const getPosts = async (req, res) => {
	try {
		const posts = await Post.get(req.query)
		res.status(200).json(posts)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}

export const updatePost = async (req, res, next) => {
	try {
		const post = await new Post(req).update(req.params.id)
		res.status(200).json(post)
		if (req.files) next()
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}

export const deletePost = async (req, res) => {
	try {
		const deleteResult = await new Post(req).delete(req.params.id)
		res.status(200).json(deleteResult)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}