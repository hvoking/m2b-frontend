export const Flags = ({ minLine, meanLine, maxLine, xScale, innerHeight, priceFormat }: any) => {
	return (
		<>
    		<line
                x1={xScale(maxLine)}
                x2={xScale(maxLine)}
                y1={8}
                y2={innerHeight}
                style = {{
                    stroke: "rgba(126, 126, 132, 1)", 
                    strokeWidth: 1.6, 
                    strokeDasharray:"10 6"
                }}
            />
            <rect
            	x={xScale(maxLine) + 2}
            	y={0}
            	rx="3px"
            	ry="3px"
            	width={35}
            	height={16}
            	fill="rgba(42, 43, 96, 1)"
            	stroke="rgba(166, 166, 244, 1)"
            	strokeWidth={1}
            />
            <text
            	style={{textAnchor:"start", alignmentBaseline: "middle"}}
            	x={xScale(maxLine) + 6}
            	y={9}
            	className="axis-left-text"
            	fill="rgba(255, 255, 255, 1)"
				fontSize="0.8em"
				fontWeight="550"
            >
            	{priceFormat(maxLine)}
            </text>
			<line
	            x1={xScale(meanLine)}
	            x2={xScale(meanLine)}
	            y1={8}
	            y2={innerHeight}
	            style = {{
	                stroke: "rgba(126, 126, 132, 1)", 
	                strokeWidth: 1.6, 
	                strokeDasharray:"10 6"
	            }}
	        />
	        <rect
	        	x={xScale(meanLine) + 2}
	        	y={0}
	        	rx="3px"
	        	ry="3px"
	        	width={35}
	        	height={16}
	        	fill="rgba(21, 59, 39, 1)"
	        	stroke="rgba(57, 181, 74, 1)"
	        	strokeWidth={1}
	        />
	        <text
	        	style={{textAnchor:"start", alignmentBaseline: "middle"}}
	        	x={xScale(meanLine) + 6}
	        	y={9}
	        	className="axis-left-text"
	        	fill="rgba(255, 255, 255, 1)"
				fontSize="0.8em"
				fontWeight="550"
	        >
	        	{priceFormat(meanLine)}
	        </text>
    		<line
                x1={xScale(minLine)}
                x2={xScale(minLine)}
                y1={8}
                y2={innerHeight}
                style = {{
                    stroke: "rgba(126, 126, 132, 1)", 
                    strokeWidth: 1.6, 
                    strokeDasharray:"10 6"
                }}
            />
    		<rect
    			x={xScale(minLine) + 2}
    			y={0}
    			rx="3px"
    			ry="3px"
    			width={35}
    			height={16}
    			fill="rgba(68, 27, 30, 1)"
	        	stroke="rgba(255, 0, 0, 1)"
    			strokeWidth={1}
    		/>
    		<text
    			style={{textAnchor:"start", alignmentBaseline: "middle"}}
    			x={xScale(minLine) + 6}
    			y={9}
    			className="axis-left-text"
    			fill="rgba(255, 255, 255, 1)"
    			fontSize="0.8em"
    			fontWeight="550"
    		>
    			{priceFormat(minLine)}
    		</text>
        </>
	)
}

Flags.displayName="Flags";