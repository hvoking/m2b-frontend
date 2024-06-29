// App imports
import { SVGWrapper } from '../svg';
import { Front } from './front';
import { DsvText } from './text/dsv';
import { PercentText } from './text/percent';

// Context imports
import { useEquipment } from '../../../../context/filters/equipment';
import { usePdfDsvSizes } from '../../../../context/sizes/pdf/dsv';

// Third party imports
import * as d3 from 'd3';

export const Bars = ({ dsvData }: any) => {
	const { rooms, suites, garages, setRooms, setSuites, setGarages } = useEquipment();
	const { innerHeight } = usePdfDsvSizes();

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
		.range([0, innerHeight - 20])
		
	return (
		<SVGWrapper>
			{sumOfCounts && currentDsvCount && currentDsvCount.map((item: any, index: number) => {
				const currentPercent = (dsvCount[item] / sumOfCounts) * 100;

				if (currentPercent < 3) return <></>

				const currentHeight = 30;
				const currentGap = 5;
				const currentDifference = 10;

				totalHeight += currentHeight;

				return (
					<g key={index}>
							<Front
								item={item}
								innerWidth={innerHeight}
								totalHeight={totalHeight}
								currentHeight={currentHeight}
								currentGap={currentGap}
								currentPercent={currentPercent}
								currentDifference={currentDifference}
								currentType={currentType}
								dsvData={dsvData}
								rooms={rooms}
								suites={suites}
								onClick={onClick}
								reducedCount={dsvCount}
								sumOfCounts={sumOfCounts}
								combinedColors={combinedColors}
								yScale={yScale}
							/>
							<DsvText
								item={item}
								totalHeight={totalHeight}
								currentHeight={currentHeight}
								currentType={currentType}
								onClick={onClick}
								innerHeight={innerHeight}
							/>
							<PercentText
								item={item}
								innerWidth={innerHeight}
								totalHeight={totalHeight}
								currentHeight={currentHeight}
								currentType={currentType}
								onClick={onClick}
								currentPercent={currentPercent}
								yScale={yScale}
							/>
					</g>
				)
			})}
		</SVGWrapper>
	)
}

Bars.displayName="Bars";