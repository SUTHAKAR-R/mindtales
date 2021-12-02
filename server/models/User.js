import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { users } from '../'

class User {
	constructor(body) {
		this.body = body
		this.error = {}
	}

	async validate() {
		const userExists = await users.findOne({ username: this.body.username })
		if (userExists) return this.error['username'] = 'Username is taken.'
		const emailExists = await users.findOne({ email: this.body.email })
		if (emailExists) return this.error['email'] = 'Email is taken.'
	}

	async create() {
		await this.validate()
		if (Object.keys(this.error).length === 0) {
			const salt = await bcrypt.genSalt(10)
			const hashed = await bcrypt.hash(this.body.password, salt)
			await users.insertOne({ ...this.body, password: hashed })
			return { success: 'User created.' }
		} else {
			return this.error
		}
	}

	async update(currentUsername) {
		const currentUser = await users.findOne({ username: currentUsername })
		if (currentUser.username !== this.body.username) {
			const userExists = await users.findOne({ username: this.body.username })
			if (userExists) return { username: 'Username is already in use.' }
		}
		if (currentUser.email !== this.body.email) {
			const emailExists = await users.findOne({ email: this.body.email })
			if (emailExists) return { email: 'Email is already in use.' }
		}
		if (this.body.password) {
			const salt = await bcrypt.genSalt(10)
			this.body.password = await bcrypt.hash(this.body.password, salt)
		} 
		this.body.password = currentUser.password
		await users.updateOne({ username: currentUsername }, { $set: this.body })
		const { password, ...info } = this.body.username ? 
			await users.findOne({ username: this.body.username }) : 
			await users.findOne({ username: currentUsername })
		return { success: 'User updated.', body: info }
	}

	static async delete(username) {
		const userExists = await users.findOne({ username })
		if (userExists) {
			return await users.deleteOne({ username })
		} else {
			return { username: 'Usern does not exist.' }
		}
	}

	async login() {
		const user = await users.findOne({ username: this.body.username })
		if (!user) return { username: 'Invalid username.' }
		if (user && await bcrypt.compare(this.body.password, user.password)) {
			const token = jwt.sign({ username: this.body.username }, process.env.JWT_SECRET, { expiresIn: '1d' })
			const { password, ...info } = user
			return { success: 'User loggedIn.', body: { ...info, token } }
		} else {
			return { password: 'Invalid password.' }
		}
	}
}

export default User