import React, { createContext, useContext, useEffect } from 'react'
import { useImmerReducer } from 'use-immer'

const AuthState = createContext()
const AuthDispatch = createContext()

const initialState = {
	loggedIn: Boolean(localStorage.getItem('token')),
	user: {
		username: localStorage.getItem('username'),
		email: localStorage.getItem('email'),
		profile: '',
		token: localStorage.getItem('token')
	}
}

const authReducer = (draft, { type, payload }) => {
	switch (type) {
		case 'LOGIN':
			draft.loggedIn = true
			draft.user = payload
			break
		
		case 'LOGOUT':
			draft.loggedIn = false
			break

		case 'UPDATE':
			draft.user.username = payload.username
			draft.user.email = payload.email
			break

		default:
			break
	}
}

export const AuthProvider = ({ children }) => {

	const [state, dispatch] = useImmerReducer(authReducer, initialState)

	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem('username', state.user.username)
			localStorage.setItem('email', state.user.email)
			localStorage.setItem('token', state.user.token)
		} else {
			localStorage.removeItem('username')
			localStorage.removeItem('email')
			localStorage.removeItem('token')
		}
	}, [state.loggedIn])

	return (
		<AuthState.Provider value={state}>
			<AuthDispatch.Provider value={dispatch}>
				{children}
			</AuthDispatch.Provider>
		</AuthState.Provider>
	)
}

export const useAuthState = () => {
	const { loggedIn, user } = useContext(AuthState)
	return { loggedIn, user }
}

export const useAuthDispatch = () => useContext(AuthDispatch)