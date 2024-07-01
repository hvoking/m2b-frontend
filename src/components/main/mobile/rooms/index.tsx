// App imports
import { Gauge } from './gauge';
import { Bars } from './bars';
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
			<div className="sidebar-sub-title">Anúncios por Número de Dormitórios</div>
			{
				!dsvData || !roomsData ? 
				<img 
					src="static/components/sidebar/loading.gif" 
					alt="loading" 
					style={{margin: "auto", width: "20%"}}
				/> :
				<div className="mobile-rooms-wrapper">
					<Bars roomsData={roomsData} dsvData={dsvData}/>
					<Gauge roomsData={roomsData} dsvData={dsvData}/>
				</div>
			}
		</div>
	)
} 

Rooms.displayName="Rooms";