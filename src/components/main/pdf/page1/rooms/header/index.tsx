// App imports
import './styles.scss';

export const Header = ({ onClick, rooms}: any) => {
	return (
		<div className="property-type-header">
			<div className="sidebar-sub-title">
				Principais tipologias
			</div>
		</div>
	)
}

Header.displayName="Header";