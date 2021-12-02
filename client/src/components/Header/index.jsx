import React from 'react'

import './styles.css'

const Header = () => {
	return (
		<div className="header">
			<div>
				<span className='title-sm'>React & Node</span>
				<span className='titl-lg'>Mindtales</span>
			</div>
			<img
				src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
				alt=""
			/>
		</div>
	)
}

export default Header