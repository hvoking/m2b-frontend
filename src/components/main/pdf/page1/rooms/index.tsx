// App imports
import { Header } from './header';
import { LoadingImage } from '../../../utils/loading';
import { Gauge } from './gauge';
import { Bars } from './bars';
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

	return (
		<div style={{display: "grid", gridTemplateRows: "30px auto"}}>
			<Header onClick={onClick} rooms={rooms}/>
			{
				!dsvData || !roomsData ? 
				<LoadingImage/> :
				<div className="pdf-rooms-wrapper">
					<Bars roomsData={roomsData} dsvData={dsvData}/>
					<Gauge roomsData={roomsData} dsvData={dsvData}/>
				</div>
			}
		</div>
	)
} 

Rooms.displayName="Rooms";