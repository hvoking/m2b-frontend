// App imports
import './styles.scss';

export const Header = ({ onClick, rooms}: any) => {
	return (
		<div className="property-type-header">
			<div className="sidebar-sub-title">
				Principais tipologias
			</div>
			<img 
				src="static/utils/refresh_white.svg" 
				alt="refresh" 
				width="17px" 
				onClick={onClick}
				style={{paddingTop: "2px", cursor: "pointer"}}
			/>
		</div>
	)
}

Header.displayName="Header";