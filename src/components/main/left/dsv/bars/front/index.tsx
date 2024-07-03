export const Front = ({
	item,
	innerWidth,
	totalHeight,
	currentHeight,
	currentGap,
	currentPercent,
	currentDifference,
	currentType,
	dsvData,
	rooms,
	suites,
	onClick,
	reducedCount,
	sumOfCounts,
	combinedColors
}: any) => {
	const currentColor = rooms ? dsvData[`d${rooms}`]['colors'] : combinedColors;

	return (
		<g>
			<rect
				key={item}
				x={0}
				y={totalHeight - currentHeight + currentGap}
				width={innerWidth * currentPercent / 100}
				height={currentHeight - currentDifference}
				stroke={currentType === item ? "rgba(255, 255, 255, 1)" : "rgba(126, 126, 132, 1)"}
				strokeWidth={currentType === item ? "1" : "0"}
				fill={
					rooms === null ?
					String(currentColor[item]) :
					currentType === item ?
					currentColor[item] :
					suites === null ?
					String(currentColor[item]) :
					String(currentColor[item]).replace('1)', '0.4)')
				}
				style={{cursor: "pointer"}}
				onClick={() => onClick(item)}
			>
				<title>
					{Math.round(reducedCount[item]/sumOfCounts * 100)}%
				</title>
			</rect>
		</g>
	)
}

Front.displayName="Front";