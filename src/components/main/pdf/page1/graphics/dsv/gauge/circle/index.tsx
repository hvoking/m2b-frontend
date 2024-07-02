export const Circle = ({
	innerWidth,
	innerHeight,
	innerRadius,
	rooms,
	item,
	combinedColors,
	strokeWidth,
	currentCircumference,
	circumference,
	totalCircumference,
	suites
}: any) => {
	return (
		<circle
			cx={innerWidth/2}
			cy={innerHeight/2}
			fill="none"
			r={innerRadius}
			stroke={
				rooms === item ?
				combinedColors[item] :
				suites === null ?
				String(combinedColors[item]) :
				String(combinedColors[item]).replace('1)', '0.4)')
			}
			strokeWidth= {strokeWidth}
			strokeDasharray={`${currentCircumference + 0.5} ${circumference - currentCircumference}`}
			strokeDashoffset={-(totalCircumference - currentCircumference)}
			style={{cursor: "pointer"}}
		/>
	)
}

Circle.displayName="Circle";