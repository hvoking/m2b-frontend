export const Legend = ({ innerHeight, currentPosition }: any) => {
	const legendWidth = 16;

	return (
		<>
		<polygon 
			points={`
				${currentPosition} ${innerHeight + 13}, 
				${currentPosition - 6} ${innerHeight + 13 + 5}, 
				${currentPosition + 6} ${innerHeight + 13 + 5}
			`}
			fill="rgba(126, 126, 132, 1)"
		/>
		<rect
			x={currentPosition - legendWidth}
			y={innerHeight + 13 + 5}
			rx={2}
			ry={2}
			width={legendWidth * 2}
			height={20}
			fill="rgba(23, 23, 32, 1)"
			strokeWidth={2}
			stroke="rgba(126, 126, 132, 1)"
		>
		</rect>
		<text 
			x={currentPosition} 
			y={innerHeight + 13 + 15} 
			fill="rgba(255, 255, 255, 0.8)" 
			textAnchor="middle"
			dominantBaseline="middle"
			fontSize="0.8em"
		>
			{Math.round(currentPosition)}
		</text>
		</>
	)
}

Legend.displayName="Legend";