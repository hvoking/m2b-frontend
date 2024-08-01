// App imports
import { Clustered } from './clustered'

// Context imports
import { useLinesLimits } from '../../../context/limits/lines';
import { usePricesLimits } from '../../../context/limits/prices';
import { usePrices } from '../../../context/filters/prices';

export const PointsLayer = () => {
	const { bottomLimit, topLimit } = useLinesLimits();
	const { filterPrices } = usePricesLimits();
	const { unitPrice } = usePrices();
	
	if (!filterPrices) return <></>

	const colors: any = {
		"high": 'rgba(166, 166, 244, 1)',
		"mean": 'rgba(67, 181, 64, 1)',
		"min":  'rgba(255, 0, 0, 1)'
	}

	const currentPriceString = 
	    unitPrice === "price" ? 
	    "price" : 
	    "unit_price";

	const classifiedPoints: any = filterPrices.reduce((total: any, item: any) => {
		if (item[currentPriceString] >= topLimit) {
	        total.high.push(item);
	    } else if (item[currentPriceString] < bottomLimit) {
	        total.min.push(item);
	    } else {
	        total.mean.push(item);
	    }
		return total
	}, { high: [], min: [], mean: [] });

	return (
		<>
			{Object.keys(classifiedPoints).map((item: any) => {
				return (
					<Clustered 
						id={item}
						currentPoints={classifiedPoints[item]} 
						color={colors[item]}
						currentPriceString={currentPriceString}
					/>
				)
			})}
		</>
	)
}