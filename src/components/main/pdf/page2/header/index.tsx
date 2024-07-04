export const Header = () => {
	const currentDate = new Date().toLocaleDateString('pt-BR');
	
	return (
		<div className="pdf-header-wrapper">
			<div>{currentDate}</div>
			<div className="pdf-header-subtitle">
				Características do Imóvel
			</div>
		</div>
	)
}

Header.displayName="Header";