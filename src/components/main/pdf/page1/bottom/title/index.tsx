// Context imports
import { useEquipment } from '../../../../context/filters/equipment';

export const Title = () => {
	const { rooms, setRooms, setSuites, setGarages } = useEquipment();
	const onClick = () => {
		setRooms(null);
		setSuites(null);
		setGarages(null); 
	}
	return (
		<div className="pdf-header-subtitle" style={{paddingLeft: "20px", paddingTop: "5px", display: "flex", gap: "10px"}}>
			<div>
				Características da Região
			</div>
			<img 
				src="static/main/refresh/refresh_black.svg" 
				alt="refresh" 
				width="15px" 
				onClick={onClick}
				style={{cursor: "pointer"}}
			/>
		</div>
	)
}

Title.displayName="Title";