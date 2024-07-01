// App imports
import { SVGWrapper } from './svg';

// Context imports
import { useEquipment } from '../../../../../context/filters/equipment';
import { useBarsSizes } from '../../../../../context/sizes/pdf/dsv/bars';

// Third party imports
import * as d3 from 'd3';

export const Bars = ({ dsvData }: any) => {
	const { rooms, suites, garages, setRooms, setSuites, setGarages } = useEquipment();
	const { innerWidth } = useBarsSizes();

	const currentType = `${rooms},${suites},${garages}`;

	let totalHeight = 0;
	const currentHeight = 23;

	const onClick = (item: any) => {
		const newItem = item.split(",")

		setRooms(newItem[0])
		setSuites(newItem[1])
		setGarages(newItem[2])
	}
	const combinedCounts = {};
	const combinedColors = {};

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

	const currentDsvCount: any = dsvCount &&  Object.keys(dsvCount).sort((a, b) => dsvCount[b] - dsvCount[a]);

	currentDsvCount && currentDsvCount.sort((a: any, b: any) => {
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

	const yScale: any = d3.scaleLinear()
		.domain([0, topDsvCount])
		.range([0, innerWidth]);

	let startFlag = false;
		
	return (
		<SVGWrapper>
			{sumOfCounts && currentDsvCount && currentDsvCount.map((item: any, index: number) => {
				const currentPercent = (dsvCount[item] / sumOfCounts) * 100;
				const currentColor = rooms ? dsvData[`d${rooms}`]['colors'] : combinedColors;

				if (currentPercent < 5) return <></>

				totalHeight += startFlag ? currentHeight : 10;
				startFlag = true

				return (
					<g key={index}>
						<rect
							x={-40}
							y={totalHeight - 10}
							width={40 + yScale(currentPercent)}
							height={20}
							stroke={
								currentType === item ? 
								"rgba(0, 0, 0, 1)" : 
								"rgba(255, 255, 255, 1)"
							}
							strokeWidth={currentType === item ? "1" : "0"}
							fill={
								currentType === item ?
								currentColor[item] :
								suites === null ?
								String(currentColor[item]) :
								String(currentColor[item]).replace('1)', '0.4)')
							}
							style={{cursor: "pointer"}}
							onClick={() => onClick(item)}
						>
							<title>
								{Math.round(dsvCount[item]/sumOfCounts * 100)}%
							</title>
						</rect>
						<text
							x={-37}
							y={totalHeight}
							fill={
								rooms === null ?
								"rgba(255, 255, 255, 1)" : 
								currentType === item ? 
								"rgba(255, 255, 255, 1)" : 
								"rgba(255, 255, 255, 1)"}
							textAnchor="start"
							alignmentBaseline="middle"
							fontWeight="600"
							fontSize="0.8em"
							onClick={() => onClick(item)}
							style={{cursor: "pointer"}}
						>
							{item}
						</text>
					</g>
				)
			})}
		</SVGWrapper>
	)
}

Bars.displayName="Bars";