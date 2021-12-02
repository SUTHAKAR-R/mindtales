import { Router } from 'express'
import { createPost, updatePost, getPosts, deletePost, getPost } from '../controllers/post'
import { upload, verify } from '../middlewares'

const router = Router()

router.get('/', getPosts)
router.post('/create', verify, createPost, upload.single('cover'))
router.put('/:id', verify, updatePost)
router.delete('/:id', verify, deletePost)
router.get('/:id', getPost)

export default router