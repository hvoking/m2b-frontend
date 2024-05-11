// App imports
import { SocialMedia } from './social';
import { Address } from './address';
import { Logo } from './logo';
import { Copyright } from './copyright';
import './styles.scss';

export const Footer = () => {
	return (
		<div className="landing-footer">
			<Logo/>
			<Address/>
			<SocialMedia/>
			<Copyright/>
		</div>
	)
}

Footer.displayName="Footer";
