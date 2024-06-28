// App imports
import { Clustered } from './clustered';

// Context imports
import { useLinesLimits } from '../../../../context/limits/lines';
import { usePointsLimits } from '../../../../context/limits/points';
import { usePrices } from '../../../../context/filters/prices';

export const Clusters = () => {
	const { unitPrice } = usePrices();
	const { bottomLimit, topLimit } = useLinesLimits();
	const { filterPoints } = usePointsLimits();

	if (!filterPoints) return <></>

	const currentPriceString = unitPrice === "price" ? "price" : "unit_price";

	const colors: any = {
		"high": 'rgba(166, 166, 244, 1)',
		"mean": 'rgba(67, 181, 64, 1)',
		"min":  'rgba(255, 0, 0, 1)'
	}

	const classifiedPoints: any = filterPoints.reduce((total: any, item: any) => {
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
					/>
				)
			})}
		</>
	)
}