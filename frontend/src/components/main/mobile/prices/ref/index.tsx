// React imports
import { useRef, useCallback } from 'react';

export const Ref = ({
	xPriceScale, 
	innerWidth, innerHeight,
	rightPosition, setRightPosition, 
	leftPosition, setLeftPosition, 
	minBound, maxBound,
}: any) => {
	const currentDragRef = useRef<any>(null);

	const onTouchStart = useCallback((event: any) => {
	    const bounds = event.target.getBoundingClientRect();
	    const x = xPriceScale.invert(event.touches[0].clientX - bounds.left);
	    
	    const activateRight = Math.abs(rightPosition - x);
	    const activateLeft = Math.abs(leftPosition - x);

	    if (activateRight < activateLeft) {
	        currentDragRef.current = 'right';
	    } else {
	        currentDragRef.current = 'left';
	    }
	}, [rightPosition, leftPosition]);

	const onTouchMove = useCallback((event: any) => {
	    const bounds = event.target.getBoundingClientRect();
	    const x = xPriceScale.invert(event.touches[0].clientX - bounds.left);

	    const boundedLeft = 
	        x < minBound ? minBound : 
	        x > rightPosition ? rightPosition : 
	        x;
	    const boundedRight = 
	        x > maxBound ? maxBound : 
	        x < leftPosition ? leftPosition : 
	        x;
	    if (currentDragRef.current === 'left') {
	        setLeftPosition(+boundedLeft);
	    } else {
	        setRightPosition(+boundedRight);
	    }
	}, [rightPosition, leftPosition]);

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

Ref.displayName="Ref";