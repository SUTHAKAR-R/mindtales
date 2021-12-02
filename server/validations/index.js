import yup from 'yup'

export const UserSchema = yup.object().shape({
	username: yup.string().min(4).required(),
	email: yup.string().email().required(),
	password: yup.string().min(8).required(),
	profile: yup.string()
})