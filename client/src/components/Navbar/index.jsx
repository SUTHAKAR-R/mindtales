import React from 'react'
import { Link } from 'react-router-dom'

import { useAuthDispatch, useAuthState } from '../../context'
import './styles.css'

const Navbar = () => {

	const { loggedIn } = useAuthState()
	const dispatch = useAuthDispatch()

	return (
		<div className='navbar'>
			<div className="left">
				<i className='fab fa-facebook-square' />
				<i className='fab fa-twitter-square' />
				<i className='fab fa-instagram-square' />
				<i className='fab fa-pinterest-square' />
			</div>
			<div className='center'>
				<ul>
					<li><Link to='/' className='link'>HOME</Link></li>
					<li><Link to='/profile' className='link'>ABOUT</Link></li>
					<li><Link to='/write' className='link'>WRITE</Link></li>
					{loggedIn ? (
						<li onClick={() => dispatch({ type: 'LOGOUT' })}>LOGOUT</li>
					) : (
						<>
							<li><Link to='/login' className='link'>LOGIN</Link></li>
							<li><Link to='/register' className='link'>REGISTER</Link></li>
						</>
					)}
				</ul>
			</div>
			<div className='right'>
				{loggedIn && (
					<>
						<img
							src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
							alt=""
						/>
						<i className='fas fa-search' />
					</>
				)}
			</div>
		</div>
	)
}

export default Navbar