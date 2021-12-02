import React from 'react'

import './styles.css'

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div>
				<span className='sidebar-title'>ABOUT ME</span>
				<img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" alt="" />
				<p>
					Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
					amet ex esse.Sunt eu ut nostrud id quis proident.
				</p>
			</div>
			<div>
				<span className='sidebar-title'>CATEGORIES</span>
				<ul>
					<li>Life</li>
					<li>Entertainment</li>
					<li>Travel</li>
					<li>Business</li>
					<li>Technology</li>
					<li>Sports</li>
				</ul>
			</div>
			<div>
				<span className='sidebar-title'>Contact Us</span>
				<div className='contact'>
					<i className='fab fa-facebook-square' />
					<i className='fab fa-twitter-square' />
					<i className='fab fa-instagram-square' />
					<i className='fab fa-pinterest-square' />
				</div>
			</div>
		</div>
	)
}

export default Sidebar