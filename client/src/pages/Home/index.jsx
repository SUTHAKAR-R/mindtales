import React from 'react'
import { Toaster } from 'react-hot-toast'

import { Header, Posts, Sidebar } from '../../components'
import './styles.css'

const Home = () => {
	return (
		<>
			<Header />
			<div className="home">
				<Posts />
				<Sidebar />
			</div>
			<Toaster />
		</>
	)
}

export default Home