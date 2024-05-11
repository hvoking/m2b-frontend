// Routes
import { Landing } from '../components/landing';
import { Main } from '../components/main';

// Third party imports
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

export const M2BRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Landing/>}/>
				<Route path='/m2b' element={<Main/>}/>
			</Routes>
		</Router>
	)
}

M2BRoutes.displayName="M2BRoutes"