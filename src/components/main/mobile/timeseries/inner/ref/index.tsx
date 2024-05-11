// React imports
import { useRef, useCallback } from 'react';

// App imports
import { datesFormat } from '../../../../utils/constants';

// Context imports
import { useDates } from '../../../../context/filters/dates';

export const TimeseriesRef = ({	
	xScale, 
	innerWidth, innerHeight
}: any) => {
	const { dates, startDate, setStartDate, finalDate, setFinalDate } = useDates();
	const currentDragRef = useRef<any>(null);

	const startDateParts = startDate.split("-");
	const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

	const finalDateParts = finalDate.split("-");
	const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

	const onTouchStart = useCallback((event: any) => {
		const bounds = event.target.getBoundingClientRect();
	    const x = event.touches[0].clientX - bounds.left;

	    const activateLeft = Math.abs(xScale(dates[0]) - x);
	    const activateRight = Math.abs(xScale(dates[1]) - x);

	    if (activateRight < activateLeft) {
	        currentDragRef.current = 'right';
	    } else {
	        currentDragRef.current = 'left';
	    }
	}, [startDate, finalDate]);

	const onTouchMove = useCallback((event: any) => {
	    const bounds = event.target.getBoundingClientRect();
	    const x = event.touches[0].clientX - bounds.left;

	    const boundedLeft = 
	    	x < 0 ? 0 : 
	    	x > xScale(currentFinalDate) ? 
	    	xScale(currentFinalDate) :
	    	x;
	    const boundedRight = 
	    	x > innerWidth ? innerWidth : 
	    	x < xScale(currentStartDate) ? 
	    	xScale(currentStartDate) :
	    	x;

	    if (currentDragRef.current === 'left') {
	    	setStartDate(datesFormat(xScale.invert(boundedLeft)));
	    } else {
	    	setFinalDate(datesFormat(xScale.invert(boundedRight)));
	    }
	}, [startDate, finalDate]);

	return (
		<rect
			width={innerWidth}
			height={innerHeight}
			fill="transparent"
			onTouchStart={onTouchStart}
		    onTouchMove={onTouchMove}
		/>
	)
}

TimeseriesRef.displayName="TimeseriesRef";