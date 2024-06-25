export const Header = () => {
	return (
		<div className="pdf-header-wrapper">
			<div className="pdf-header-title">
				Avaliação Mercadológica
			</div>
			<div 
				className="property-data-subtitle" 
				style={{fontWeight: "600"}}
			>
				<img 
					src="static/components/maps/marker.svg" 
					alt="marker" 
					width="10px"
				/>
				<div>Localização do imóvel</div>
			</div>
		</div>
	)
}

Header.displayName="Header";