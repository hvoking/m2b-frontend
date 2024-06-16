import { useHexagonsApi } from '../../../context/api/hexagons';
import { useLinesLimits } from '../../../context/limits/lines';
import { usePrices } from '../../../context/filters/prices';
import { useDates } from '../../../context/filters/dates';

// Third-party imports
import * as d3 from 'd3';

export const Hexagons = ({ path }: any) => {
	const { leftPosition, rightPosition } = usePrices();
	const { hexagonsData } = useHexagonsApi();
	const { bottomLimit, topLimit } = useLinesLimits();
	const { startDate, finalDate } = useDates();

	const startDateParts = startDate.split("-");
	const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

	const finalDateParts = finalDate.split("-");
	const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

	const hexagonAvg: any = (properties: any) => {
		const filterPointByDates: any = properties.filter((item: any) => 
			leftPosition < item['price'] &&
			item['price'] < rightPosition &&
			currentStartDate < new Date(item.first_review) 
			&& new Date(item.first_review) < currentFinalDate)
		const prices = filterPointByDates.map((item: any) => item.price);
		const avg = d3.mean(prices);
		return avg
	}
	const filterHexagons = (avg: any) => {
		return leftPosition < avg && avg < rightPosition
	}
	return (
		<>
			{hexagonsData && hexagonsData.map((item: any, index: any) => {
				const avg = hexagonAvg(item.properties);

				return (
					<path
						key={index}
						fill={
							avg > topLimit ?
						    "rgba(42, 43, 96, 1)" :
						    avg < bottomLimit ?
						    "rgba(68, 27, 30, 1)" : 
						    avg > bottomLimit && avg < topLimit ?
						    "rgba(21, 59, 39, 1)" :
						    "rgba(23, 23, 32, 1)"
						}
						stroke={
							avg > topLimit ?
						    "rgba(166, 166, 244, 1)" :
						    avg < bottomLimit ?
						    "rgba(255, 0, 0, 1)" : 
						    avg > bottomLimit && avg < topLimit ?
						    "rgba(57, 181, 74, 1)" :
						    "rgba(255, 255, 255, 0.25)"
						}
						strokeWidth={0.4}
						className="feature" 
						d={`${path(item.hex_geom)}`}
					/>
				)
			})}
		</>
	)
}

Hexagons.displayName="Hexagons";