// React imports
import { useState, useCallback } from 'react';

// Third-party imports
import * as d3 from 'd3';

export const Right = () => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const parentRef = useCallback((node: any) => {
		if (node) {
			setWidth(node.getBoundingClientRect().width);
			setHeight(node.getBoundingClientRect().height);
		}
	}, []);

	return (
		<div 
			ref={parentRef}
			className="landing-gif-wrapper"
			style={{width: "100%", height: "100%", display: "grid", alignItems: "center"}}
		>
			{width && height && <img
				className="page4-image"
				src="static/components/landing/devices/mobile.gif" 
				alt="mobile" 
				style={{maxHeight: d3.min([width / 1.2, height / 1.2])}}
			/>}
		</div>
	)
}

Right.displayName="Right";