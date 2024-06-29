// App imports
import { SVGWrapper } from '../svg';
import './styles.scss';

// Context imports
import { useEquipment } from '../../../../context/filters/equipment';
import { usePdfRoomsSizes } from '../../../../context/sizes/pdf/rooms';

// Third-party imports
import * as d3 from 'd3';

const roomsColors: any = {
	1: 'rgba(109, 86, 166, 1)',
	2: 'rgba(84, 181, 103, 1)',
	3: 'rgba(65, 145, 198, 1)',
	4: 'rgba(254, 162, 90, 1)',
	5: 'rgba(254, 0, 23, 1)',
}

export const Legend = ({ roomsData, dsvData }: any) => {
	const { rooms, setRooms, setSuites, setGarages } = useEquipment();
	const { innerWidth, innerHeight } = usePdfRoomsSizes();

	const onClick = (item: any) => {
		item && setRooms(item);
		const obj = dsvData[`d${item}`].counts;
		const maxRooms = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b).split(',');

		setRooms(parseInt(maxRooms[0]))
		setSuites(null)
		setGarages(null)
	}

	const sortedRooms = Object.keys(roomsData)
	const currentX = innerWidth / (Object.keys(sortedRooms).length + 1);
	const maxPercentage: any = d3.max(Object.values(roomsData));

	const yScale = d3.scaleLinear()
		.domain([0, maxPercentage])
		.range([0, innerHeight - 20]);

	let totalWidth = 0;
		
	return (
		<SVGWrapper>
			{
				sortedRooms.map((item: any, index: number) => {
					const currentPercent = roomsData[item] ? roomsData[item] : 0;
					totalWidth += currentX;

					return (
						<g key={index} onClick={() => onClick(item)}>
						{currentPercent > 1 && 
							<>
								<rect
									x={totalWidth}
									y={innerHeight - yScale(currentPercent) - 20}
									width={20}
									height={yScale(currentPercent)}
									fill={
										roomsData && String(rooms) === item ?
										roomsColors[item] :
										rooms === null ?
										String(roomsColors[item]) :
										String(roomsColors[item]).replace('1)', '0.4)')
									}	
								/>
								<text
									x={totalWidth + 10}
									y={innerHeight - 10}
									fill={String(rooms) === item ? 
										"rgba(0, 0, 0, 1)" : 
										"rgba(126, 126, 132, 1)"}
									textAnchor="middle"
									alignmentBaseline="middle"
									fontSize="0.8em"
									fontWeight="500"
									style={{cursor: "pointer"}}
								>
									{item} dorm
								</text>
								<text
									x={totalWidth + 10}
									y={innerHeight - yScale(currentPercent) - 25}
									fill={String(rooms) === item ? 
											"rgba(0, 0, 0, 1)" : 
											"rgba(126, 126, 132, 1)"}
									textAnchor="middle"
									alignmentBaseline="middle"
									fontSize="0.8em"
									fontWeight="500"
									style={{cursor: "pointer"}}
								>
									{Math.round(currentPercent)}%
								</text>

							</>
								
						}
					</g>
				)
			})}
		</SVGWrapper>
	)
}

Legend.displayName="Legend";