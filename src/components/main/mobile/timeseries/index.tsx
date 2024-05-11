// App imports
import { Inner } from './inner';
import { Wrapper } from './wrapper';
import { SVGWrapper } from './svg';

// Context imports
import { useDates } from '../../context/filters/dates';
import { usePrices } from '../../context/filters/prices';
import { useLinesApi } from '../../context/api/imoveis/lines';
import { useTimeseriesSizes } from '../../context/sizes/bottom/timeseries';

// Third party imports
import * as d3 from 'd3';

export const Timeseries = () => {
	const { dates } = useDates();
	const { unitPrice } = usePrices();
	const { linesData } = useLinesApi();
	const { innerWidth, innerHeight } = useTimeseriesSizes();

	if (!linesData) return <></>

	const minLine = 
		unitPrice === "price" ? 
		linesData.min_line_price : 
		linesData.min_line_unit_price;

	const maxLine = 
		unitPrice === "price" ? 
		linesData.max_line_price : 
		linesData.max_line_unit_price;

	const xScale = d3.scaleTime()
		.domain(dates)
		.range([0, innerWidth]);

	const yScale = d3.scaleLinear()
	  .domain([
	    maxLine + (maxLine + minLine) * 0.2, 
	    minLine - (maxLine + minLine) * 0.2, 
	  ])
	  .range([0, innerHeight]);  

	return (
		<div className="bottom-prices-item-wrapper">
			<div className="sidebar-title-wrapper">Intervalo de tempo</div>
			<SVGWrapper>
				<Wrapper
					xScale={xScale}  
					innerWidth={innerWidth} 
					innerHeight={innerHeight} 
				/>
				<Inner
					xScale={xScale}
					yScale={yScale}
					innerWidth={innerWidth}
					innerHeight={innerHeight}
				/>
		  	</SVGWrapper>
	  </div>
	)
}

Timeseries.displayName="Timeseries";