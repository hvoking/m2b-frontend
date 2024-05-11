// React imports
import { useEffect } from 'react';

// App imports
import { SVGWrapper } from './svg';
import { Bars } from './bars';
import { Header } from './header';
import { Marker } from './marker';
import { Numbers } from './numbers';
import { Flags } from './flags';
import { Refs } from './refs';
import { createJsonFromArray } from '../../utils/createArr';
import { priceFormat } from '../../utils/constants';

// Context imports
import { usePricesSizes } from '../../context/sizes/prices';
import { usePrices } from '../../context/filters/prices';
import { useAreas } from '../../context/filters/areas';
import { useDates } from '../../context/filters/dates';
import { usePropertyType } from '../../context/filters/property';
import { useLinesLimits } from '../../context/limits/lines';

// Third party imports
import * as d3 from 'd3';

export const Prices = ({ linesData, pricesData }: any) => {
	const { margin, innerWidth, innerHeight } = usePricesSizes();
	const { setPriceMin, setPriceMax, leftPosition, setLeftPosition, rightPosition, setRightPosition, unitPrice } = usePrices();
	const { areaMin, areaMax } = useAreas();
	const { startDate, finalDate } = useDates();
	const { activeEquipment } = usePropertyType();
	const { bottomLimit, topLimit, minLine, meanLine, maxLine } = useLinesLimits();

	const startDateParts = startDate.split("-");
	const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

	const finalDateParts = finalDate.split("-");
	const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

    const currentPriceString = 
        unitPrice === "price" ? 
        "price" : 
        "unit_price";

	const filterByAreas = pricesData.filter((d: any) => {
	    return (areaMin < d.processed_area && d.processed_area < areaMax)
	});

	const filterByDates = filterByAreas.filter((d: any) => {  		
  		return currentStartDate < new Date(d.start_date) && new Date(d.start_date) < currentFinalDate
  	});

	const pricesArray = filterByDates.map((item: any) => {
		return item[currentPriceString]
	});

	const activePoints = filterByDates.map((item: any) => {
	    if (item.furnished === 1 && activeEquipment === "furnished") {
	        return item[currentPriceString]
	    }
	    else if (item.pool === 1 && activeEquipment === "pool") {
	        return item[currentPriceString]
	    }
	    else if (item.new === 1 && activeEquipment === "new") {
	        return item[currentPriceString]
	    }
	    else if (item.status === 1 && activeEquipment === "status") {
	        return item[currentPriceString]
	    }
	    return null
	});

	const filterPoints = 
	    activeEquipment === "furnished" || 
	    activeEquipment === "pool" || 
	    activeEquipment === "new" || 
	    activeEquipment === "status" ?
	    activePoints :
	    pricesArray;

	const minBound: any = d3.max([minLine - (maxLine + minLine) * 0.2, 0]); 
    const maxBound = maxLine + (maxLine + minLine) * 0.2;
    const divisions: number = 12;

    const pricesCounts = 
    	createJsonFromArray(
    		filterPoints.filter((item: any) => item > 0),
    		minBound,
    		maxBound,
    		divisions
    	);
    const pricesValues: any = Object.values(pricesCounts);

    const minValue: any = d3.min(pricesValues);
    const maxValue: any = d3.max(pricesValues);
    
    const pricesKeys = Object.keys(pricesCounts);

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
		<div className="right-item-wrapper">
			<Header/>
			<SVGWrapper>
				<Bars
					xScale={xScale}
					xPriceScale={xPriceScale}
					yScale={yScale}
					pricesArray={pricesValues}
					pricesKeys={pricesKeys}
					margin={margin}
					innerWidth={innerWidth}
					innerHeight={innerHeight}
					unitPrice={unitPrice}
					setLeftPosition={setLeftPosition}
					setRightPosition={setRightPosition}
					leftPosition={leftPosition}
					rightPosition={rightPosition}
					priceFormat={priceFormat}
					minBound={minBound}
					maxBound={maxBound}
					bottomLimit={bottomLimit}
					topLimit={topLimit}
				/>
				<Refs
					data={linesData}
					xScale={xPriceScale}
					innerHeight={innerHeight}
					unitPrice={unitPrice}
					priceFormat={priceFormat}
				/>
				<Flags
					minLine={minLine}
					meanLine={meanLine}
					maxLine={maxLine}
					xScale={xPriceScale}
					priceFormat={priceFormat}
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