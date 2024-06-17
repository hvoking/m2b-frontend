// React imports
import { useEffect, useRef, useCallback, Children, cloneElement } from 'react';

// Context imports
import { useSvgMapSizes } from '../../../context/sizes/svgMap';

// Third-party imports
import * as d3 from 'd3';

export const SVGWrapper = ({ children }: any) => {
	const svgRef = useRef<any>(null);
	const { width, height, setWidth, setHeight, margin } = useSvgMapSizes();

	const parentRef = useCallback((node: any) => {
		if (node) {
			setWidth(node.getBoundingClientRect().width);
			setHeight(node.getBoundingClientRect().height);
		}
	}, []);

	return (
		<div ref={parentRef} style={{width: "100%", height: "100%"}}>
			{width &&
				<svg 
					ref={svgRef}
					fill="none" 
					viewBox={`0 0 ${width} ${height}`} 
					preserveAspectRatio="none"
				>
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						{
				          Children.map(children, (child, index) => {
				            return cloneElement(child, {width: "100%"});
				          })
				        }
			        </g>
				</svg>
			}
		</div>
	)
}

SVGWrapper.displayName="SVGWrapper";