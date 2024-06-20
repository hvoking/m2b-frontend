// App imports
import { Prices } from './prices';
import { Timeseries } from './timeseries';
import { Pictures } from './pictures';
import { Values } from './values';
import './styles.scss';

// Context imports
import { useLinesApi } from '../context/api/imoveis/lines';
import { usePricesApi } from '../context/api/imoveis/prices';

export const Right = () => {
	const { linesData } = useLinesApi();
	const { pricesData } = usePricesApi();

	if (!linesData || !pricesData) return <></>

	return (
		<div className="right">
			<div className="right-wrapper">
				<Values/>
				<Prices 
					linesData={linesData} 
					pricesData={pricesData}
				/>
				<Timeseries/>
				<Pictures 
					linesData={linesData} 
					pricesData={pricesData}
				/>
			</div>
		</div>
	)
}

Right.displayName="Right";