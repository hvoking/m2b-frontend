import { usePricesLimits } from '../../../context/limits/prices';
import { useLinesLimits } from '../../../context/limits/lines';

export const Hexagons = ({ path }: any) => {
	const { filterHexagons } = usePricesLimits();
	const { bottomLimit, topLimit } = useLinesLimits();

	return (
		<>
			{filterHexagons && filterHexagons.map((item: any, index: any) => 
				<path
					key={index}
					fill={
						item['avg_price'] > topLimit ?
					    "rgba(42, 43, 96, 1)" :
					    item['avg_price'] < bottomLimit ?
					    "rgba(68, 27, 30, 1)" : 
					    item['avg_price'] > bottomLimit && item['avg_price'] < topLimit ?
					    "rgba(21, 59, 39, 1)" :
					    "rgba(255, 255, 255, 0)"
					}
					stroke={
						item['avg_price'] > topLimit ?
					    "rgba(166, 166, 244, 1)" :
					    item['avg_price'] < bottomLimit ?
					    "rgba(255, 0, 0, 1)" : 
					    item['avg_price'] > bottomLimit && item['avg_price'] < topLimit ?
					    "rgba(57, 181, 74, 1)" :
					    "rgba(255, 255, 255, 0)"
					}
					strokeWidth={0.4}
					className="feature" 
					d={`${path(item.city_hex)}`}
				/>
			)}
		</>
	)
}

Hexagons.displayName="Hexagons";