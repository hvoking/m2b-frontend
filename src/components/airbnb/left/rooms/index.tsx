// App imports
import { Header } from './header';
import { Graphics } from './graphics';
import { LoadingImage } from '../../utils/loading'

// Context imports
import { useEquipment } from '../../context/filters/equipment';
import { useRoomsApi } from '../../context/api/imoveis/rooms';

export const Rooms = () => {
	const { roomsData } = useRoomsApi();
	const { rooms, setRooms } = useEquipment();

	const onClick = () => {
		setRooms(null);
	}

	return (
		<div className="sidebar-item-wrapper">
			<Header onClick={onClick} rooms={rooms}/>
			{
				!roomsData ? 
				<LoadingImage/> :
				<Graphics roomsData={roomsData}/>
			}
		</div>
	)
} 

Rooms.displayName="Rooms";