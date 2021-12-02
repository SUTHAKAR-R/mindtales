import 'dotenv/config'
import express from 'express'
import mongodb from 'mongodb'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'

import userRoutes from './routes/user'
import postRoutes from './routes/post'
import { upload } from './middlewares'

const app = express()
const client = new mongodb.MongoClient(process.env.DB_URI)
const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, 'images')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
app.use(upload.any())
app.use('/user', userRoutes)
app.use('/post', postRoutes)

app.listen(5000, async () => {
	console.log('Server running...🚀')
	await client.connect()
})

export const posts = client.db('mindtales').collection('posts')
export const users = client.db('mindtales').collection('users')
export default upload