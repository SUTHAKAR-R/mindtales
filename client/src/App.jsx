import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { useAuthState } from './context'
import { Navbar } from './components'
import { Home, View, Write, Profile, Login, Register, Edit } from './pages'

const App = () => {

	const { loggedIn } = useAuthState()

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/view/:id' component={View} />
				<Route path='/edit/:id' component={Edit} />
				<Route path='/write'>{loggedIn ? <Write /> : <Redirect to='/login'/>}</Route>
				<Route path='/profile'>{loggedIn ? <Profile /> : <Redirect to='/login' />}</Route>
				<Route path='/login'>{loggedIn ? <Redirect to='/' /> : <Login/>}</Route>
				<Route path='/register'>{loggedIn ? <Redirect to='/' /> : <Register/>}</Route>
				<Redirect to='/' />
			</Switch>
		</BrowserRouter>
	)
}

export default App
