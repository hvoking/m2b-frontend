// App imports
import { Prices } from './prices';
import { Timeseries } from './timeseries';
import './styles.scss';

export const Graphics = () => {
	return (
		<div className="airbnb-graphics">
			<Prices/>
			<Timeseries/>
		</div>
	)
}

Graphics.displayName="Graphics";