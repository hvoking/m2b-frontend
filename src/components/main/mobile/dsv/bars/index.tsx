// App imports
import { SVGWrapper } from '../svg';
import { Background } from './background';
import { Front } from './front';
import { DsvText } from './text/dsv';
import { PercentText } from './text/percent';

// Context imports
import { useEquipment } from '../../../context/filters/equipment';
import { useDsvSizes } from '../../../context/sizes/bottom/dsv';

// Third party imports
import * as d3 from 'd3';

export const Bars = ({ dsvData }: any) => {
	const { rooms, suites, garages, setRooms, setSuites, setGarages } = useEquipment();
	const { innerWidth } = useDsvSizes();

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

	const currentDsvCount = dsvCount &&  Object.keys(dsvCount).sort((a, b) => dsvCount[b] - dsvCount[a])
		
	return (
		<SVGWrapper>
			{sumOfCounts && currentDsvCount && currentDsvCount.map((item: any, index: number) => {
				const currentPercent = (dsvCount[item] / sumOfCounts) * 100;
				const currentHeight = 35;
				const currentGap = 5;
				const currentDifference = 15;

				totalHeight += currentHeight;

				return (
					<g key={index}>
						{currentPercent > 2 && 
							<>
							<Background
								item={item}
								currentPercent={currentPercent}
								innerWidth={innerWidth}
								totalHeight={totalHeight}
								currentHeight={currentHeight}
								currentGap={currentGap}
								currentDifference={currentDifference}
								currentType={currentType}
								onClick={onClick}
							/>
							<Front
								item={item}
								innerWidth={innerWidth}
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
							/>
							<DsvText
								item={item}
								totalHeight={totalHeight}
								currentHeight={currentHeight}
								currentType={currentType}
								onClick={onClick}
							/>
							<PercentText
								item={item}
								innerWidth={innerWidth}
								totalHeight={totalHeight}
								currentHeight={currentHeight}
								currentType={currentType}
								onClick={onClick}
								currentPercent={currentPercent}
							/>
						</>
					}
					</g>
				)
			})}
		</SVGWrapper>
	)
}

Bars.displayName="Bars";