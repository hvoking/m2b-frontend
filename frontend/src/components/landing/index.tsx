// App imports
import { Header } from './header';
import { Pages } from './pages';
import './styles.scss';

export const Landing = () => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
	  let vh = window.innerHeight * 0.01;
	  document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
	
	return (
		<div className="landing">
			<Header/>
			<Pages/>
		</div>
	)
}

Landing.displayName="Landing";