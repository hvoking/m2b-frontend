import { useHexagonsApi } from '../../../context/api/hexagons';
import { useLinesLimits } from '../../../context/limits/lines';

export const Hexagons = ({ path }: any) => {
	const { hexagonsData } = useHexagonsApi();
	const { bottomLimit, topLimit } = useLinesLimits();

	return (
		<>
			{hexagonsData && hexagonsData.map((item: any, index: any) => 
				<path
					key={index}
					fill="rgba(255, 255, 255, 0.1)"
					stroke="rgba(255, 255, 255, 0.2)"
					strokeWidth={0.4}
					className="feature" 
					d={`${path(item.city_hex)}`}
				/>
			)}
		</>
	)
}

Hexagons.displayName="Hexagons";