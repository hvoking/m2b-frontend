// React imports
import { useEffect } from 'react';

// App imports
import { SVGWrapper } from './svg';
import { Bars } from './bars';
import { Header } from './header';
import { Marker } from './marker';
import { Numbers } from './numbers';
import { Flags } from './flags';
import { Ref } from './ref';

// Context imports
import { usePricesSizes } from '../../context/sizes/bottom/prices';
import { usePrices } from '../../context/filters/prices';
import { useLinesLimits } from '../../context/limits/lines';

// Third party imports
import * as d3 from 'd3';

export const Prices = ({ pricesData }: any) => {
	const { innerWidth, innerHeight } = usePricesSizes();
	const { 
		setPriceMin, setPriceMax, 
		leftPosition, setLeftPosition, 
		rightPosition, setRightPosition 
	} = usePrices();

	const { bottomLimit, topLimit, minLine, meanLine, maxLine } = useLinesLimits();

	const pricesArray = pricesData && pricesData.map((item: any) => item.price);
	
	const unitPriceFormat = (tickValue: any) => d3.format(".2s")(tickValue).replace('G', 'B');
	const priceFormat = (tickValue: any) => unitPriceFormat(tickValue);

	const minBound: any = d3.max([minLine - (maxLine + minLine) * 0.2, 0]); 
    const maxBound = maxLine + (maxLine + minLine) * 0.2;
    const divisions: number = 12;

    const createJsonFromArray = (arr: any) => {
		const rangeWidth = (maxBound - minBound) / divisions;

		// Initialize an object to store the counts for each range
		const rangeCounts: any = {};
		for (let i = 0; i < divisions; i++) {
			const lowerBound = minBound + i * rangeWidth;
			const upperBound = minBound + (i + 1) * rangeWidth;
			rangeCounts[`${lowerBound.toFixed(1)}-${upperBound.toFixed(1)}`] = 0;
		}

		// Iterate through the array and count the occurrences in the corresponding range
		arr.forEach((num: any) => {
			for (let i = 0; i < divisions; i++) {
			  const lowerBound = minBound + i * rangeWidth;
			  const upperBound = minBound + (i + 1) * rangeWidth;
			  if (lowerBound <= num && num < upperBound) {
			    rangeCounts[`${lowerBound.toFixed(1)}-${upperBound.toFixed(1)}`]++;
			    break;
			  }
			}
		});
      return rangeCounts;
    }

    const pricesCounts = pricesArray && createJsonFromArray(pricesArray.filter((item: any) => item > 0));
    const pricesValues: any = pricesCounts && Object.values(pricesCounts);
    const pricesKeys = pricesCounts && Object.keys(pricesCounts);

    const minValue: any = d3.min(pricesValues);
    const maxValue: any = d3.max(pricesValues);

	const xScale: any = d3.scaleLinear()
		.domain([0, divisions])
		.range([0, innerWidth]);

	const yScale: any = d3.scaleLinear()
		.domain([ minValue, maxValue ])
		.range([0, innerHeight - 45]);

	const xPriceScale: any = d3.scaleLinear()
		.domain([minBound, maxBound])
		.range([0, innerWidth]);

	useEffect(() => {
		setLeftPosition(minBound);
		setPriceMin(minBound);
	}, [minBound]);

	useEffect(() => {
		setRightPosition(maxBound);
		setPriceMax(maxBound);
	}, [maxBound]);

	return (
		<div className="bottom-prices-item-wrapper">
			<Header/>
			<SVGWrapper>
				<Bars
					bottomLimit={bottomLimit}
					topLimit={topLimit}
					xScale={xScale}
					yScale={yScale}
					pricesArray={pricesValues}
					pricesKeys={pricesKeys}
					innerWidth={innerWidth}
					innerHeight={innerHeight}
					leftPosition={leftPosition}
					rightPosition={rightPosition}
					priceFormat={priceFormat}
				/>
				<Flags
					minLine={minLine}
					meanLine={meanLine}
					maxLine={maxLine}
					xScale={xPriceScale}
					innerHeight={innerHeight}
					priceFormat={priceFormat}
				/>
				<Ref
					xPriceScale={xPriceScale}
					innerWidth={innerWidth}
					innerHeight={innerHeight}
					setLeftPosition={setLeftPosition}
					setRightPosition={setRightPosition}
					leftPosition={leftPosition}
					rightPosition={rightPosition}
					minBound={minBound}
					maxBound={maxBound}
				/>
				<Marker 
					xScale={xPriceScale} 
					innerHeight={innerHeight}
					minBound={minBound}
					maxBound={maxBound}
				/>
			</SVGWrapper>
			<Numbers 
				leftPosition={priceFormat(leftPosition)} 
				rightPosition={priceFormat(rightPosition)}
				setPriceMin={setPriceMin}
				setPriceMax={setPriceMax}
			/>
	  </div>
	)
}

Prices.displayName="Prices";