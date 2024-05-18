// React imports
import { useState } from 'react';

// App imports
import { TimeseriesRef } from './ref';
import { Points } from './points';
import { VerticalRef } from './vertical';
import { Lines } from './topLine';
import { Tooltip } from './tooltip';
import { Range } from './range';
import { yAxisTickFormat } from '../../../utils/constants';
import { Mean } from './mean';
import { Refs } from './refs';
import { Left } from './left';

// Context imports
import { useLinesApi } from '../../../context/api/imoveis/lines';
import { usePricesApi } from '../../../context/api/imoveis/prices';
import { useDates } from '../../../context/filters/dates';
import { usePrices } from '../../../context/filters/prices';
import { useLinesLimits } from '../../../context/limits/lines';

// Third-party imports
import * as d3 from 'd3';

export const Inner = ({ xScale, yScale, innerWidth, innerHeight }: any) => {
  const { linesData } = useLinesApi();
  const { pricesData } = usePricesApi();
  const { dates, setDates, startDate, finalDate } = useDates();
  const { unitPrice } = usePrices();
  const { bottomLimit, topLimit } = useLinesLimits();

  const [ activeTooltip, setActiveTooltip ] = useState(false);
  const [ cursorPosition, setCursorPosition ] = useState({x: 0, y: 0})
  const [ cursorPrice, setCursorPrice ] = useState(null);

  const startDateParts = startDate.split("-");
  const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

  const finalDateParts = finalDate.split("-");
  const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

  const onMouseMove = ( event: any ) => {
    setActiveTooltip(true)
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const limitedX: any = d3.min([x, innerWidth - 35]);
    setCursorPosition({ x: limitedX, y: y})
    setCursorPrice(yAxisTickFormat(yScale.invert(y)))
  }

  const onMouseOut = () => {
    setActiveTooltip(false)
  }

  const pricesArray = pricesData.map((items: any) => 
      unitPrice === "price" ? 
      items.price : 
      items.unit_price
    );

  const maxPoint = d3.max(pricesArray);
  const minPoint = d3.min(pricesArray);

	return (
		<>
      <rect 
        x={0} 
        y={0} 
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
      <Mean
        unitPrice={unitPrice}
        yScale={yScale} 
        innerWidth={innerWidth} 
      />
      <rect 
        x={xScale(currentStartDate)} 
        y={0} 
        width={xScale(currentFinalDate) - xScale(currentStartDate)} 
        height={innerHeight} 
        fill="rgba(126, 126, 132, 0.4)"
        stroke="rgba(126, 126, 132, 1)"
        strokeWidth={0.4}
      />
      <Tooltip
        activeTooltip={
          activeTooltip && 
          cursorPosition.x + 10 >= xScale(currentStartDate) && 
          cursorPosition.x < xScale(currentFinalDate)
        } 
        cursorPosition={cursorPosition} 
        cursorPrice={cursorPrice}
      />
			<TimeseriesRef
        xScale={xScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
      />
		</>
	)
}

Inner.displayName="Inner";