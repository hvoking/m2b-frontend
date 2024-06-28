export const PercentText = ({ item, innerWidth,	totalHeight, currentHeight,	currentType, onClick, currentPercent, yScale }: any) => {
	return (
		<text
			key={item}
			x={totalHeight - currentHeight + currentHeight/2}
			y={innerWidth - yScale(currentPercent) - 23}
			fill={currentType === item ? "rgba(0, 0, 0, 1)" : "rgba(126, 126, 132, 1)"}
			textAnchor="middle"
			fontSize="0.8em"
			fontWeight="500"
			onClick={() => onClick(item)}
			style={{cursor: "pointer"}}
		>
			{Math.round(currentPercent)}%
		</text>
	)
}

PercentText.displayName="PercentText";