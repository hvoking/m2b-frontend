export const Refs = ({ xScale, innerHeight, data, priceFormat }: any) => {
	const minLine = data.min_line_price;
	const meanLine = data.mean_line_price;
	const maxLine = data.max_line_price;
	
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
		</>
	)
}

Refs.displayName="Refs";