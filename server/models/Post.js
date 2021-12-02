import { ObjectId } from 'mongodb'
import { posts } from '..'

class Post {
	constructor(data) {
		this.data = data
		this.errors = []
	}

	async validate(id) {
		if (!ObjectId.isValid(id)) return this.errors.push('Invalid post id.')
		const _id = new ObjectId(id)
		const post = await posts.findOne({ _id })
		if (!post) return this.errors.push('Post does not exist.')
		if (this.data.username !== post.username) return this.errors.push('That is not your post to modify.')
		if (this.data.body?.username) return this.errors.push('Cannot change the username of a post.')
		return _id
	}

	async create() {
		if (this.data.username === this.data.body.username) {
			const { filename } = this.data.files[0]
			this.data.body.cover = `${filename}`
			const { insertedId } = await posts.insertOne({ ...this.data.body, createdAt: Date.now() })
			return await posts.findOne({ _id: insertedId })
		} else {
			return 'You cannot create post with another username.'
		}
	}

	static async getPost(id) {
		if (!ObjectId.isValid(id)) return 'Invalid post id.'
		const _id = new ObjectId(id)
		const post = await posts.findOne({ _id })
		if (!post) return 'Post does not exist.'
		return post
	}

	static async get(query) {
		if (query.username) return await posts.find({ username: query.username }).toArray()
		if (query.tags) return await posts.find({ tags: { $in: JSON.parse(query.tags) } }).toArray()
		return await posts.find({}).toArray()
	}

	async update(id) {
		const _id = await this.validate(id)
		if (this.errors.length === 0) {
			if (this.data.files[0]) {
				const { filename } = this.data.files[0]
				this.data.body.cover = `${filename}`
			}
			await posts.updateOne({ _id }, { $set: this.data.body })
			return await posts.findOne({ _id })
		} else {
			return this.errors[0]
		}
	}

	async delete(id) {
		const _id = await this.validate(id)
		if (this.errors.length === 0) {
			const { deletedCount } = await posts.deleteOne({ _id })
			if (deletedCount) { return 'Post deleted.' }
		} else return this.errors[0]
	}
}

export default Post