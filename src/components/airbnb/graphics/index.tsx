// App imports
import { Prices } from './prices';
import { Timeseries } from './timeseries';
import './styles.scss';

// Context imports
import { useIsoPolygonApi } from '../context/api/isoPolygon';
import { usePricesApi } from '../context/api/imoveis/prices';

export const Graphics = () => {
	const { initialMarker } = useIsoPolygonApi();
	const { pricesData } = usePricesApi();

	return (
		<div className="airbnb-message-wrapper">
			{!initialMarker && pricesData &&
				<div className="airbnb-sidebar-items">
					<Prices pricesData={pricesData}/>
					<Timeseries/>
				</div>
			}
		</div>
	)
}

Graphics.displayName="Graphics";