import jwt from 'jsonwebtoken'
import multer from 'multer'

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})
export const upload = multer({ storage })

export const validate = schema => async (req, res, next) => {
	try {
		await schema.validate(req.body)
		next()
	} catch ({ path, message }) {
		return res.status(400).json({ [path]: message })
	}
}

export const verify = (req, res, next) => {
	const headers = req.headers.authorization
	if (headers) {
		const token = headers.split(' ')[1]
		if (token) {
			try {
				const { username } = jwt.verify(token, process.env.JWT_SECRET)
				req.username = username
				next()
			} catch ({ message }) {
				return res.status(401).json(message)
			}
		} else {
            return res.status(401).json('Auth headers malformed.')
		}
	} else {
		res.status(401).json('Auth headers must be provided.')
	}
}
