export const Background = ({
	item,
	currentPercent,
	innerWidth,
	totalHeight,
	currentHeight,
	currentGap,
	currentDifference,
	currentType,
	onClick,
}: any) => {
	return (
		<rect
			key={item}
			x={innerWidth * currentPercent / 100}
			y={totalHeight - currentHeight + currentGap}
			width={innerWidth - innerWidth * currentPercent / 100}
			height={currentHeight - currentDifference}
			stroke={currentType === item ? "rgba(255, 255, 255, 1)" : "rgba(126, 126, 132, 1)"}
			strokeWidth={currentType === item ? "1" : "0"}
			fill={"rgba(126, 126, 132, 0.6)"}
			onClick={() => onClick(item)}
			style={{cursor: "pointer"}}
		/> 
	)
}

Background.displayName="Background";