export const Flags = ({ xScale, minLine, meanLine, maxLine, priceFormat }: any) => {
	return (
		<>
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