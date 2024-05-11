// App imports
import { Logo } from './logo';
import { Button } from './button';
import './styles.scss';

export const Header = () => {
	return (
		<div className="landing-header">
			<Logo/>
			<div></div>
			<Button/>
		</div>
	)
}

Header.displayName="Header";