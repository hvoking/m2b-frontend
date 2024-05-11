export const Refs = ({ xScale, innerHeight, unitPrice, data, priceFormat }: any) => {
	const minLine = unitPrice === "price" ? data.min_line_price : data.min_line_unit_price;
	const meanLine = unitPrice === "price" ? data.mean_line_price : data.mean_line_unit_price;
	const maxLine = unitPrice === "price" ? data.max_line_price : data.max_line_unit_price;
	
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