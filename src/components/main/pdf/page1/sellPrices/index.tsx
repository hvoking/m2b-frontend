// App imports
import { Left } from './left';
import { Right } from './right';
import './styles.scss';

// Context imports
import { useSamplesApi } from '../../../context/api/imoveis/samples';
import { usePrices } from '../../../context/filters/prices';

// Third-party imports
import * as d3 from 'd3';

export const SellPrices = () => {
	const { samplesData } = useSamplesApi();
	const siFormat = d3.format(",");
	const { unitPrice } = usePrices();

	const currentUnit = unitPrice === "price" ? "" : "m²"

	return (
		<div className="sell-prices-wrapper">
			<Left 
				samplesData={samplesData}
				siFormat={siFormat}
				currentUnit={currentUnit}
			/>
			<Right
				samplesData={samplesData}
				siFormat={siFormat}
				currentUnit={currentUnit}
			/>
		</div>
	)
}

SellPrices.displayName="SellPrices";