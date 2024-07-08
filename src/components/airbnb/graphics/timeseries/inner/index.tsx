// React imports
import { useState } from 'react';

// App imports
import { Lines } from './topLine';
import { Left } from './left';
import { Points } from './points';
import { Range } from './range';
import { Refs } from './refs';
import { TimeseriesRef } from './ref';
import { Tooltip } from './tooltip';
import { VerticalRef } from './vertical';
import { yAxisTickFormat } from '../../../utils/constants';

// Context imports
import { useLinesApi } from '../../../context/api/imoveis/lines';
import { usePricesApi } from '../../../context/api/imoveis/prices';
import { useDates } from '../../../context/filters/dates';
import { useLinesLimits } from '../../../context/limits/lines';
import { usePricesLimits } from '../../../context/limits/prices';

// Third-party imports
import * as d3 from 'd3';

export const Inner = ({ xScale, yScale, innerWidth, innerHeight }: any) => {
  const { linesData } = useLinesApi();
  const { pricesData } = usePricesApi();
  const { formatedStartDate, formatedFinalDate } = useDates();
  const { bottomLimit, topLimit } = useLinesLimits();
  const { filterPoints } = usePricesLimits();

  const [ activeTooltip, setActiveTooltip ] = useState(false);
  const [ cursorPosition, setCursorPosition ] = useState({x: 0, y: 0})
  const [ cursorPrice, setCursorPrice ] = useState(null);

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

  if (!filterPoints) return <></>

  const pricesArray = pricesData.map((items: any) => items.price);

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
        pricesData={filterPoints} 
      />
      <Refs innerWidth={innerWidth} yScale={yScale}/>
      <rect 
        x={xScale(formatedStartDate)} 
        y={0} 
        width={xScale(formatedFinalDate) - xScale(formatedStartDate)} 
        height={innerHeight} 
        fill="rgba(126, 126, 132, 0.4)"
        stroke="rgba(126, 126, 132, 1)"
        strokeWidth={0.4}
      />
      <Tooltip
        activeTooltip={
          activeTooltip && 
          cursorPosition.x + 10 >= xScale(formatedStartDate) && 
          cursorPosition.x < xScale(formatedFinalDate)
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