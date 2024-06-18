// App imports
import './styles.scss'

export const Logo = () => {
	return (
		<div className="gg-logo-wrapper">
			<img 
				className="gg-logo"
				src="static/logos/pink.svg" 
				alt="header-logo"
			/>
			<div className="gg-logo-name" style={{paddingLeft: "8px"}}>Airbnb Metrics</div>
		</div>
	)
}

Logo.displayName="Logo";