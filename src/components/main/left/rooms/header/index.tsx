// App imports
import './styles.scss';

export const Header = ({ onClick, rooms}: any) => {
	return (
		<div className="property-type-header">
			<div className="sidebar-sub-title">
				Principais tipologias
			</div>
			<input 
				type="checkbox" 
				name="tipologias" 
				onChange={onClick} 
				checked={rooms === null}
			/>
			<div 
				onClick={onClick} 
				style={{cursor: "default"}}
			>
				todas
			</div>
		</div>
	)
}

Header.displayName="Header";