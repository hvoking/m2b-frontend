// App imports
import { SVGWrapper } from './svg';
import { Circle } from './circle';

// Context imports
import { useEquipment } from '../../../../../context/filters/equipment';
import { useGaugeSizes } from '../../../../../context/sizes/pdf/rooms/gauge';

// Third party imports
import * as d3 from 'd3';

const roomsCounter: any = {
	5: 'rgba(254, 0, 23, 1)',
	4: 'rgba(254, 162, 90, 1)',
	3: 'rgba(65, 145, 198, 1)',
	2: 'rgba(84, 181, 103, 1)',
	1: 'rgba(109, 86, 166, 1)',
}

export const Gauge = ({ roomsData, dsvData }: any) => {
	const { rooms, setRooms, setSuites, setGarages } = useEquipment();
	const { innerWidth, innerHeight } = useGaugeSizes();

	let totalCircumference = 0;

	const radius = d3.min([innerWidth, innerHeight]) / 2;
	const strokeWidth = radius*0.4;
	const innerRadius = radius - ( strokeWidth / 2 );

	const circumference = innerRadius * 2 * Math.PI;

	const onClick = (item: any) => {
		setRooms(item);
		setSuites(null)
		setGarages(null)
	}
		
	return (
		<SVGWrapper>
			{Object.keys(roomsData).map((item: any) => {
				const currentPercent = roomsData[item] ? roomsData[item] : 0;
				const currentCircumference = Math.round(circumference * currentPercent / 100);

				if (currentCircumference) {
					totalCircumference += currentCircumference;
				}

				// Calculate the angle for the text
                const angle = (totalCircumference - currentCircumference / 2) * (360 / circumference);
                const radians = angle * (Math.PI / 180);
                const textX = innerWidth / 2 + (radius*0.8) * Math.cos(radians);
                const textY = innerHeight / 2 + (radius*0.8) * Math.sin(radians);

				return (
					<g key={item} onClick={() => onClick(item)}>
						{currentCircumference && roomsCounter[item] &&
							<>
							<Circle
								innerWidth={innerWidth}
								innerHeight={innerHeight}
								innerRadius={innerRadius}
								rooms={rooms}
								item={item}
								roomsCounter={roomsCounter}
								strokeWidth={strokeWidth}
								currentCircumference={currentCircumference}
								circumference={circumference}
								totalCircumference={totalCircumference}
							/>
							<text
								x={textX}
								y={textY}
								fill={
									String(rooms) === item ?
									"rgba(255, 255, 255, 1)" :
									rooms === null ?
									"rgba(255, 255, 255, 1)" :
									"rgba(255, 255, 255, 0.4)"
									}
								textAnchor="middle"
								alignmentBaseline="middle"
								fontWeight="600"
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

Gauge.displayName="Gauge";