// App imports
import { SVGWrapper } from '../svg';

// Context imports
import { useEquipment } from '../../../../context/filters/equipment';
import { usePdfDsvSizes } from '../../../../context/sizes/pdf/dsv';

// Third party imports
import * as d3 from 'd3';

export const Bars = ({ dsvData }: any) => {
	const { rooms, suites, garages, setRooms, setSuites, setGarages } = useEquipment();
	const { innerWidth } = usePdfDsvSizes();

	const currentType = `${rooms},${suites},${garages}`;

	let totalHeight = 0;

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
		.range([0, innerWidth - 20])
		
	return (
		<SVGWrapper>
			{sumOfCounts && currentDsvCount && currentDsvCount.map((item: any, index: number) => {
				const currentPercent = (dsvCount[item] / sumOfCounts) * 100;

				if (currentPercent < 3) return <></>

				const currentHeight = 23;

				totalHeight += index > 0 ? currentHeight : 10;

				const currentColor = rooms ? dsvData[`d${rooms}`]['colors'] : combinedColors;

				return (
					<g key={index}>
						<rect
							x={yScale(currentPercent)}
							y={totalHeight - 10}
							width={innerWidth - yScale(currentPercent) + 20}
							height={20}
							stroke={
								currentType === item ? 
								"rgba(0, 0, 0, 1)" : 
								"rgba(255, 255, 255, 1)"
							}
							strokeWidth={currentType === item ? "1" : "0"}
							fill="rgba(240, 240, 240, 1)"
							style={{cursor: "pointer"}}
							onClick={() => onClick(item)}
						/>
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
							x={-35}
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
							onClick={() => onClick(item)}
							style={{cursor: "pointer"}}
						>
							{item}
						</text>
						<text
							x={innerWidth + 15}
							y={totalHeight}
							fill={
								rooms === null ?
								"rgba(0, 0, 0, 1)" : 
								currentType === item ? 
								"rgba(0, 0, 0, 1)" : 
								"rgba(255, 255, 255, 1)"}
							textAnchor="end"
							alignmentBaseline="middle"
							fontWeight="600"
							onClick={() => onClick(item)}
							style={{cursor: "pointer"}}
						>
							{Math.round(currentPercent)}%
						</text>
					</g>
				)
			})}
		</SVGWrapper>
	)
}

Bars.displayName="Bars";