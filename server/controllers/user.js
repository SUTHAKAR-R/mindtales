import User from '../models/User'

export const createUser = async (req, res) => {
	try {
		const user = await new User(req.body).create()
		res.status(201).json(user)
	} catch (e) {
		res.status(500).json(e)
	}
}

export const updateUser = async (req, res) => {
	if (req.username !== req.params.username) return res.status(403).json('You are not authorized to update user.')
	try {
		const user = await new User(req.body).update(req.params.username)
		res.status(200).json(user)
	} catch (e) {
		res.status(500).json({ thisiswheretheerrorhappened: e.message })
	}
}

export const deleteUser = async (req, res) => {
	if (req.username !== req.params.username) return res.status(403).json('You are not authorized to delete user.')
	try {
		const deleteResult = await User.delete(req.params.username)
		res.status(200).json(deleteResult)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}

export const loginUser = async (req, res) => {
	try {
		const user = await new User(req.body).login()
		res.status(200).json(user)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}