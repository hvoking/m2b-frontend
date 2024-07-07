// React imports
import { useState, useCallback } from 'react';

// App imports
import './styles.scss';

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
			{height && <img 
				height={d3.min([width, height])}
				src="static/landing/gif/m2b_landing.gif"
				alt="m2b-landing"
			/>}
		</div>
	)
}

Right.displayName="Right";