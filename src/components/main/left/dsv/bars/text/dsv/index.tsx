export const DsvText = ({ item,	totalHeight, currentHeight,	currentType, onClick }: any) => {
	return (
		<text
			key={item}
			x={-40}
			y={totalHeight - currentHeight + currentHeight/2}
			fill={currentType === item ? "rgba(255, 255, 255, 1)" : "rgba(126, 126, 132, 1)"}
			textAnchor="start"
			alignmentBaseline="middle"
			fontSize="0.8em"
			onClick={() => onClick(item)}
			style={{cursor: "pointer"}}
		>
			{item}
		</text>
	)
}

DsvText.displayName="DsvText";