import { useHexagonsApi } from '../../../context/api/hexagons'

export const Hexagons = ({ path }: any) => {
	const { hexagonsData } = useHexagonsApi();

	return (
		<>
			{hexagonsData && hexagonsData.map((item: any, index: any) => 
				<path
					key={index}
					fill="transparent"
					stroke={`rgba(255, 255, 255, 0.2)`}
					strokeWidth={1}
					className="feature" 
					d={`${path(item.city_hex)}`}
				/>
			)}
		</>
	)
}

Hexagons.displayName="Hexagons";