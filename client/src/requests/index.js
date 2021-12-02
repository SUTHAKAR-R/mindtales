export const registerUser = async (username, email, password) => {
	try {
		const response = await fetch('http://localhost:5000/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, email, password })
		})
		return await response.json()
	} catch (e) {
		console.log({ requestError: e.message })
	}
}

export const loginUser = async (username, password) => {
	try {
		const response = await fetch('http://localhost:5000/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		})
		return await response.json()
	} catch (e) {
		console.log({ requestError: e.message })
	}
}

export const updateUser = async (username, body, token) => {
	try {
		const response = await fetch(`http://localhost:5000/user/${username}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(body)
		})
		return await response.json()
	} catch (e) {
		console.log({ requestError: e.message })
	}
}

export const createPost = async (formData, token) => {
	try {
		const response = await fetch('http://localhost:5000/post/create', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			},
			body: formData
		})
		return await response.json()
	} catch (e) {
		console.log({ requestError: e.message })
	}
}

export const getPost = async id => {
	try {
		const response = await fetch(`http://localhost:5000/post/${id}`)
		return await response.json()
	} catch (e) {
		console.log({ requestError: e.message })
	}
}

export const updatePost = async (id, formData, token) => {
	try {
		const response = await fetch(`http://localhost:5000/post/${id}`, {
			method: 'PUT', 
			headers: {
				'Authorization': `Bearer ${token}`
			},
			body: formData
		})
		return await response.json()
	} catch (e) {
		console.log({ requestError: e.message })
	}
}

export const deletePost = async (id, token) => {
	try {
		const response = await fetch(`http://localhost:5000/post/${id}`, {
			method: 'DELETE', 
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		return await response.json()
	} catch (e) {
		console.log({ requestError: e.message })
	}
}

export const getPosts = async () => {
	try {
		const response = await fetch('http://localhost:5000/post')
		return await response.json()
	} catch (e) {
		console.log({ requestError: e.message })
	}
}