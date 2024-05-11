// App imports
import { RoomsGauge } from './gauge';
import { RoomsLegend } from './legend';
import './styles.scss';

// Context imports
import { useEquipment } from '../../context/filters/equipment';
import { useRoomsApi } from '../../context/api/imoveis/rooms';
import { useDsvApi } from '../../context/api/imoveis/dsv';

export const Rooms = () => {
	const { rooms, setRooms, setSuites, setGarages } = useEquipment();
	const { roomsData } = useRoomsApi();
	const { dsvData } = useDsvApi();

	const onClick = () => {
		setRooms(null);
		setSuites(null);
		setGarages(null);
	}

	return (
		<div className="bottom-item-wrapper">
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
				<div onClick={onClick}>
					todas
				</div>
			</div>
			{
				!dsvData || !roomsData ? 
				<img 
					src="static/components/sidebar/loading.gif" 
					alt="loading" 
					style={{margin: "auto", width: "20%"}}/> :
				<div className="rooms-wrapper">
					<RoomsLegend 
						roomsData={roomsData} 
						dsvData={dsvData}
					/>
					<RoomsGauge 
						roomsData={roomsData} 
						dsvData={dsvData}
					/>
				</div>
			}
		</div>
	)
} 

Rooms.displayName="Rooms";