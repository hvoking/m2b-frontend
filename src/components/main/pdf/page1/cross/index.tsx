export const CancelCross = ({ setActivePdf }: any) => {
	return (
		<img
			className="pdf-exit-cancel-cross"
			src="static/logos/cancel_search.svg" 
			alt="search-icon"
			onClick={() => setActivePdf(false)}
		/>
	)
}

CancelCross.displayName="CancelCross";