// React imports
import { useState, useCallback } from 'react';

// Third-party imports
import * as d3 from 'd3';

export const Left = () => {
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
			<img
				className="page5-image"
				src="static/components/landing/devices/pc.png"
				alt="pc" 
				style={{ maxHeight: d3.min([width, height]) }}
			/>
		</div>
	)
}

Left.displayName="Left";