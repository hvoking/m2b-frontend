export const Left = () => {
	return (
		<div className="page2-item">
			<img
				className="page2-image"
				src="static/components/landing/page2/layers.svg" 
				alt="layers" 
			/>
			<div>
				<div className="pages-subtitle">
					mapeando <br/>
					o presente <br/>
					para entender <br/>
					o futuro
				</div>
				<div className="pages-description">
					baseados nas informações <br/>
					disponíveis hoje, <br/>
					encontramos tendências <br/>
					no amanhã.
				</div>
			</div>
		</div>
	)
}

Left.displayName="Left";