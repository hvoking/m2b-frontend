// App imports
import { Gauge } from './gauge';
import { Bars } from './bars';
import { LoadingImage } from '../../utils/loading';
import './styles.scss';

// Context imports
import { useRoomsApi } from '../../context/api/imoveis/rooms';
import { useDsvApi } from '../../context/api/imoveis/dsv';

export const Rooms = () => {
	const { roomsData } = useRoomsApi();
	const { dsvData } = useDsvApi();

	return (
		<div className="bottom-item-wrapper">
			<div className="sidebar-sub-title">Número de Dormitórios</div>
			{
				!dsvData || !roomsData ? 
				<LoadingImage/> :
				<div className="mobile-rooms-wrapper">
					<Bars roomsData={roomsData} dsvData={dsvData}/>
					<Gauge roomsData={roomsData} dsvData={dsvData}/>
				</div>
			}
		</div>
	)
} 

Rooms.displayName="Rooms";