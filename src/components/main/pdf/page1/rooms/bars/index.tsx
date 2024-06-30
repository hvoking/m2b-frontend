// App imports
import { SVGWrapper } from './svg';

// Context imports
import { useEquipment } from '../../../../context/filters/equipment';
import { useBarsSizes } from '../../../../context/sizes/pdf/rooms/bars';

// Third-party imports
import * as d3 from 'd3';

const roomsColors: any = {
	1: 'rgba(109, 86, 166, 1)',
	2: 'rgba(84, 181, 103, 1)',
	3: 'rgba(65, 145, 198, 1)',
	4: 'rgba(254, 162, 90, 1)',
	5: 'rgba(254, 0, 23, 1)',
}

export const Bars = ({ roomsData, dsvData }: any) => {
	const { rooms, setRooms, setSuites, setGarages } = useEquipment();
	const { innerWidth, innerHeight } = useBarsSizes();

	const onClick = (item: any) => {
		item && setRooms(item);
		const obj = dsvData[`d${item}`].counts;
		const maxRooms = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b).split(',');

		setRooms(parseInt(maxRooms[0]))
		setSuites(null)
		setGarages(null)
	}

	const sortedRooms = Object.keys(roomsData);
	const roomsLength = sortedRooms.length;

	const currentY = innerHeight / roomsLength;
	const maxPercentage: any = d3.max(Object.values(roomsData));

	const xScale = d3.scaleLinear()
		.domain([0, maxPercentage])
		.range([0, 20]);

	let totalHeight = 0;
		
	return (
		<SVGWrapper>
			{
				sortedRooms.map((item: any, index: number) => {
					const currentPercent = roomsData[item] ? roomsData[item] : 0;
					totalHeight += index > 0 ? currentY : currentY / roomsLength;

					return (
						<g key={index} onClick={() => onClick(item)}>
						{currentPercent > 1 && 
							<>
								<rect
									x={0}
									y={totalHeight - 10}
							
									width={xScale(currentPercent)}
									height={20}
									fill={
										roomsData && String(rooms) === item ?
										roomsColors[item] :
										rooms === null ?
										String(roomsColors[item]) :
										String(roomsColors[item]).replace('1)', '0.4)')
									}	
								/>
								
								<text
									x={-40}
									y={totalHeight}
									fill={
										String(rooms) === item ?
										"rgba(0, 0, 0, 1)" :
										rooms === null ?
										"rgba(0, 0, 0, 1)" :
										"rgba(126, 126, 132, 1)"
										}
									textAnchor="start"
									alignmentBaseline="middle"
									fontSize="0.8em"
									fontWeight="500"
									style={{cursor: "pointer"}}
								>
									{item} dorm
								</text>
								<text
									x={innerWidth + 20}
									y={totalHeight}
									fill={
										String(rooms) === item ?
										"rgba(0, 0, 0, 1)" :
										rooms === null ?
										"rgba(0, 0, 0, 1)" :
										"rgba(126, 126, 132, 1)"
										}
									textAnchor="end"
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

Bars.displayName="Bars";