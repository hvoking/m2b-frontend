// App imports
import { RoomsGauge } from './gauge';
import { RoomsLegend } from './legend';
import './styles.scss';

// Context imports
import { useEquipment } from '../../context/filters/equipment';
import { useRoomsApi } from '../../context/api/imoveis/rooms';

export const Rooms = () => {
	const { rooms, setRooms } = useEquipment();
	const { roomsData } = useRoomsApi();

	const onClick = () => {
		setRooms(null);
	}

	return (
		<div className="bottom-item-wrapper">
			<div className="property-type-header">
				<div className="sidebar-sub-title">
					Rooms
				</div>
				<input 
					type="checkbox" 
					name="rooms" 
					onChange={onClick} 
					checked={rooms === null}
				/>
				<div onClick={onClick}>
					all
				</div>
			</div>
			{
				!roomsData ? 
				<img 
					src="static/components/sidebar/loading.gif" 
					alt="loading" 
					style={{margin: "auto", width: "20%"}}/> :
				<div className="rooms-wrapper">
					<RoomsLegend roomsData={roomsData}/>
					<RoomsGauge roomsData={roomsData}/>
				</div>
			}
		</div>
	)
} 

Rooms.displayName="Rooms";