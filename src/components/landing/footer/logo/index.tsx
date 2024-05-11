// App imports
import { Porpouse } from './porpouse';
import './styles.scss';

export const Logo = () => {
	return (
		<div className="footer-logo-wrapper">
			<img 
				className="footer-logo-image"
				src="static/logos/logoFooter.svg" 
				alt="logo-footer"
			/>
			<Porpouse/>
		</div>
	)
}

Logo.displayName="Logo";