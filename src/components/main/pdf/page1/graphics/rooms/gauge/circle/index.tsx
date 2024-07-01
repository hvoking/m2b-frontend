export const Circle = ({
	innerWidth,
	innerHeight,
	innerRadius,
	rooms,
	item,
	roomsCounter,
	strokeWidth,
	currentCircumference,
	circumference,
	totalCircumference,
}: any) => {
	return (
		<circle
			cx={innerWidth/2}
			cy={innerHeight/2}
			fill="none"
			r={innerRadius}
			stroke={
				String(rooms) === item ? 
				roomsCounter[item] : 
				rooms === null ?
				roomsCounter[item] :
				roomsCounter[item].replace('1)', '0.4)')
			}
			strokeWidth= {strokeWidth}
			strokeDasharray={`${currentCircumference} ${circumference - currentCircumference}`}
			strokeDashoffset={-(totalCircumference - currentCircumference)}
			style={{cursor: "pointer"}}
		/>
	)
}

Circle.displayName="Circle";