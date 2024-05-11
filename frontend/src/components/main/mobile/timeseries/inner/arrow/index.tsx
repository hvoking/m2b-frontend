export const Arrow = ({ onClick, innerHeight }: any) => {
	return (
		<polygon 
			fill="rgba(126, 126, 132, 1)"
			points={`
				-3 ${innerHeight/2 - 7}, 
				-3 ${innerHeight/2 + 7}, 
				-10 ${innerHeight/2}
			`}
			style={{cursor: "pointer"}}
			onClick={onClick}
		/>
	)
}

Arrow.displayName="Arrow";