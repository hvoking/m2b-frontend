// App imports
import './styles.scss';

// Context imports
import { useSamplesApi } from '../../../context/api/imoveis/samples';

// Third-party imports
import * as d3 from 'd3';

export const SellPrices = () => {
	const { samplesData } = useSamplesApi();
	const siFormat = d3.format(",");
	const valorAnuncio = samplesData && Math.round(samplesData.mean_price);

	return (
		<div className="sell-prices-wrapper">
			<div>
				<div className="sell-prices-title">
					Mean price
				</div>
				<div className="sell-prices-subtitle">
					calculated based on the samples
				</div>
				<div className="sell-prices-price">
					{siFormat(valorAnuncio).replaceAll(',', '.')} £
				</div>
			</div>
		</div>
	)
}

SellPrices.displayName="SellPrices";