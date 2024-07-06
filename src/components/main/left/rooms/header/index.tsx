// App imports
import './styles.scss';

// Context imports
import { useEquipment } from '../../../context/filters/equipment';

export const Header = () => {
	const { rooms, setRooms, setSuites, setGarages } = useEquipment();

	const onClick = () => {
		setRooms(null);
		setSuites(null);
		setGarages(null); 
	}
	return (
		<div className="property-type-header">
			<div className="sidebar-sub-title">
				Principais tipologias
			</div>
			<img 
				src={rooms !== null ? "static/utils/refresh_white.svg" : "static/utils/refresh_gray.svg"}
				alt="refresh" 
				width="17px" 
				onClick={onClick}
				style={{paddingTop: "2px", cursor: "pointer"}}
			/>
		</div>
	)
}

Header.displayName="Header";