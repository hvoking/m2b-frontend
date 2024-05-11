// App imports
import { Clients } from './clients';
import { Partners } from './partners';
import './styles.scss';

export const Social = () => {
	return (
		<div className="social-wrapper">
			<div className="social-logos-wrapper">
				<div className="footers-title">Clientes</div>
				<Clients/>
				<div className="footers-title">Parceiros</div>
				<Partners/>
			</div>
		</div>
	)
}

Social.displayName="Social"
