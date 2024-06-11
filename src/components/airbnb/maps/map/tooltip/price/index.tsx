// Third-party imports
import * as d3 from 'd3';

const siFormat = (tickValue: any) => d3.format(".2s")(tickValue).replace('G', 'B');
const yAxisTickFormat = (tickValue: any) => siFormat(tickValue).replace('G', 'B');

export const Price = ({ price, propertyHoverInfo }: any) => {
	return (
		<div>
			price: {yAxisTickFormat(price)}
		</div>
	)
}

Price.displayName="Price";