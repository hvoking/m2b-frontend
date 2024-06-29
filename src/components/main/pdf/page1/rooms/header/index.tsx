// App imports
import './styles.scss';

export const Header = ({ onClick, rooms}: any) => {
	return (
		<div className="property-type-header">
			<div className="sidebar-sub-title">
				Dormitórios
			</div>
			<img 
				src="static/utils/refresh_black.svg" 
				alt="refresh" 
				width="15px" 
				onClick={onClick}
				style={{cursor: "pointer"}}
			/>
		</div>
	)
}

Header.displayName="Header";