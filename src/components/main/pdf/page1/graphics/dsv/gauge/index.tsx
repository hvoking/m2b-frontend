// App imports
import { SVGWrapper } from './svg';
import { Circle } from './circle';

// Context imports
import { useEquipment } from '../../../../../context/filters/equipment';
import { useGaugeSizes } from '../../../../../context/sizes/pdf/dsv/gauge';

// Third party imports
import * as d3 from 'd3';

const roomColors: any = {
	5: 'rgba(254, 0, 23, 1)',
	4: 'rgba(254, 162, 90, 1)',
	3: 'rgba(65, 145, 198, 1)',
	2: 'rgba(84, 181, 103, 1)',
	1: 'rgba(109, 86, 166, 1)',
}

export const Gauge = ({ roomsData, dsvData }: any) => {
	const { rooms, suites, garages, setRooms, setSuites, setGarages } = useEquipment();
	const { innerWidth, innerHeight } = useGaugeSizes();

	const currentType = `${rooms},${suites},${garages}`;

	let totalCircumference = 0;

	const onClick = (item: any) => {
		const newItem = item.split(",")

		setRooms(newItem[0])
		setSuites(newItem[1])
		setGarages(newItem[2])
	}

	const radius = d3.min([innerWidth, innerHeight]) / 2;
	const strokeWidth = radius*0.4;
	const innerRadius = radius - ( strokeWidth / 2 );

	const circumference = innerRadius * 2 * Math.PI;

	const combinedCounts: any = {};
	const combinedColors: any = {};

	if (dsvData) {
		for (const key in dsvData) {
		  if (dsvData.hasOwnProperty(key)) {
		    const dataset = dsvData[key];
		    if (dataset.counts && dataset.colors) {
		      Object.assign(combinedCounts, dataset.counts);
		      Object.assign(combinedColors, dataset.colors);
		    }
		  }
		}
	}

	const dsvCount = rooms ? dsvData[`d${rooms}`].counts : combinedCounts;
	const sumOfCounts = dsvCount && d3.sum(Object.values(dsvCount));

	const sortedDsvCount: any = dsvCount &&  Object.keys(dsvCount).sort((a, b) => dsvCount[b] - dsvCount[a]);

	sortedDsvCount && sortedDsvCount.sort((a: any, b: any) => {
	    let [a1, a2, a3] = a.split(',').map(Number);
	    let [b1, b2, b3] = b.split(',').map(Number);

	    if (a1 !== b1) {
	        return a1 - b1;
	    } else if (a2 !== b2) {
	        return a2 - b2;
	    } else {
	        return a3 - b3;
	    }
	});

	const maxCount: any = d3.max(Object.values(dsvCount))
	const topDsvCount: any =  (maxCount / sumOfCounts) * 100;

	return (
		<SVGWrapper>
			{sortedDsvCount.map((item: any) => {
				const currentPercent = (dsvCount[item] / sumOfCounts) * 100;
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
						{currentCircumference && combinedColors[item] &&
							<>
								<Circle
									innerWidth={innerWidth}
									innerHeight={innerHeight}
									innerRadius={innerRadius}
									rooms={currentType}
									item={item}
									combinedColors={combinedColors}
									strokeWidth={strokeWidth}
									currentCircumference={currentCircumference}
									circumference={circumference}
									totalCircumference={totalCircumference}
									suites={suites}
								/>
								<text
									x={textX}
									y={textY}
									fill={
										currentPercent < 5 ?
										"rgba(255, 255, 255, 0)" :
										currentType === item ?
										"rgba(255, 255, 255, 1)" :
										suites === null ?
										"rgba(255, 255, 255, 1)" :
										"rgba(255, 255, 255, 0.6)"
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