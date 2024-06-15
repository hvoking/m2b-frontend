import { useHexagonsApi } from '../../../context/api/hexagons'
import { useLinesLimits } from '../../../context/limits/lines';

export const Hexagons = ({ path }: any) => {
	const { hexagonsData } = useHexagonsApi();
	const { bottomLimit, topLimit } = useLinesLimits();

	return (
		<>
			{hexagonsData && hexagonsData.map((item: any, index: any) => 
				<path
					key={index}
					fill="transparent"
					stroke={
						item['avg_price'] === null ?
						"rgba(255, 255, 255, 0)" :
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