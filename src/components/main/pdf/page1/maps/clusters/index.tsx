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

	const roomsColors: any = {
		"rooms_4": 'rgba(254, 162, 90, 1)',
		"rooms_3": 'rgba(65, 145, 198, 1)',
		"rooms_2": 'rgba(84, 181, 103, 1)',
		"rooms_1": 'rgba(109, 86, 166, 1)',
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

	const classifiedPointsByRooms: any = filterPoints.reduce((total: any, item: any) => {
		if (item.rooms === 1) {
	        total.rooms_1.push(item);
	    } else if (item.rooms === 2) {
	        total.rooms_2.push(item);
	    } 
	    else if (item.rooms === 3) {
	        total.rooms_3.push(item);
	    } 
	    else if (item.rooms === 4){
	        total.rooms_4.push(item);
	    }
		return total
	}, { rooms_1: [],  rooms_2: [], rooms_3: [], rooms_4: [] });

	return (
		<>
			{Object.keys(classifiedPointsByRooms).map((item: any) => {
				return (
					<Clustered 
						id={item}
						currentPoints={classifiedPointsByRooms[item]} 
						color={roomsColors[item]}
					/>
				)
			})}
		</>
	)
}