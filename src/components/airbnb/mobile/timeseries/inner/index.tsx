// App imports
import { TimeseriesRef } from './ref';
import { Points } from './points';
import { VerticalRef } from './vertical';
import { Lines } from './topLine';
import { Range } from './range';
import { Left } from './left';
import { Refs } from './refs';

// Context imports
import { useLinesApi } from '../../../context/api/imoveis/lines';
import { usePricesApi } from '../../../context/api/imoveis/prices';
import { useDates } from '../../../context/filters/dates';
import { useLinesLimits } from '../../../context/limits/lines';

// Third-party imports
import * as d3 from 'd3';

export const Inner = ({ xScale, yScale, innerWidth, innerHeight }: any) => {
  const { linesData } = useLinesApi();
  const { pricesData } = usePricesApi();
  const { startDate, finalDate } = useDates();
  const { bottomLimit, topLimit } = useLinesLimits();

  const startDateParts = startDate.split("-");
  const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

  const finalDateParts = finalDate.split("-");
  const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

  const pricesArray = pricesData.map((items: any) => items.price);

  const maxPoint = d3.max(pricesArray);
  const minPoint = d3.min(pricesArray);

	return (
		<>
      <rect 
        width={innerWidth} 
        height={innerHeight} 
        fill="rgba(23, 23, 32, 1)"
        stroke="rgba(126, 126, 132, 0)"
        strokeWidth={0}
      />
      <Left
        yScale={yScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
      />
      <Range
        yScale={yScale}
        yMin={bottomLimit}
        yMean={topLimit}
        maxPoint={maxPoint}
        minPoint={minPoint}
        width={innerWidth}
        height={innerHeight}
      />
      <VerticalRef
        xScale={xScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        stroke={"rgba(155, 155, 155, 1)"}
        strokeWidth={0.1}
        strokeDasharray={""}
      />
      <Lines 
        xScale={xScale}
        innerHeight={innerHeight}
      />
      <Points 
        xScale={xScale} 
        yScale={yScale} 
        linesData={linesData} 
        pricesData={pricesData} 
      />
      <Refs innerWidth={innerWidth} yScale={yScale}/>
      <rect 
        x={xScale(currentStartDate)} 
        width={xScale(currentFinalDate) - xScale(currentStartDate)} 
        height={innerHeight} 
        fill="rgba(126, 126, 132, 0.4)"
        stroke="rgba(126, 126, 132, 1)"
        strokeWidth={2}
      />
     <TimeseriesRef
        xScale={xScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
      />
		</>
	)
}

Inner.displayName="Inner";