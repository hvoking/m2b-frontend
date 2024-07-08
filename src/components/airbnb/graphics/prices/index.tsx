// React imports
import { useEffect } from 'react';

// App imports
import { SVGWrapper } from './svg';
import { Bars } from './bars';
import { Marker } from './marker';
import { createJsonFromArray } from './createArr';
import { Legend } from './legend';
import { Header } from './header';

// Context imports
import { usePricesSizes } from '../../context/sizes/prices';
import { usePrices } from '../../context/filters/prices';
import { useLinesLimits } from '../../context/limits/lines';
import { usePricesLimits } from '../../context/limits/prices';

// Third party imports
import * as d3 from 'd3';

export const Prices = () => {
	const { innerWidth, innerHeight } = usePricesSizes();
	const { setPriceMin, setPriceMax, leftPosition, setLeftPosition, rightPosition, setRightPosition } = usePrices();
	const { filterPoints } = usePricesLimits();
	const { bottomLimit, topLimit, minLine, maxLine } = useLinesLimits();

	const minBound: any = d3.max([minLine - (maxLine + minLine) * 0.2, 0]); 
    const maxBound = maxLine + (maxLine + minLine) * 0.2;

    useEffect(() => {
    	setLeftPosition(minBound);
    	setPriceMin(minBound);
    }, [minBound]);

    useEffect(() => {
    	setRightPosition(maxBound);
    	setPriceMax(maxBound);
    }, [maxBound]);

    if (!filterPoints) return <></>

    const divisions: number = 12;
	const filterPrices = filterPoints.map((item: any) => {if (item.price > 0) { return item.price }});

    const pricesCounts = createJsonFromArray(
		filterPrices,
		minBound,
		maxBound,
		divisions
	);

	const pricesKeys = Object.keys(pricesCounts);
    const pricesValues: any = Object.values(pricesCounts);

    const minValue: any = d3.min(pricesValues);
    const maxValue: any = d3.max(pricesValues);

	const xScale: any = d3.scaleLinear()
		.domain([0, divisions])
		.range([0, innerWidth]);

	const yScale: any = d3.scaleLinear()
		.domain([ minValue, maxValue ])
		.range([0, innerHeight]);

	const xPriceScale: any = d3.scaleLinear()
		.domain([minBound, maxBound])
		.range([0, innerWidth]);

	return (
		<div className="right-item-wrapper">
			<Header/>
			<SVGWrapper>
				<Legend 
					innerHeight={innerHeight} 
					xScale={xPriceScale}
					currentPosition={leftPosition}
				/>
				<Legend 
					innerHeight={innerHeight} 
					xScale={xPriceScale}
					currentPosition={rightPosition}
				/>
				<Bars
					xScale={xScale}
					xPriceScale={xPriceScale}
					yScale={yScale}
					pricesArray={pricesValues}
					pricesKeys={pricesKeys}
					innerWidth={innerWidth}
					innerHeight={innerHeight}
					setLeftPosition={setLeftPosition}
					setRightPosition={setRightPosition}
					leftPosition={leftPosition}
					rightPosition={rightPosition}
					minBound={minBound}
					maxBound={maxBound}
					bottomLimit={bottomLimit}
					topLimit={topLimit}
				/>
				<Marker 
					xScale={xPriceScale} 
					innerHeight={innerHeight}
					minBound={minBound}
					maxBound={maxBound}
				/>
			</SVGWrapper>
	  </div>
	)
}

Prices.displayName="Prices";