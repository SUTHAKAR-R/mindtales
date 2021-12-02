import { Router } from 'express'
import { createUser, deleteUser, loginUser, updateUser } from '../controllers/user'
import { validate, verify } from '../middlewares'
import { UserSchema } from '../validations'

const router = Router()

router.post('/register', validate(UserSchema), createUser)
router.put('/:username', verify, updateUser)
router.delete('/:username', verify, deleteUser)
router.post('/login', loginUser)

export default router