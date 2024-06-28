// App imports
import { Header } from './header';
import { LoadingImage } from '../../../utils/loading';
import { Legend } from './legend';
import './styles.scss';

// Context imports
import { useEquipment } from '../../../context/filters/equipment';
import { useRoomsApi } from '../../../context/api/imoveis/rooms';
import { useDsvApi } from '../../../context/api/imoveis/dsv';

export const Rooms = () => {
	const { roomsData } = useRoomsApi();
	const { dsvData } = useDsvApi();
	const { rooms, setRooms, setSuites, setGarages } = useEquipment();

	const onClick = () => {
		setRooms(null);
		setSuites(null);
		setGarages(null); 
	}

	if (!roomsData || !dsvData) return <></>

	return (
		<div>
			<Header onClick={onClick} rooms={rooms}/>
			<div className="pdf-rooms-wrapper">
				<Legend roomsData={roomsData} dsvData={dsvData}/>
			</div>
		</div>
	)
} 

Rooms.displayName="Rooms";