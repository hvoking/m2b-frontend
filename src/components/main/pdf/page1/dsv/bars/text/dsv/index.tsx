export const DsvText = ({ item,	totalHeight, currentHeight,	currentType, onClick, innerHeight }: any) => {
	return (
		<text
			key={item}
			x={totalHeight - currentHeight + currentHeight/2 - 3}
			y={innerHeight - 10}
			fill={currentType === item ? "rgba(0, 0, 0, 1)" : "rgba(126, 126, 132, 1)"}
			textAnchor="middle"
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